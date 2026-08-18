import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { apiFetch } from "../lib/api";
import { trackEvent } from "../lib/analytics";
import { Gift, PartyPopper } from "lucide-react";
import Confetti from "react-confetti";
import Seo from "../components/Seo";

const COUNTRY_OPTIONS = [
  { code: "at", label: "Austria (+43)" },
  { code: "de", label: "Germany (+49)" },
  { code: "ch", label: "Switzerland (+41)" },
  { code: "cz", label: "Czechia (+420)" },
  { code: "sk", label: "Slovakia (+421)" },
  { code: "hu", label: "Hungary (+36)" },
  { code: "pl", label: "Poland (+48)" },
  { code: "it", label: "Italy (+39)" },
  { code: "si", label: "Slovenia (+386)" },
  { code: "hr", label: "Croatia (+385)" },
];

  // add more European countries
  const EXTRA_COUNTRIES = [
    { code: "nl", label: "Netherlands (+31)" },
    { code: "be", label: "Belgium (+32)" },
    { code: "fr", label: "France (+33)" },
    { code: "it", label: "Italy (+39)" },
    { code: "es", label: "Spain (+34)" },
  ];
  const ALL_COUNTRIES = [...COUNTRY_OPTIONS, ...EXTRA_COUNTRIES];

