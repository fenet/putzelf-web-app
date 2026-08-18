import React from "react";

export default function ServiceCard({ id, title, desc, img, ctaText, ctaHref }) {
  return (
    <div id={id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="h-40 w-full overflow-hidden bg-gray-100">
        {img ? (
          <img src={img} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Image</div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <p className="text-sm text-gray-600 flex-1">{desc}</p>
        {ctaText && (
          <div className="mt-4">
            <a href={ctaHref || '#'} className="inline-block bg-[#0097b2] text-white px-4 py-2 rounded-md text-sm font-semibold">{ctaText}</a>
          </div>
        )}
      </div>
    </div>
  );
}
