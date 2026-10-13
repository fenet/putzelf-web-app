import { Helmet } from "react-helmet-async";

function safeStringify(obj) {
  try {
    return JSON.stringify(obj).replace(/</g, "\\u003c");
  } catch {
    return JSON.stringify({});
  }
}

export default function StructuredData({ json, id = "putzelf-jsonld" }) {
  return (
    <Helmet defer={false}>
      <script id={id} type="application/ld+json">{safeStringify(json)}</script>
    </Helmet>
  );
}
