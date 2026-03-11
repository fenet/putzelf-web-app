import { useEffect, useState } from "react";
import { apiFetch, parseJsonSafe } from "../lib/api";
import { Link } from "react-router-dom";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await apiFetch("/api/bookings");
        const data = await parseJsonSafe(res);
        if (!res.ok) throw new Error(data?.error || "Failed to load bookings");
        if (!cancelled) setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin dashboard</h1>
          <div className="flex items-center gap-3">
            <Link to="/profile" className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50">
              Go to profile
            </Link>
          </div>
        </header>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{b.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.time}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.typeOfCleaning}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.duration}h</td>
                      <td className="px-4 py-3 text-sm text-gray-700">€{Number(b.price || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="p-6 text-center text-gray-500">No bookings found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




