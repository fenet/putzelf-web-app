import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Partner werden",
    description: "Partnerschaften mit PutzELF: Bewerben Sie sich als Subunternehmer oder Geschäftspartner.",
    intro: "Wir freuen uns auf Partnerschaften mit Unternehmen und Subunternehmern. Bitte füllen Sie das Formular aus und wir melden uns.",
    fields: { name: "Name", company: "Firma", address: "Adresse", email: "E-Mail", phone: "Telefon", message: "Nachricht" },
    submit: "Partnerschaftsanfrage senden",
    loading: "Wird gesendet…",
    success: "Anfrage gesendet — wir melden uns bei Ihnen.",
    error: "Senden fehlgeschlagen — bitte später erneut versuchen.",
  },
  en: {
    title: "Become a Partner",
    description: "Partnerships with PutzELF: apply as a subcontractor or business partner.",
    intro: "We welcome partnerships with companies and subcontractors. Please fill out the form and we will get back to you.",
    fields: { name: "Name", company: "Company", address: "Address", email: "Email", phone: "Phone", message: "Message" },
    submit: "Send Partnership Request",
    loading: "Sending…",
    success: "Request sent — we will contact you.",
    error: "Failed to send — try again later.",
  },
};

export default function GetPartners() {
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const body = Object.fromEntries(form.entries());
    setStatus('loading');
    try {
      const res = await fetch('/api/partners/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Network');
      setStatus('success');
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Seo
        title={locale === "de" ? "Partner werden – PutzELF" : "Become a Partner – PutzELF"}
        description={c.description}
        path={getLocalizedPath(locale, "getPartners")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "getPartners")}
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{c.title}</h1>
        <p className="text-gray-600 mb-6">{c.intro}</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium">{c.fields.name}</label>
            <input name="name" required className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">{c.fields.company}</label>
            <input name="company" className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">{c.fields.address}</label>
            <input name="address" className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">{c.fields.email}</label>
            <input name="email" type="email" required className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">{c.fields.phone}</label>
            <input name="phone" className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">{c.fields.message}</label>
            <textarea name="message" rows={4} className="mt-1 block w-full border rounded-md p-2" />
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className="bg-[#0097b2] text-white px-4 py-2 rounded-md">{c.submit}</button>
            {status === 'loading' && <span className="text-gray-600">{c.loading}</span>}
            {status === 'success' && <span className="text-green-600">{c.success}</span>}
            {status === 'error' && <span className="text-red-600">{c.error}</span>}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
