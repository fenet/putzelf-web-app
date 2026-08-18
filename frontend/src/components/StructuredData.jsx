import { useEffect } from "react";

function safeStringify(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return JSON.stringify({});
  }
}

export default function StructuredData({ json, id = "putzelf-jsonld" }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // remove any previous script we injected with the same id to avoid duplicates
    const dataAttrName = "data-putzelf-jsonld";
    document.querySelectorAll(`script[${dataAttrName}="${id}"]`).forEach((s) => s.remove());

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("id", id);
    script.setAttribute(dataAttrName, id);
    script.text = safeStringify(json);
    document.head.appendChild(script);

    return () => {
      try {
        script.remove();
      } catch (e) {}
    };
  }, [json, id]);

  return null;
}
