#!/usr/bin/env python3
"""Generate responsive, content-addressed service image assets.

Requires Pillow with AVIF and WebP support. Source images remain untouched.
"""

import base64
import hashlib
import json
import re
import shutil
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps


FRONTEND = Path(__file__).resolve().parents[1]
PUBLIC = FRONTEND / "public"
SOURCE_FILE = FRONTEND / "src/pages/ServiceGeneric.jsx"
OUTPUT_DIR = PUBLIC / "optimized/service-images"
MANIFEST_FILE = FRONTEND / "src/data/serviceImageManifest.json"
LANDING_COVER = FRONTEND / "src/assets/cover.svg"
SOURCE_RE = re.compile(r"['\"](/(?:services|resedential)/[^'\"]+\.(?:jpe?g|png|avif))['\"]", re.IGNORECASE)
EMBEDDED_PNG_RE = re.compile(r'((?:xlink:)?href=")data:image/png;base64,([^"]+)(")', re.IGNORECASE)
WIDTHS = (480, 800, 1200)


def save_content_addressed(image, relative_path, width, output_format, save_options):
    buffer = BytesIO()
    image.save(buffer, format=output_format, **save_options)
    content = buffer.getvalue()
    digest = hashlib.sha256(content).hexdigest()[:12]
    destination = OUTPUT_DIR / relative_path.parent / f"{relative_path.stem}-{width}-{digest}.{output_format.lower()}"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(content)
    return f"/optimized/service-images/{destination.relative_to(OUTPUT_DIR).as_posix()}", width


def make_variants(source_path):
    with Image.open(source_path) as original:
        image = ImageOps.exif_transpose(original).copy()
        has_alpha = "A" in image.getbands() or "transparency" in image.info
        image = image.convert("RGBA" if has_alpha else "RGB")
        source_width, source_height = image.size
        icc_profile = original.info.get("icc_profile")

        widths = sorted({min(width, source_width) for width in WIDTHS})
        relative_source_path = source_path.relative_to(PUBLIC)
        relative_stem = relative_source_path.with_suffix("")
        avif_variants = []
        webp_variants = []
        fallback_variant = None

        for width in widths:
            height = max(1, round(source_height * width / source_width))
            resized = image if width == source_width else image.resize((width, height), Image.Resampling.LANCZOS)
            avif_options = {"quality": 46, "speed": 7}
            webp_options = {"quality": 79, "method": 5}
            if icc_profile:
                avif_options["icc_profile"] = icc_profile
                webp_options["icc_profile"] = icc_profile

            avif_variants.append(dict(zip(("src", "width"), save_content_addressed(resized, relative_stem, width, "AVIF", avif_options))))
            webp_variants.append(dict(zip(("src", "width"), save_content_addressed(resized, relative_stem, width, "WEBP", webp_options))))

            fallback_width = min(800, source_width)
            if width == fallback_width:
                fallback_image = resized
                if has_alpha:
                    background = Image.new("RGB", fallback_image.size, "white")
                    background.paste(fallback_image, mask=fallback_image.getchannel("A"))
                    fallback_image = background
                jpeg_options = {"quality": 82, "optimize": True, "progressive": True}
                if icc_profile:
                    jpeg_options["icc_profile"] = icc_profile
                fallback_variant = save_content_addressed(fallback_image, relative_stem, fallback_width, "JPEG", jpeg_options)[0]

        return {
            "width": source_width,
            "height": source_height,
            "fallback": fallback_variant,
            "avif": avif_variants,
            "webp": webp_variants,
        }


def optimize_embedded_cover_images():
    svg = LANDING_COVER.read_text(encoding="utf-8")
    original_size = len(svg.encode("utf-8"))
    optimized_count = 0

    def replace_color_image(match):
        nonlocal optimized_count
        try:
            png_bytes = base64.b64decode(match.group(2), validate=True)
            with Image.open(BytesIO(png_bytes)) as embedded:
                # Keep the compact grayscale silhouettes and masks unchanged.
                if embedded.mode in {"1", "L", "LA"}:
                    return match.group(0)
                image = embedded.convert("RGBA" if "A" in embedded.getbands() else "RGB")
                webp_buffer = BytesIO()
                image.save(webp_buffer, format="WEBP", quality=84, method=5)
            webp_bytes = webp_buffer.getvalue()
            if len(webp_bytes) >= len(png_bytes):
                return match.group(0)
            optimized_count += 1
            encoded = base64.b64encode(webp_bytes).decode("ascii")
            return f'{match.group(1)}data:image/webp;base64,{encoded}{match.group(3)}'
        except Exception as error:
            raise RuntimeError("Could not optimize an embedded image in cover.svg") from error

    optimized_svg = EMBEDDED_PNG_RE.sub(replace_color_image, svg)
    if optimized_count:
        LANDING_COVER.write_text(optimized_svg, encoding="utf-8")
    reduced_bytes = original_size - len(optimized_svg.encode("utf-8"))
    return optimized_count, reduced_bytes


def main():
    if not Image.registered_extensions().get(".avif"):
        raise SystemExit("Pillow must include AVIF support to generate service image variants")
    if not Image.registered_extensions().get(".webp"):
        raise SystemExit("Pillow must include WebP support to generate service image variants")

    referenced_sources = sorted(set(SOURCE_RE.findall(SOURCE_FILE.read_text(encoding="utf-8"))))
    if not referenced_sources:
        raise SystemExit("No local service images were found in ServiceGeneric.jsx")

    missing_sources = [source for source in referenced_sources if not (PUBLIC / source.lstrip("/")).is_file()]
    if missing_sources:
        raise SystemExit(f"Missing source images: {', '.join(missing_sources)}")

    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    manifest = {
        source: make_variants(PUBLIC / source.lstrip("/"))
        for source in referenced_sources
    }
    MANIFEST_FILE.write_text(f"{json.dumps(manifest, indent=2, ensure_ascii=False)}\n", encoding="utf-8")

    total_bytes = sum(path.stat().st_size for path in OUTPUT_DIR.rglob("*.*"))
    print(f"Generated responsive AVIF/WebP/JPEG assets for {len(manifest)} service images ({total_bytes / 1024:.0f} KiB total)")
    optimized_count, reduced_bytes = optimize_embedded_cover_images()
    if optimized_count:
        print(f"Optimized {optimized_count} embedded color images in cover.svg (reduced by {reduced_bytes / 1024:.0f} KiB)")


if __name__ == "__main__":
    main()
