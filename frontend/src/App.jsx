// App.jsx
import { Routes, Route, useLocation, Navigate, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { trackPageview } from "./lib/analytics";
import i18n from "./i18n";
import Landing from "./pages/Landing";
import LandingAlternative from "./pages/LandingAlternative";
import ServicesWien from "./pages/ServicesWien";
import ServicesGraz from "./pages/ServicesGraz";
import ServicesOverview from "./pages/ServicesOverview";
import OfficeCleaning from "./pages/OfficeCleaning";
import DeepCleaning from "./pages/DeepCleaning";
import RestaurantCleaning from "./pages/RestaurantCleaning";
import OneTimeCleaning from "./pages/OneTimeCleaning";
import OneTimePrivate from "./pages/OneTimePrivate";
import OneTimeBusiness from "./pages/OneTimeBusiness";
import PermanentCleaning from "./pages/PermanentCleaning";
import ServiceGeneric from "./pages/ServiceGeneric";
import Contact from "./pages/Contact";
import JobOpening from "./pages/JobOpening";
import GetPartners from "./pages/GetPartners";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Search from "./pages/Search";
import Imprint from "./pages/Imprint";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// Profile page removed; redirects will send users elsewhere
import Footer from "./components/Footer";
import LogoHeader from "./components/LogoHeader";
import NotFound from "./pages/NotFound";
import PriceCalculator from "./pages/PriceCalculator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { AuthProvider } from "./lib/auth";
import { AdminRoute } from "./components/ProtectedRoute";
import { getLocalizedPath } from "./lib/localeRoutes";

function LocaleBoundary({ locale }) {
  const location = useLocation();

  useEffect(() => {
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
  return <Navigate to={to} replace />;
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

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LegacyRedirect to="/de/" />} />
        <Route path="/landing-alt" element={<LegacyRedirect to="/de/landing-alt" />} />
        <Route path="/services" element={<LegacyRedirect to="/de/services" />} />
        <Route path="/services/wien" element={<LegacyRedirect to="/de/services/wien" />} />
        <Route path="/services/graz" element={<LegacyRedirect to="/de/services/graz" />} />
        <Route path="/services/office-cleaning" element={<LegacyRedirect to="/de/services/buero-reinigung" />} />
        <Route path="/services/deep-cleaning" element={<LegacyRedirect to="/de/services/tiefenreinigung" />} />
        <Route path="/services/restaurant-cleaning" element={<LegacyRedirect to="/de/services/restaurantreinigung" />} />
        <Route path="/services/one-time-cleaning" element={<LegacyRedirect to="/de/services/einmalreinigung" />} />
        <Route path="/services/permanent-cleaning" element={<LegacyRedirect to="/de/services/regelmaessige-reinigung" />} />
        <Route path="/contact" element={<LegacyRedirect to="/de/kontakt" />} />
        <Route path="/kontakt" element={<LegacyRedirect to="/de/kontakt" />} />
        <Route path="/job-opening" element={<LegacyRedirect to="/de/karriere" />} />
        <Route path="/get-partners" element={<LegacyRedirect to="/de/partner-werden" />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/datenschutz" element={<LegacyRedirect to="/privacy" />} />
        <Route path="/imprint" element={<LegacyRedirect to="/de/impressum" />} />
        <Route path="/book" element={<LegacyRedirect to="/de/booking" />} />
        <Route path="/search" element={<LegacyRedirect to="/de/search" />} />
        <Route path="/profile" element={<LegacyRedirect to="/de/profile" />} />
        <Route path="/calculator" element={<LegacyRedirect to="/de/calculator" />} />
        <Route path="/login" element={<LegacyRedirect to="/de/login" />} />
        <Route path="/register" element={<LegacyRedirect to="/de/register" />} />
        <Route path="/admin" element={<LegacyRedirect to="/de/admin" />} />
        <Route path="/order/:id" element={<LegacyOrderRedirect />} />

        <Route path="/de" element={<LocaleBoundary locale="de" />}>
          <Route index element={<LandingAlternative />} />
          <Route path="landing-alt" element={<Landing />} />
          <Route path="services" element={<ServicesOverview />} />
          <Route path="services/wien" element={<ServicesWien />} />
          <Route path="services/graz" element={<ServicesGraz />} />
          <Route path="services/buero-reinigung" element={<OfficeCleaning />} />
          <Route path="services/tiefenreinigung" element={<DeepCleaning />} />
          <Route path="services/restaurantreinigung" element={<RestaurantCleaning />} />
          {/* new private service routes */}
          <Route path="services/unterhaltsreinigung" element={<ServiceGeneric />} />
          <Route path="services/grundreinigung" element={<ServiceGeneric />} />
          <Route path="services/wohnreinigung" element={<ServiceGeneric />} />
          <Route path="services/bauendreinigung-grobreinigung" element={<ServiceGeneric />} />
          <Route path="services/glas-rahmenreinigung" element={<ServiceGeneric />} />
          <Route path="services/industriereinigung-maschinen" element={<ServiceGeneric />} />
          <Route path="services/einmalreinigung" element={<OneTimePrivate />} />
          <Route path="services/regelmaessige-reinigung" element={<PermanentCleaning />} />
          {/* new business service routes */}
          <Route path="services/unterhaltsreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/grundreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/treppenhausreinigung" element={<ServiceGeneric />} />
          <Route path="services/bauendreinigung-grobreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/glas-rahmenreinigung-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/industriereinigung-maschinen-gewerbe" element={<ServiceGeneric />} />
          <Route path="services/einmalreinigung-gewerbe" element={<OneTimeBusiness />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="karriere" element={<JobOpening />} />
          <Route path="partner-werden" element={<GetPartners />} />
          <Route path="datenschutz" element={<PrivacyPolicy />} />
          <Route path="impressum" element={<Imprint />} />

          <Route path="booking" element={<Layout><Home /></Layout>} />
          <Route path="order/:id" element={<Layout><Order /></Layout>} />
          <Route path="search" element={<Layout><Search /></Layout>} />
          <Route path="profile" element={<Layout><Home /></Layout>} />
          <Route path="calculator" element={<PriceCalculator />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/en" element={<LocaleBoundary locale="en" />}>
          <Route index element={<LandingAlternative />} />
          <Route path="landing-alt" element={<Landing />} />
          <Route path="services" element={<ServicesOverview />} />
          <Route path="services/wien" element={<ServicesWien />} />
          <Route path="services/graz" element={<ServicesGraz />} />
          <Route path="services/office-cleaning" element={<OfficeCleaning />} />
          <Route path="services/deep-cleaning" element={<DeepCleaning />} />
          <Route path="services/restaurant-cleaning" element={<RestaurantCleaning />} />
          {/* new private service routes (en) */}
          <Route path="services/maintenance-cleaning" element={<ServiceGeneric />} />
          <Route path="services/deep-cleaning-private" element={<ServiceGeneric />} />
          <Route path="services/residential-cleaning" element={<ServiceGeneric />} />
          <Route path="services/construction-cleaning" element={<ServiceGeneric />} />
          <Route path="services/window-cleaning" element={<ServiceGeneric />} />
          <Route path="services/industrial-cleaning" element={<ServiceGeneric />} />
          <Route path="services/one-time-cleaning" element={<OneTimePrivate />} />
          <Route path="services/permanent-cleaning" element={<PermanentCleaning />} />
          {/* new business service routes (en) */}
          <Route path="services/maintenance-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/deep-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/staircase-cleaning" element={<ServiceGeneric />} />
          <Route path="services/construction-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/window-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/industrial-cleaning-business" element={<ServiceGeneric />} />
          <Route path="services/one-time-cleaning-business" element={<OneTimeBusiness />} />
          <Route path="contact" element={<Contact />} />
          <Route path="job-opening" element={<JobOpening />} />
          <Route path="get-partners" element={<GetPartners />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="imprint" element={<Imprint />} />
          <Route path="booking" element={<Layout><Home /></Layout>} />
          <Route path="order/:id" element={<Layout><Order /></Layout>} />
          <Route path="search" element={<Layout><Search /></Layout>} />
          <Route path="profile" element={<Layout><Home /></Layout>} />
          <Route path="calculator" element={<PriceCalculator />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Top-level fallback to localized 404 */}
        <Route path="*" element={<Navigate to="/de/404" replace />} />
      </Routes>
    </AuthProvider>
  );
}