export default function Order() {
  const { t } = useTranslation();
  const { id } = useParams();
  const isQuoteRequest = id === "request";
  const pageTitle = isQuoteRequest
    ? t("order.quoteRequestTitle", { defaultValue: "Quote request" })
    : t("order.title", { defaultValue: "Order" });
  const [booking, setBooking] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    notes: "",
    gdprConsent: false,
  });
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("at");
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const [showPopup, setShowPopup] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [confirmationEventId, setConfirmationEventId] = useState(null);
  const confirmationTrackedRef = useRef(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setEmailError(t("order.errors.requiredEmail"));
      return false;
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError(t("order.errors.invalidEmail"));
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setPhoneError(t("order.errors.requiredPhone"));
      return false;
    }
    const isValid = itiRef.current
      ? itiRef.current.isValidNumber()
      : /^\+?[0-9\s\-()]{7,}$/.test(trimmed);
    if (!isValid) {
      setPhoneError(t("order.errors.invalidPhone"));
      return false;
    }
    setPhoneError("");
    return true;
  };

  useEffect(() => {
    if (isQuoteRequest) {
      setBooking({
        date: "-",
        time: "-",
        typeOfCleaning: "Angebot anfragen",
        duration: "-",
      });
      return;
    }

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
          if (data?.email) validateEmail(data.email);
          if (data?.phone) validatePhone(data.phone);
        }
      })
      .catch(console.error);

    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [id, isQuoteRequest]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!phoneInputRef.current) return;

    const inputEl = phoneInputRef.current;
    itiRef.current = intlTelInput(inputEl, {
      initialCountry: selectedCountry,
      nationalMode: false,
      allowDropdown: true,
      separateDialCode: true,
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.5.6/build/js/utils.js",
    });

    if (customer.phone) {
      itiRef.current.setNumber(customer.phone);
      const countryData = itiRef.current.getSelectedCountryData();
      if (countryData?.iso2) {
        setSelectedCountry(countryData.iso2);
      }
    }

    const syncPhone = () => {
      const number = itiRef.current?.getNumber() || inputEl.value;
      setCustomer((c) => ({ ...c, phone: number }));
      const countryData = itiRef.current?.getSelectedCountryData();
      if (countryData?.iso2) setSelectedCountry(countryData.iso2);
      validatePhone(number);
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
      const countryData = itiRef.current.getSelectedCountryData();
      if (countryData?.iso2) setSelectedCountry(countryData.iso2);
    }
  }, [customer.phone]);

  useEffect(() => {
    if (itiRef.current && selectedCountry) {
      itiRef.current.setCountry(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (!confirmed || !booking || confirmationTrackedRef.current) return;

    confirmationTrackedRef.current = true;
    try {
      trackEvent("Booking_Confirmed", {
        bookingId: booking?.id || id,
        service_type: booking?.typeOfCleaning,
        value: booking?.price,
        currency: "EUR",
        event_id: confirmationEventId,
      });
      trackEvent("Confirmation_View", {
        bookingId: booking?.id || id,
        service_type: booking?.typeOfCleaning,
        price: booking?.price,
      });
    } catch (_) {}
  }, [confirmed, booking, confirmationEventId, id]);

  const handleCountryChange = (e) => {
    const iso2 = e.target.value;
    setSelectedCountry(iso2);
    if (itiRef.current) {
      itiRef.current.setCountry(iso2);
      const number = itiRef.current.getNumber();
      setCustomer((c) => ({ ...c, phone: number }));
      validatePhone(number);
    }
  };

  const validateContactBeforeDetails = () => {
    const nameOk = validateName(customer.name || "");
    const emailOk = validateEmail(customer.email || "");
    const addressOk = validateAddress(customer.address || "");
    const phoneOk = validatePhone(customer.phone || "");
    return nameOk && emailOk && addressOk && phoneOk;
  };

  const openDetailsIfValid = () => {
    if (validateContactBeforeDetails()) {
      setDetailsOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "email") {
      setCustomer((c) => ({ ...c, email: value }));
      validateEmail(value);
      return;
    }

    if (name === "phone") {
      setCustomer((c) => ({ ...c, phone: value }));
      validatePhone(value);
      return;
    }

    setCustomer((c) => ({ ...c, [name]: type === "checkbox" ? checked : value }));
  };

  const handleConfirm = async () => {
    setError(null);
    setLoadingConfirm(true);
    confirmationTrackedRef.current = false;

    const trimmedEmail = customer.email.trim();
    const intlNumber = itiRef.current?.getNumber() || customer.phone.trim();
    const countryData = itiRef.current?.getSelectedCountryData();
    let normalizedPhone = intlNumber.replace(/\s+/g, "");
    if (countryData?.dialCode && !normalizedPhone.startsWith("+")) {
      normalizedPhone = `+${countryData.dialCode}${normalizedPhone.replace(/^0+/, "")}`;
    }

    const eventId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    const emailOk = validateEmail(trimmedEmail);
    const phoneOk = validatePhone(normalizedPhone);

    if (!emailOk || !phoneOk) {
      setLoadingConfirm(false);
      return;
    }

    const payload = {
      ...customer,
      email: trimmedEmail,
      phone: normalizedPhone,
      metaEventId: eventId,
      metaEventSource: typeof window !== "undefined" ? window.location.href : undefined,
    };

    try {
      try {
        trackEvent("Order_Submit_Click", {
          bookingId: id,
          service_type: booking?.typeOfCleaning,
          event_id: eventId,
        });
      } catch (_) {}

      let bookingIdToConfirm = id;

      if (isQuoteRequest) {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toTimeString().slice(0, 5);

        const createRes = await apiFetch(`/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // default to vienna when no explicit location provided here
            location: customer.address || "vienna",
            date,
            time,
            duration: 3,
            typeOfCleaning: "Quote Request",
            renegotiate: true,
          }),
        });

        const created = await createRes.json();
        if (!createRes.ok || !created?.id) {
          throw new Error(created?.error || "Failed to create quote request");
        }
        bookingIdToConfirm = created.id;
      }

      const res = await apiFetch(`/api/bookings/${bookingIdToConfirm}/confirm`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm booking");

      const confirmedBooking = data.booking || booking;

      setCustomer((c) => ({
        ...c,
        email: trimmedEmail,
        phone: normalizedPhone,
      }));
      itiRef.current?.setNumber(normalizedPhone);
      setConfirmed(true);
      setBooking(confirmedBooking);
      setConfirmationEventId(eventId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingConfirm(false);
    }
  };

  if (!booking) return <p className="text-center mt-10">{t("order.loading")}</p>;

  return (
    <div className="bg-[#f9fafa] min-h-screen py-1 px-4 flex flex-col items-center relative overflow-hidden">
      <Seo
        title={pageTitle}
        description={pageTitle}
        path={`/order/${id || ""}`}
        noindex
      />
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

          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={250}
          />
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#000000] mt-4">
          {t("order.confirmTitle")}
        </h1>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        {!isQuoteRequest && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7]">
            <h2 className="text-2xl font-bold text-[#5be3e3] mb-6">
              {t("order.summary")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 break-words">
              <p>
                <strong>{t("order.date")}:</strong> {booking.date}
              </p>
              <p>
                <strong>{t("order.time")}:</strong> {booking.time}
              </p>
              <p className="min-w-0">
                <strong>{t("order.cleaningType")}:</strong>{" "}
                <span className="break-words whitespace-normal">
                  {booking.typeOfCleaning}
                </span>
              </p>
              <p className="min-w-0">
                <strong>{t("order.duration")}:</strong>{" "}
                <span className="break-words whitespace-normal">
                  {booking.duration} {t("order.durationUnit")}
                </span>
              </p>
            </div>
          </div>
        )}

        {!confirmed ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7] space-y-4">
            <h3 className="text-xl font-semibold text-[#5be3e3]">
              {t("order.enterDetails")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("order.labels.name", { defaultValue: "Name" })}</label>
                <input
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  placeholder={t("order.placeholders.name", { defaultValue: "Vor- und Nachname" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("order.labels.email", { defaultValue: "E-Mail" })}</label>
                <input
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  placeholder={t("order.placeholders.email", { defaultValue: "E-Mail-Adresse" })}
                  type="email"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3] ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">{t("order.labels.address", { defaultValue: "Adresse" })}</label>
                <input
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  placeholder={t("order.placeholders.address", { defaultValue: "Straßenname, Hausnr., Türnr." })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">{t("order.labels.phone", { defaultValue: "Telefon" })}</label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="w-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
                    aria-label="Select country"
                  >
                    {ALL_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </select>

                  <input
                    ref={phoneInputRef}
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder={t("order.placeholders.phone", { defaultValue: "Telefonnummer" })}
                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3] ${
                      phoneError ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                )}
              </div>
            </div>

            {!detailsOpen ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={openDetailsIfValid}
                  className="w-full bg-[#0097b2] text-white font-semibold py-3 rounded-xl hover:bg-[#007f95] transition"
                >
                  {t("order.directInquiry", { defaultValue: "Direkt anfragen" })}
                </button>
              </div>
            ) : null}

            {detailsOpen && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1 text-gray-700">
                    {t("order.notesLabel", { defaultValue: "Anmerkungen" })}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={customer.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t("order.placeholders.notes", { defaultValue: "Bitte schreiben Sie hier zusätzliche Anmerkungen oder Wünsche..." })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5be3e3] resize-y"
                  />
                </div>

                <label className="flex items-start space-x-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={customer.gdprConsent}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1"
                  />
                  <span>
                    {t("order.gdprFull", { defaultValue: "Ich stimme zu, dass meine Daten für die Buchung verarbeitet und ich bezüglich dieser Buchung kontaktiert werde." })}
                    <a
                      href="/privacy"
                      className="text-[#5be3e3] underline hover:text-[#000000] ml-1"
                    >
                      {t("order.gdprLink")}
                    </a>
                  </span>
                </label>

                <button
                  onClick={handleConfirm}
                  disabled={loadingConfirm}
                  className="w-full bg-[#5be3e3] text-black font-semibold py-3 rounded-xl hover:bg-[#48c9c9] transition disabled:opacity-60"
                >
                  {loadingConfirm ? t("order.confirming") : t("order.submitBtn", { defaultValue: "Jetzt anfragen" })}
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-xl text-center">
            {typeof window !== "undefined" && !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches && (
              <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />
            )}
            <h4 className="text-green-700 font-bold text-xl">
              {t("order.confirmedTitle")}
            </h4>
            <p className="mt-2 text-gray-700">
              {t("order.confirmedMsg", {
                email: customer.email || booking.email,
              })}
            </p>
            {booking?.id && (
              <p className="mt-2 text-sm text-gray-600">{t("order.bookingId", { id: booking.id })}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}