// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageview } from "./lib/analytics";
import Landing from "./pages/Landing";
import LandingAlternative from "./pages/LandingAlternative";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Search from "./pages/Search";
import Imprint from "./pages/Imprint";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import LogoHeader from "./components/LogoHeader";
import PriceCalculator from "./pages/PriceCalculator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { AuthProvider } from "./lib/auth";
import { AdminRoute } from "./components/ProtectedRoute";

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
        {/* Landing page (full-width, with its own navbar/footer) */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing-alt" element={<LandingAlternative />} />

        {/* Booking / system pages (wrapped with Layout + LogoHeader + Footer) */}
        <Route
          path="/book"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Layout>
              <Order />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route 
          path="/profile" 
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        /> 
        <Route 
          path="/calculator" 
          element={
            <PriceCalculator />
          } 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
        <Route
          path="/imprint"
          element={
            // Imprint should look like Landing with its own header/footer
            <Imprint />
          }
        />
      </Routes>
    </AuthProvider>
  );
}


