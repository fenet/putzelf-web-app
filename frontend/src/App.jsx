// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import LogoHeader from "./components/LogoHeader";

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
  return (
    <Routes>
      {/* Landing page (full-width, with its own navbar/footer) */}
      <Route path="/" element={<Landing />} />

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
    </Routes>
  );
}


