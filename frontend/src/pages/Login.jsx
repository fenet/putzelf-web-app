import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Seo from "../components/Seo";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const user = await login(form);
      navigate(user.role === "ADMIN" ? "/admin" : "/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Seo title="Anmelden" description="Anmelden, um Buchungen zu verwalten." path="/login" noindex />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Anmelden</h1>
          <p className="text-sm text-gray-600">Melden Sie sich an, um Ihre Buchungen zu verwalten.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail
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
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#5be3e3]"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0097b2] py-2 text-white font-semibold shadow hover:bg-[#00819a] transition disabled:opacity-60"
          >
            {loading ? "Anmeldung läuft…" : "Anmelden"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <span>Noch kein Konto?</span>{" "}
          <Link to="/register" className="text-[#0097b2] font-semibold hover:underline">
            Registrieren
          </Link>
        </div>
      </div>
    </div>
  );
}