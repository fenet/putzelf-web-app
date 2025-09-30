import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function Order() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gdprConsent: false,
  });
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    apiFetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then(setBooking)
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer((c) => ({ ...c, [name]: type === "checkbox" ? checked : value }));
  };

  const handleConfirm = async () => {
    setError(null);
    setLoadingConfirm(true);
    try {
      const res = await apiFetch(`/api/bookings/${id}/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm booking");
      setConfirmed(true);
      setBooking(data.booking || booking);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingConfirm(false);
    }
  };

  if (!booking) return <p className="text-center mt-10">{t('order.loading')}</p>;

  return (
    <div className="bg-[#f9fafa] min-h-screen py-1 px-4 flex flex-col items-center">
      {/* Logo + Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#000000] mt-4">{t('order.confirmTitle')}</h1>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7]">
          <h2 className="text-2xl font-bold text-[#5be3e3] mb-6">{t('order.summary')}</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>{t('order.date')}:</strong> {booking.date}</p>
            <p><strong>{t('order.time')}:</strong> {booking.time}</p>
            <p><strong>{t('order.cleaningType')}:</strong> {booking.typeOfCleaning}</p>
            <p><strong>{t('order.duration')}:</strong> {booking.duration} {t('order.durationUnit')}</p>
            <p><strong>{t('order.price')}:</strong> {booking.price}€</p>
          </div>
         </div>

        {/* Confirmation Form or Success */}
        {!confirmed ? ( 
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7] space-y-4">
            <h3 className="text-xl font-semibold text-[#5be3e3]">{t('order.enterDetails')}</h3>

            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder={t('order.placeholders.name')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder={t('order.placeholders.email')}
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder={t('order.placeholders.address')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder={t('order.placeholders.phone')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />

            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="gdprConsent"
                checked={customer.gdprConsent}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>
                {t('order.gdprPrefix')}
                <a
                  href="/privacy"
                  className="text-[#5be3e3] underline hover:text-[#000000]"
                >
                  {t('order.gdprLink')}
                </a>.
              </span>
            </label>

            <button
              onClick={handleConfirm}
              disabled={loadingConfirm}
              className="w-full bg-[#5be3e3] text-black font-semibold py-3 rounded-xl hover:bg-[#48c9c9] transition"
            >
              {loadingConfirm ? t('order.confirming') : t('order.confirmBtn')}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-xl text-center">
            <h4 className="text-green-700 font-bold text-xl">
              {t('order.confirmedTitle')}
            </h4>
            <p className="mt-2 text-gray-700">
              {t('order.confirmedMsg', { email: customer.email || booking.email })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

