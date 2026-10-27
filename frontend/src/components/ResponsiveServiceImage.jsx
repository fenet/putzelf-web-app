import imageManifest from "../data/serviceImageManifest.json";

function toSrcSet(variants = []) {
  return variants.map(({ src, width }) => `${src} ${width}w`).join(", ");
}

export default function ResponsiveServiceImage({
  src,
  alt,
  className,
  pictureClassName = "block h-full w-full",
  sizes,
  loading,
  fetchPriority,
}) {
  const image = imageManifest[src];
  const avifSrcSet = toSrcSet(image?.avif);
  const webpSrcSet = toSrcSet(image?.webp);

  return (
    <picture className={pictureClassName}>
      {avifSrcSet ? <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} /> : null}
      {webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
      <img
        src={image?.fallback || src}
        alt={alt}
        width={image?.width}
        height={image?.height}
        sizes={sizes}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
