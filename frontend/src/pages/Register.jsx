import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

export default function Register() {
  const { register } = useAuth();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "", inviteCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await register({
        email: form.email,
        password: form.password,
        inviteCode: form.inviteCode || undefined,
      });
      navigate(user.role === "ADMIN" ? getLocalizedPath(locale, "admin") : getLocalizedPath(locale, "booking"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Seo title={t("auth.register.seoTitle")} description={t("auth.register.seoDescription")} path={getLocalizedPath(locale, "register")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "register")} noindex />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">{t("auth.register.title")}</h1>
          <p className="text-sm text-gray-600">{t("auth.register.description")}</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t("auth.register.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#5be3e3]"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t("auth.register.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#5be3e3]"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700">
              {t("auth.register.inviteCode")}
            </label>
            <input
              id="inviteCode"
              name="inviteCode"
              type="text"
              value={form.inviteCode}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#5be3e3]"
              placeholder={t("auth.register.invitePlaceholder")}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0097b2] py-2 text-white font-semibold shadow hover:bg-[#00819a] transition disabled:opacity-60"
          >
            {loading ? t("auth.register.loading") : t("auth.register.submit")}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {t("auth.register.hasAccount")}{" "}
          <Link to={getLocalizedPath(locale, "login")} className="text-[#0097b2] font-semibold hover:underline">
            {t("auth.register.loginLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}



