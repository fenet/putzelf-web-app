// src/pages/Search.jsx
import Seo from "../components/Seo";

export default function Search() {
  return (
    <div className="text-center py-20">
      <Seo title="Suche" description="Suche" path="/search" noindex />
      <h1 className="text-3xl font-bold text-gray-800">Suche</h1>
      <p className="text-gray-600 mt-4">Hier wird später die Suche verfügbar sein.</p>
    </div>
  );
}
