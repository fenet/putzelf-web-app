import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Building2, Handshake, MapPin } from "lucide-react";
import Seo from "../components/Seo";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Partner werden",
    description: "Partnerschaften mit PutzELF: Bewerben Sie sich als Subunternehmer oder Geschäftspartner.",
    intro: "Wir freuen uns auf Partnerschaften mit Unternehmen und Subunternehmern. Bitte füllen Sie das Formular aus.",
    fields: { name: "Ansprechpartner", company: "Firmenname", address: "Adresse", email: "E-Mail", phone: "Telefon", message: "Nachricht" },
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
  const [phoneError, setPhoneError] = useState(null);
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const phoneVal = (form.get("phone") || "").toString().trim();
    if (phoneVal && !/^\d+$/.test(phoneVal)) {
      setPhoneError(locale === "de" ? "Telefonnummer darf nur Ziffern enthalten." : "Phone must contain only numbers.");
      return;
    }
    setPhoneError(null);
    const body = Object.fromEntries(form.entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Network");
      setStatus("success");
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f7] text-slate-900">
      <Navbar />
      <Seo
        title={locale === "de" ? "Partner werden – PutzELF" : "Become a Partner – PutzELF"}
        description={c.description}
        path={getLocalizedPath(locale, "getPartners")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "getPartners")}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/85 p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-12 top-10 h-40 w-40 rounded-full bg-sky-100/80 blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-cyan-100/70 blur-3xl" />

            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                PutzELF
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">
                {c.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                {c.intro}
              </p>

              <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3 text-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm ring-1 ring-slate-200">
                      <Handshake className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                      {locale === "de" ? "Partnerschaft" : "Partnership"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-500">{locale === "de" ? "Wien · Graz" : "Vienna · Graz"}</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <Building2 className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <MapPin className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <Handshake className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-[#f8fbfc] p-5 sm:p-7 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {locale === "de" ? "Standort" : "Location"}
                </label>
                <select
                  name="location"
                  defaultValue="vienna"
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="vienna">{locale === "de" ? "Wien" : "Vienna"}</option>
                  <option value="graz">{locale === "de" ? "Graz" : "Graz"}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">{c.fields.company}</label>
                <input
                  name="company"
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">{c.fields.name}</label>
                <input
                  name="name"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">{c.fields.address}</label>
                <input
                  name="address"
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{c.fields.email}</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{c.fields.phone}</label>
                  <input
                    name="phone"
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                  {phoneError ? <p className="mt-1 text-xs text-red-600">{phoneError}</p> : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">{c.fields.message}</label>
                <textarea
                  name="message"
                  rows={5}
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  {c.submit}
                </button>

                <div className="mt-3 min-h-[24px] text-sm">
                  {status === "loading" && <span className="text-slate-600">{c.loading}</span>}
                  {status === "success" && <span className="text-emerald-600">{c.success}</span>}
                  {status === "error" && <span className="text-red-600">{c.error}</span>}
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
