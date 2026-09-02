import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { apiFetch } from "../lib/api";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "vienna",
  subject: "",
  message: ""
};

export default function Contact() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t("contact.errors.name");
    if (!form.email.trim()) nextErrors.email = t("contact.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t("contact.errors.emailInvalid");
    }
    if (!form.phone.trim()) nextErrors.phone = t("contact.errors.phone");
    if (!form.location || !["vienna", "graz"].includes(form.location)) {
      nextErrors.location = t("contact.errors.location");
    }
    if (!form.subject.trim()) nextErrors.subject = t("contact.errors.subject");
    if (!form.message.trim()) nextErrors.message = t("contact.errors.message");

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus({ type: "loading", message: t("contact.submit.loading") });

    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          location: form.location
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || t("contact.errors.submitFailed"));
      }

      setStatus({ type: "success", message: t("contact.submit.success") });
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || t("contact.errors.submitFailed")
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f7] text-slate-900">
      <Navbar />
      <Seo
        title={t("contact.seo.title")}
        description={t("contact.seo.description")}
        path={getLocalizedPath(locale, "contact")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "contact")}
      />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
            {t("contact.kicker")}
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {t("contact.intro")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="rounded-[22px] bg-slate-900 p-6 text-white">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-200">
                {t("contact.support")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">PutzELF</h2>
            </div>

            <div className="mt-7 space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("contact.phoneLabel")}
                  </div>
                  <a href="tel:+436766300167" className="mt-1 block text-base font-medium text-slate-900 hover:text-sky-700">
                    +43 676 6300167
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("contact.emailLabel")}
                  </div>
                  <a href="mailto:office@putzelf.com" className="mt-1 block text-base font-medium text-slate-900 hover:text-sky-700">
                    office@putzelf.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("contact.locationsLabel")}
                  </div>
                  <div className="mt-1 text-base font-medium text-slate-900">Wien</div>
                  <div className="mt-1 text-sm text-slate-600">office@putzelf.com</div>
                  <div className="mt-4 text-base font-medium text-slate-900">Graz</div>
                  <div className="mt-1 text-sm text-slate-600">office.stmk@putzelf.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <MessageSquareText className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t("contact.helpLabel")}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {t("contact.helpText")}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label={t("contact.formLabel")}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                    {t("contact.fields.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    {t("contact.fields.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                    {t("contact.fields.phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-sm font-medium text-slate-700">
                    {t("contact.fields.location")}
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? "location-error" : undefined}
                  >
                    <option value="vienna">{t("contact.locations.vienna")}</option>
                    <option value="graz">{t("contact.locations.graz")}</option>
                  </select>
                  {errors.location && <p id="location-error" className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
                  {t("contact.fields.subject")}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  {t("contact.fields.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              {status.message && (
                <div
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    status.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : status.type === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-sky-200 bg-sky-50 text-sky-700"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span>{status.type === "loading" ? t("contact.submit.loading") : t("contact.submit.label")}</span>
                {!status.type || status.type === "idle" ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
