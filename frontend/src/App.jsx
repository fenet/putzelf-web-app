// App.jsx
import { Routes, Route, useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { trackPageview } from "./lib/analytics";
import i18n from "./i18n";
import Footer from "./components/Footer";
import LogoHeader from "./components/LogoHeader";
import { AuthProvider } from "./lib/auth";
import { AdminRoute } from "./components/ProtectedRoute";
import { getLocalizedPath } from "./lib/localeRoutes";
import CookieConsent from "./components/CookieConsent";

const LandingAlternative = lazy(() => import("./pages/LandingAlternative"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const ServiceGeneric = lazy(() => import("./pages/ServiceGeneric"));
const Contact = lazy(() => import("./pages/Contact"));
const JobOpening = lazy(() => import("./pages/JobOpening"));
const GetPartners = lazy(() => import("./pages/GetPartners"));
const Home = lazy(() => import("./pages/Home"));
const Order = lazy(() => import("./pages/Order"));
const Imprint = lazy(() => import("./pages/Imprint"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PriceCalculator = lazy(() => import("./pages/PriceCalculator"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const BlogPage = lazy(() => import("./pages/Blog").then((module) => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import("./pages/Blog").then((module) => ({ default: module.BlogPostPage })));

function LocaleBoundary({ locale }) {
  const location = useLocation();

  useLayoutEffect(() => {
    i18n.changeLanguage(locale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale, location.pathname]);

  return <Outlet />;
}

function LegacyOrderRedirect() {
  const { id } = useParams();
  return <Navigate to={getLocalizedPath("de", "order", { id })} replace />;
}

function LegacyRedirect({ to }) {
  const location = useLocation();
  return <Navigate to={{ pathname: to, search: location.search, hash: location.hash }} replace />;
}

function Layout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Show LogoHeader only on non-landing pages */}
      {!isLanding && <LogoHeader />}

      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Hide Footer on Landing (since Landing has its own footer) */}
      {!isLanding && <Footer />}
    </div>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Global HTML5 validation handler: set localized messages for required fields
    const onInvalid = (e) => {
      try {
        const el = e.target;
        if (!el || !el.validity) return;
        if (el.validity.valueMissing) {
          const msg = i18n.t("form.requiredField", { defaultValue: "Please fill out this field." });
          el.setCustomValidity(msg);
        }
      } catch (_) {}
    };

    const onInput = (e) => {
      try {
        const el = e.target;
        if (el && typeof el.setCustomValidity === "function") el.setCustomValidity("");
      } catch (_) {}
    };

    document.addEventListener("invalid", onInvalid, true);
    document.addEventListener("input", onInput, true);
    return () => {
      document.removeEventListener("invalid", onInvalid, true);
      document.removeEventListener("input", onInput, true);
    };
  }, []);

  return (
    <AuthProvider>
      <CookieConsent />
      <Suspense fallback={null}><Routes>
        <Route path="/" element={<LegacyRedirect to="/de/" />} />
        <Route path="/landing-alt" element={<LegacyRedirect to="/de/" />} />
        <Route path="/services" element={<LegacyRedirect to="/de/services" />} />
        
        
        <Route path="/contact" element={<LegacyRedirect to="/de/kontakt" />} />
        <Route path="/kontakt" element={<LegacyRedirect to="/de/kontakt" />} />
        <Route path="/job-opening" element={<LegacyRedirect to="/de/karriere" />} />
        <Route path="/get-partners" element={<LegacyRedirect to="/de/partner-werden" />} />
        <Route path="/privacy" element={<LegacyRedirect to="/de/datenschutz" />} />
        <Route path="/datenschutz" element={<LegacyRedirect to="/de/datenschutz" />} />
        <Route path="/imprint" element={<LegacyRedirect to="/de/impressum" />} />
        <Route path="/book" element={<LegacyRedirect to="/de/booking" />} />
        <Route path="/search" element={<NotFound />} />
        {/* Profile is retired and resolves to the booking route. */}
        <Route path="/profile" element={<LegacyRedirect to="/de/booking" />} />
        <Route path="/calculator" element={<LegacyRedirect to="/de/calculator" />} />
        <Route path="/blog" element={<LegacyRedirect to="/de/blog" />} />
        <Route path="/blog/:slug" element={<LegacyRedirect to={location.pathname.replace(/^\//, "/de/")} />} />
        <Route path="/login" element={<LegacyRedirect to="/de/login" />} />
        <Route path="/register" element={<LegacyRedirect to="/de/register" />} />
        <Route path="/admin" element={<LegacyRedirect to="/de/admin" />} />
        <Route path="/order/:id" element={<LegacyOrderRedirect />} />

        <Route path="/de" element={<LocaleBoundary locale="de" />}>
          <Route index element={<LandingAlternative />} />
          <Route path="landing-alt" element={<LegacyRedirect to="/de/" />} />
          <Route path="services" element={<ServicesOverview />} />
          <Route path="services/wien" element={<LegacyRedirect to="/de/services" />} />
          <Route path="services/graz" element={<LegacyRedirect to="/de/services" />} />
          <Route path="wien/services" element={<LegacyRedirect to="/de/services" />} />
          <Route path="graz/services" element={<LegacyRedirect to="/de/services" />} />
          {/* Removed specific service pages per request */}
          {/* new private service routes */}
          <Route path="services/unterhaltsreinigung" element={<ServiceGeneric />} />
          <Route path="services/grundreinigung" element={<ServiceGeneric />} />
          <Route path="services/wohnreinigung" element={<ServiceGeneric />} />
          <Route path="services/bauendreinigung-grobreinigung" element={<ServiceGeneric />} />
          <Route path="services/glas-rahmenreinigung" element={<ServiceGeneric />} />
          <Route path="services/industriereinigung-maschinen" element={<ServiceGeneric />} />
          {/* one-time private removed */}
          
          {/* new business service routes */}
          <Route path="services/unterhaltsreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/grundreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/treppenhausreinigung" element={<ServiceGeneric />} />
          <Route path="services/bauendreinigung-grobreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/glas-rahmenreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/industriereinigung-maschinen-gewerbe" element={<ServiceGeneric />} />
          {/* one-time business removed */}
          <Route path="kontakt" element={<Contact />} />
          <Route path="karriere" element={<JobOpening />} />
          <Route path="partner-werden" element={<GetPartners />} />
          <Route path="datenschutz" element={<PrivacyPolicy />} />
          <Route path="impressum" element={<Imprint />} />

          <Route path="booking" element={<Layout><Home /></Layout>} />
          <Route path="order/:id" element={<Layout><Order /></Layout>} />
          <Route path="profile" element={<LegacyRedirect to="/de/booking" />} />
          <Route path="calculator" element={<PriceCalculator />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/en" element={<LocaleBoundary locale="en" />}>
          <Route index element={<LandingAlternative />} />
          <Route path="landing-alt" element={<LegacyRedirect to="/en/" />} />
          <Route path="services" element={<ServicesOverview />} />
          <Route path="vienna/services" element={<LegacyRedirect to="/en/services" />} />
          <Route path="graz/services" element={<LegacyRedirect to="/en/services" />} />
          {/* Removed specific service pages per request */}
          {/* new private service routes (en) */}
          <Route path="services/maintenance-cleaning" element={<ServiceGeneric />} />
          <Route path="services/deep-cleaning-private" element={<ServiceGeneric />} />
          <Route path="services/residential-cleaning" element={<ServiceGeneric />} />
          <Route path="services/construction-cleaning" element={<ServiceGeneric />} />
          <Route path="services/window-cleaning" element={<ServiceGeneric />} />
          <Route path="services/industrial-cleaning" element={<ServiceGeneric />} />
          {/* one-time private removed (en) */}
          {/* new business service routes (en) */}
          <Route path="services/maintenance-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/deep-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/staircase-cleaning" element={<ServiceGeneric />} />
          <Route path="services/construction-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/window-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/industrial-cleaning-business" element={<ServiceGeneric />} />
          {/* one-time business removed (en) */}
          <Route path="contact" element={<Contact />} />
          <Route path="job-opening" element={<JobOpening />} />
          <Route path="get-partners" element={<GetPartners />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="imprint" element={<Imprint />} />
          <Route path="booking" element={<Layout><Home /></Layout>} />
          <Route path="order/:id" element={<Layout><Order /></Layout>} />
          <Route path="profile" element={<LegacyRedirect to="/en/booking" />} />
          <Route path="calculator" element={<PriceCalculator />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Top-level fallback to localized 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes></Suspense>
    </AuthProvider>
  );
}

