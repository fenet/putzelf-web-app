import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

import { apiFetch } from "../lib/api";
import { trackEvent } from "../lib/analytics";
import { Gift, PartyPopper } from "lucide-react"; // 🎉 Lucide icons
import Confetti from "react-confetti"; // 🎊 Confetti animation

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
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  // 🎉 Added popup state
  const [showPopup, setShowPopup] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    apiFetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBooking(data);
        if (data?.email || data?.phone) {
          setCustomer((c) => ({
            ...c,
            email: data.email || c.email,
            phone: data.phone || c.phone,
          }));
        }
      })
      .catch(console.error);

    // 🎊 Update confetti size
    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [id]);

  useEffect(() => {
    if (!phoneInputRef.current) return;

    const inputEl = phoneInputRef.current;
    itiRef.current = intlTelInput(inputEl, {
      initialCountry: "at",
      nationalMode: false,
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.5.6/build/js/utils.js",
    });

    if (customer.phone) {
      itiRef.current.setNumber(customer.phone);
    }

    const syncPhone = () => {
      const number = itiRef.current?.getNumber() || inputEl.value;
      setCustomer((c) => ({ ...c, phone: number }));
    };

    inputEl.addEventListener("countrychange", syncPhone);
    inputEl.addEventListener("input", syncPhone);
    inputEl.addEventListener("blur", syncPhone);

    return () => {
      inputEl.removeEventListener("countrychange", syncPhone);
      inputEl.removeEventListener("input", syncPhone);
      inputEl.removeEventListener("blur", syncPhone);
      itiRef.current?.destroy();
      itiRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!itiRef.current) return;

    const currentNumber = itiRef.current.getNumber();
    if (customer.phone && customer.phone !== currentNumber) {
      itiRef.current.setNumber(customer.phone);
    }
  }, [customer.phone]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer((c) => ({ ...c, [name]: type === "checkbox" ? checked : value }));
  };

  const handleConfirm = async () => {
    setError(null);
    setLoadingConfirm(true);

    const trimmedEmail = customer.email.trim();
    const intlNumber = itiRef.current?.getNumber() || customer.phone.trim();
    const normalizedPhone = intlNumber.replace(/\s+/g, "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setLoadingConfirm(false);
      setError(t("order.errors.invalidEmail"));
      return;
    }

    const phoneValid = itiRef.current
      ? itiRef.current.isValidNumber()
      : /^\+?[0-9\s\-()]{7,}$/.test(normalizedPhone);

    if (!normalizedPhone || !phoneValid) {
      setLoadingConfirm(false);
      setError(t("order.errors.invalidPhone"));
      return;
    }

    const payload = {
      ...customer,
      email: trimmedEmail,
      phone: normalizedPhone,
    };

    try {
      try {
        trackEvent("Order_Submit_Click", { bookingId: id, service_type: booking?.typeOfCleaning });
      } catch (_) {}

      const res = await apiFetch(`/api/bookings/${id}/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm booking");

      setCustomer((c) => ({ ...c, email: trimmedEmail, phone: normalizedPhone }));
      itiRef.current?.setNumber(normalizedPhone);
      setConfirmed(true);
      setBooking(data.booking || booking);

      try {
        trackEvent("Confirmation_View", {
          bookingId: id,
          service_type: booking?.typeOfCleaning,
          price: booking?.price,
        });
      } catch (_) {}
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingConfirm(false);
    }
  };

  if (!booking) return <p className="text-center mt-10">{t("order.loading")}</p>;

  return (
    <div className="bg-[#f9fafa] min-h-screen py-1 px-4 flex flex-col items-center relative overflow-hidden">
      {/* 🎉 Celebration Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center border border-[#5be3e3]/30">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#5be3e3] rounded-full p-3 shadow-md">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl mb-3 animate-bounce">🎉🥳🎁</div>
            <h3 className="text-2xl font-extrabold text-[#0097b2] mb-2">
              Sie haben 20 % Rabatt erhalten!
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ihr Preis wird Ihnen per E-Mail gesendet, sobald Sie bestätigen.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 px-6 py-2 bg-[#5be3e3] text-black font-semibold rounded-full hover:bg-[#48c9c9] transition"
            >
              OK
            </button>
            <div className="absolute bottom-2 right-2 opacity-70">
              <PartyPopper className="h-6 w-6 text-[#00b3c1]" />
            </div>
          </div>

          {/* 🎊 Confetti Animation */}
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={250} />
        </div>
      )}

      {/* Logo + Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#000000] mt-4">{t("order.confirmTitle")}</h1>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7]">
          <h2 className="text-2xl font-bold text-[#5be3e3] mb-6">{t("order.summary")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 break-words">
            <p>
              <strong>{t("order.date")}:</strong> {booking.date}
            </p>
            <p>
              <strong>{t("order.time")}:</strong> {booking.time}
            </p>
            <p className="min-w-0">
              <strong>{t("order.cleaningType")}:</strong>{" "}
              <span className="break-words whitespace-normal">{booking.typeOfCleaning}</span>
            </p>
            <p className="min-w-0">
              <strong>{t("order.duration")}:</strong>{" "}
              <span className="break-words whitespace-normal">
                {booking.duration} {t("order.durationUnit")}
              </span>
            </p>
          </div>
        </div>

        {/* Confirmation Form or Success */}
        {!confirmed ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7] space-y-4">
            <h3 className="text-xl font-semibold text-[#5be3e3]">{t("order.enterDetails")}</h3>

            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder={t("order.placeholders.name")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder={t("order.placeholders.email")}
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder={t("order.placeholders.address")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              ref={phoneInputRef}
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder={t("order.placeholders.phone")}
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
                {t("order.gdprPrefix")}
                <a href="/privacy" className="text-[#5be3e3] underline hover:text-[#000000]">
                  {t("order.gdprLink")}
                </a>
                .
              </span>
            </label>

            <button
              onClick={handleConfirm}
              disabled={loadingConfirm}
              className="w-full bg-[#5be3e3] text-black font-semibold py-3 rounded-xl hover:bg-[#48c9c9] transition"
            >
              {loadingConfirm ? t("order.confirming") : t("order.confirmBtn")}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-xl text-center">
            <h4 className="text-green-700 font-bold text-xl">{t("order.confirmedTitle")}</h4>
            <p className="mt-2 text-gray-700">
              {t("order.confirmedMsg", { email: customer.email || booking.email })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}