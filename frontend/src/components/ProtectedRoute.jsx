import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to={getLocalizedPath(locale, "login")} replace />;
  return children;
}

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to={getLocalizedPath(locale, "login")} replace />;
  if (!isAdmin) return <Navigate to={getLocalizedPath(locale, "booking")} replace />;
  return children;
}



