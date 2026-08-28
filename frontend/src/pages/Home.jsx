import { useState, useEffect } from "react";
import { MIN_HOURS, WINDOW_PRICE_NET, INTENSIVE_HOURLY_NET } from "../config/pricing";
import { trackEvent } from "../lib/analytics";
import { apiFetch, parseJsonSafe } from "../lib/api";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import Seo from "../components/Seo";
import Confetti from "react-confetti";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);

  const [form, setForm] = useState({
    // contact first (structured)
    title: "",
    firstName: "",
    lastName: "",
    streetName: "",
    houseNumber: "",
    doorNumber: "",
    buildingNumber: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    // legacy/fallback free-text fields
    name: "",
    location: "",
    // booking fields
    date: "",
    time: "",
    duration: MIN_HOURS,
    windows: 0,
    typeOfCleaning: "Standard Cleaning",
    subcategories: [],
    renegotiate: false,
  });

  // service location (vienna | graz) — ask every time booking page mounts
  const [serviceLocation, setServiceLocation] = useState("");
  const [locationModalOpen, setLocationModalOpen] = useState(true);

  // worker selection removed: booking no longer depends on employee listing

  // flow choice: direct inquiry or view price calculator
  const [flowChoice, setFlowChoice] = useState("inquiry");

  // Contact validation state (mirrors Order.jsx logic)
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [houseNumberError, setHouseNumberError] = useState("");
  const [postalError, setPostalError] = useState("");
  const [cityError, setCityError] = useState("");
  const [gdprError, setGdprError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setEmailError(t("order.errors.requiredEmail") || "Email is required");
      return false;
    }
    if (trimmed.includes("..")) {
      setEmailError(t("order.errors.invalidEmailDoubleDot") || "Email cannot contain consecutive dots");
      return false;
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError(t("order.errors.invalidEmail") || "Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailBlur = (e) => {
    const raw = String(e.target.value || "");
    const sanitized = raw.trim().replace(/\.{2,}/g, ".");
    if (sanitized !== raw) {
      setForm((prev) => ({ ...prev, email: sanitized }));
    }
    validateEmail(sanitized);
  };

  const validatePhone = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setPhoneError(t("order.errors.requiredPhone"));
      return false;
    }
    const isValid = /^\+?[0-9\s\-()]{7,}$/.test(trimmed);
    if (!isValid) {
      setPhoneError(t("order.errors.invalidPhone"));
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateName = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setNameError(t("order.errors.requiredName", { defaultValue: "Name is required" }));
      return false;
    }
    setNameError("");
    return true;
  };

  const validateAddress = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setAddressError(t("order.errors.requiredAddress", { defaultValue: "Address is required" }));
      return false;
    }
    setAddressError("");
    return true;
  };
  const validateFirstName = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setFirstNameError(t("order.errors.requiredFirstName", { defaultValue: "First name is required" }));
      return false;
    }
    setFirstNameError("");
    return true;
  };

  const validateLastName = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setLastNameError(t("order.errors.requiredLastName", { defaultValue: "Last name is required" }));
      return false;
    }
    setLastNameError("");
    return true;
  };

  const validateStreetName = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setStreetError(t("order.errors.requiredStreet", { defaultValue: "Street name is required" }));
      return false;
    }
    setStreetError("");
    return true;
  };

  const validateHouseNumber = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setHouseNumberError(t("order.errors.requiredHouseNumber", { defaultValue: "House number is required" }));
      return false;
    }
    setHouseNumberError("");
    return true;
  };

  const validatePostalCode = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setPostalError(t("order.errors.requiredPostal", { defaultValue: "Postal code is required" }));
      return false;
    }
    setPostalError("");
    return true;
  };

  const validateCity = (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      setCityError(t("order.errors.requiredCity", { defaultValue: "City is required" }));
      return false;
    }
    setCityError("");
    return true;
  };

  // Persist/restore contact fields when navigating to calculator
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("booking_contact");
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch (_) {}
  }, []);

  const saveContactToSession = () => {
    try {
      const contact = {
        title: form.title || "",
        firstName: form.firstName || "",
        lastName: form.lastName || "",
        streetName: form.streetName || "",
        houseNumber: form.houseNumber || "",
        doorNumber: form.doorNumber || "",
        buildingNumber: form.buildingNumber || "",
        postalCode: form.postalCode || "",
        city: form.city || "",
        phone: form.phone || "",
        email: form.email || "",
        // legacy
        name: form.name || "",
        location: form.location || "",
      };
      sessionStorage.setItem("booking_contact", JSON.stringify(contact));
    } catch (_) {}
  };

  const selectedWorkerName = null;

  const [rewardImageError, setRewardImageError] = useState(false);

  const [gdprConsent, setGdprConsent] = useState(false);
  const [notes, setNotes] = useState("");
  const [successBooking, setSuccessBooking] = useState(null);
  const [showWindowModal, setShowWindowModal] = useState(false);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  const toYYYYMM = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const todayYMD = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  })();

  const parseYMDToMonthCursor = (ymd) => {
    const raw = String(ymd || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    const [y, m] = raw.split("-").map((v) => Number(v));
    if (!y || !m) {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    return new Date(y, m - 1, 1);
  };

  const [monthCursor, setMonthCursor] = useState(() => parseYMDToMonthCursor(form.date));
  const [monthAvailableDays, setMonthAvailableDays] = useState(() => new Set());
  const [monthLoading, setMonthLoading] = useState(false);
  const [monthError, setMonthError] = useState(null);

  useEffect(() => {
    if (!form.date) return;
    const next = parseYMDToMonthCursor(form.date);
    setMonthCursor((prev) => {
      if (prev.getFullYear() === next.getFullYear() && prev.getMonth() === next.getMonth()) {
        return prev;
      }
      return next;
    });
  }, [form.date]);

  useEffect(() => {
    const durationHours = Number(form.duration || 0);
    if (!durationHours) {
      setMonthAvailableDays(new Set());
      setMonthError(null);
      setMonthLoading(false);
      return;
    }

    // allow fetching month availability even if address not provided

    const controller = new AbortController();
    const params = new URLSearchParams({
      month: toYYYYMM(monthCursor),
      duration_hours: String(durationHours),
    });
    if (form.location) params.set("address", String(form.location));

    (async () => {
      try {
        setMonthLoading(true);
        setMonthError(null);
        const res = await apiFetch(`/api/availability/month?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await parseJsonSafe(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load availability");
        }
        const days = Array.isArray(data?.availableDays) ? data.availableDays : [];
        const set = new Set(days.filter((d) => typeof d === "string"));
        setMonthAvailableDays(set);
        setForm((prev) => {
          if (prev.date && !set.has(prev.date)) {
            return { ...prev, date: "", time: "" };
          }
          return prev;
        });
      } catch (err) {
        if (err?.name === "AbortError") return;
          setMonthAvailableDays(new Set());
          const msg = err?.message ? String(err.message) : null;
          const base = t("home.calendar.errorFetchDates", { defaultValue: "Failed to fetch dates." });
          setMonthError(msg ? `${base} ${msg}` : base);
      } finally {
        setMonthLoading(false);
      }
    })();

    return () => controller.abort();
  }, [form.duration, form.location, monthCursor]);

  const getHourlyRate = (typeOfCleaning, subcategories) => {
    const isHouseCleaning = typeOfCleaning === t("home.types.standard");
    const isApartmentHotel = typeOfCleaning === t("home.types.apartmentHotel");
    const isEligible = isHouseCleaning || isApartmentHotel;
    const subs = Array.isArray(subcategories) ? subcategories : [];

    if (!isEligible || subs.length === 0) return 30;
    if (subs.includes("intensive")) return INTENSIVE_HOURLY_NET;
    // windows are charged per-window, not by hourly rate
    return 30;
  };

  const [calculatedPrice, setCalculatedPrice] = useState(
    getHourlyRate(form.typeOfCleaning, []) * MIN_HOURS
  );

  const cleaningTypes = [
    { key: "standard", emoji: "✨" },
    { key: "office", emoji: "🏢" },
    { key: "apartmentHotel", emoji: "🏨" },
  ];

  const premiumSubcategories = [
    { key: "intensive", emoji: "🧹" },
    { key: "window", emoji: "🪟" },
  ];

  const shouldShowSubcategories = (() => {
    const selectedType = form.typeOfCleaning;
    return (
      selectedType === t("home.types.standard") ||
      selectedType === t("home.types.apartmentHotel")
    );
  })();

  const getDisplayRate = () => {
    const hasPremium =
      shouldShowSubcategories &&
      Array.isArray(form.subcategories) &&
      form.subcategories.length > 0;
    return hasPremium ? 35 : 25;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (name === "duration") {
      let hours = Number(updatedValue) || 0;
      if (hours < MIN_HOURS) hours = MIN_HOURS;
      updatedValue = hours;
      const rate = getHourlyRate(form.typeOfCleaning, form.subcategories);
      const windowsNet = Number(form.windows || 0) * WINDOW_PRICE_NET;
      setCalculatedPrice(hours * rate + windowsNet);
    }

    setForm((prev) => {
      const next = { ...prev, [name]: updatedValue };
      if (name === "date" || name === "duration" || name === "location") {
        next.time = "";
      }

      // run validators for contact fields
      if (name === "email") validateEmail(updatedValue);
      if (name === "phone") validatePhone(updatedValue);
      if (name === "name") validateName(updatedValue);
      if (name === "location") validateAddress(updatedValue);
      if (name === "firstName") validateFirstName(updatedValue);
      if (name === "lastName") validateLastName(updatedValue);
      if (name === "streetName") validateStreetName(updatedValue);
      if (name === "houseNumber") validateHouseNumber(updatedValue);
      if (name === "postalCode") validatePostalCode(updatedValue);
      if (name === "city") validateCity(updatedValue);
      if (name === "gdprConsent") setGdprConsent(Boolean(updatedValue));

      return next;
    });
  };

  useEffect(() => {
    const day = String(form.date || "").trim();
    const durationHours = Number(form.duration || 0);

    if (!day || !durationHours) {
      setAvailableSlots([]);
      setSlotsError(null);
      setSlotsLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      day,
      duration_hours: String(durationHours),
    });
    if (form.location) params.set("address", String(form.location));

    (async () => {
      try {
        setSlotsLoading(true);
        setSlotsError(null);
        const res = await apiFetch(`/api/availability/slots?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await parseJsonSafe(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load available times");
        }

        const slots = Array.isArray(data?.slots) ? data.slots : [];
        setAvailableSlots(slots);
        setForm((prev) => {
          if (prev.time && !slots.includes(prev.time)) {
            return { ...prev, time: "" };
          }
          return prev;
        });
      } catch (err) {
        if (err?.name === "AbortError") return;
          setAvailableSlots([]);
          const msg = err?.message ? String(err.message) : null;
          const base = t("home.calendar.errorFetchSlots", { defaultValue: "Failed to fetch available times." });
          setSlotsError(msg ? `${base} ${msg}` : base);
      } finally {
        setSlotsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [form.date, form.duration, form.location]);

  const decrementDuration = () => {
    setForm((prev) => {
      const next = Math.max(MIN_HOURS, Number(prev.duration || 0) - 1);
      const rate = getHourlyRate(prev.typeOfCleaning, prev.subcategories);
      const windowsNet = Number(prev.windows || 0) * WINDOW_PRICE_NET;
      setCalculatedPrice(next * rate + windowsNet);
      return { ...prev, duration: next };
    });
  };

  const incrementDuration = () => {
    setForm((prev) => {
      const next = Number(prev.duration || 0) + 1;
      const rate = getHourlyRate(prev.typeOfCleaning, prev.subcategories);
      const windowsNet = Number(prev.windows || 0) * WINDOW_PRICE_NET;
      setCalculatedPrice(next * rate + windowsNet);
      return { ...prev, duration: next };
    });
  };

  const handleDurationKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      incrementDuration();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrementDuration();
    }
  };

  const chooseType = (label) => {
    setForm((prev) => {
      const nextSubs = [];
      const rate = getHourlyRate(label, nextSubs);
      setCalculatedPrice(prev.duration * rate);
      return { ...prev, typeOfCleaning: label, subcategories: nextSubs };
    });
    try {
      trackEvent("Service_Type_Selected", {
        service_type: label,
        source: "booking_form",
      });
    } catch (_) {}
  };

  const chooseSubcategory = (subKey) => {
    setForm((prev) => {
      const current = Array.isArray(prev.subcategories)
        ? prev.subcategories
        : [];
      const exists = current.includes(subKey);
      const nextSubs = exists
        ? current.filter((k) => k !== subKey)
        : [...current, subKey];
      const rate = getHourlyRate(prev.typeOfCleaning, nextSubs);
      const windowsNet = Number(prev.windows || 0) * WINDOW_PRICE_NET;
      // if enabling window, ensure at least 1
      if (!exists && subKey === "window") {
        const w = prev.windows && prev.windows > 0 ? prev.windows : 1;
        setShowWindowModal(true);
        setCalculatedPrice(prev.duration * rate + w * WINDOW_PRICE_NET);
        return { ...prev, subcategories: nextSubs, windows: w };
      }

      setCalculatedPrice(prev.duration * rate + windowsNet);
      return { ...prev, subcategories: nextSubs };
    });
    try {
      trackEvent("Service_Subcategory_Toggled", {
        subcategory: subKey,
        service_type: form.typeOfCleaning,
        source: "booking_form",
      });
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceLocation) {
      alert(t("home.locationModal.validation"));
      return;
    }

    // worker is optional now
    if (!form.typeOfCleaning) {
      alert(t("home.alerts.missing"));
      return;
    }

    // Sanitize and validate contact fields (mirror Order.jsx behavior)
    const sanitizedEmail = String(form.email || "").trim().replace(/\.{2,}/g, ".");
    if (sanitizedEmail !== form.email) setForm((prev) => ({ ...prev, email: sanitizedEmail }));

    const nameOk = validateName(form.name) || (validateFirstName(form.firstName) && validateLastName(form.lastName));
    const phoneOk = validatePhone(form.phone);
    const emailOk = validateEmail(sanitizedEmail);
    const addressOk = (
      // accept legacy free-text OR structured address
      validateAddress(form.location) || (
        validateStreetName(form.streetName) && validateHouseNumber(form.houseNumber) && validatePostalCode(form.postalCode) && validateCity(form.city)
      )
    );
    const gdprOk = gdprConsent === true;
    if (!gdprOk) {
      setGdprError(t("order.errors.requiredGdpr", { defaultValue: "Please agree to GDPR consent" }));
    } else {
      setGdprError("");
    }

    if (!nameOk || !phoneOk || !emailOk || !addressOk || !gdprOk) {
      return;
    }

    try {
      try {
        trackEvent("Booking_Form_Submit", {
          service_type: form.typeOfCleaning,
          duration: form.duration,
          price: calculatedPrice,
          preferredWorker: null,
        });
      } catch (_) {}

      // build payload with structured fields, but keep legacy flat fields for compatibility
      const canonicalName = (form.firstName || form.lastName) ? `${form.firstName || ""} ${form.lastName || ""}`.trim() : form.name;
      const canonicalAddress = (form.streetName || form.houseNumber || form.postalCode || form.city)
        ? `${form.streetName || ""} ${form.houseNumber || ""}${form.doorNumber ? ", Tür " + form.doorNumber : ""}, ${form.postalCode || ""} ${form.city || ""}`.trim()
        : form.location;

      const payload = {
        ...form,
        preferredWorker: null,
        // legacy compatibility
        name: canonicalName,
        email: sanitizedEmail,
        address: canonicalAddress,
        location: serviceLocation || "vienna",
        phone: form.phone,
        notes,
        gdprConsent,
      };

      const res = await apiFetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseJsonSafe(res);
      if (!res.ok)
        throw new Error(
          (data && data.error) || "Failed to create booking"
        );

      try {
        trackEvent("Booking_Created", {
          bookingId: data?.id,
          service_type: form.typeOfCleaning,
          price: calculatedPrice,
          preferredWorker: null,
        });
      } catch (_) {}

      // Show in-place success state instead of redirecting to order page
      setSuccessBooking(data);
    } catch (err) {
      console.error(err);
      alert(
        t("home.alerts.createError", { msg: err.message || "unknown" })
      );
    }
  };

  return (
    <div className="flex flex-col items-center py-1 px-4">
      {showWindowModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-3 text-lg font-semibold">{t("windowModal.title", { defaultValue: "How many windows would you like cleaned?" })}</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={form.windows || 1}
                onChange={(e) => setForm((prev) => ({ ...prev, windows: Math.max(1, Number(e.target.value) || 1) }))}
                className="w-24 rounded-md border px-2 py-1"
              />
              <div className="ml-auto flex gap-2">
                <button className="rounded bg-gray-100 px-3 py-1" onClick={() => {
                  setForm((prev) => ({ ...prev, subcategories: (prev.subcategories || []).filter(s => s !== 'window'), windows: 0 }));
                  setShowWindowModal(false);
                }}>{t("common.cancel", { defaultValue: "Cancel" })}</button>
                <button className="rounded bg-[#0097b2] px-3 py-1 text-white" onClick={() => setShowWindowModal(false)}>{t("common.ok", { defaultValue: "OK" })}</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Seo
        title={i18n.language?.startsWith("de") ? "Reinigung buchen" : "Booking"}
        description={
          i18n.language?.startsWith("de")
            ? "Termin auswählen und Ihre Daten eingeben."
            : "Book a cleaning and enter your details."
        }
        path={getLocalizedPath(locale, "booking")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "book")}
        noindex
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "PutzELF",
            telephone: "+43 676 6300167",
            email: "office@putzelf.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Waagner-Biro-Straße",
              addressLocality: "Graz",
              addressCountry: "AT",
            },
            url: getLocalizedPath(locale, "booking"),
          }),
        }}
      />

      {/* Graz CTA moved to LandingAlternative.jsx */}
      <div className="w-full max-w-2xl">
        {/* Location modal */}
        {locationModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[92%] max-w-md text-center border border-[#e0f7f7]">
              <h2 className="text-xl font-bold mb-3">{t("home.locationModal.title")}</h2>
              <p className="text-sm text-gray-600 mb-4">{t("home.locationModal.prompt")}</p>
              <div className="flex gap-3 justify-center mb-4">
                <button
                  onClick={() => { setServiceLocation("vienna"); setLocationModalOpen(false); }}
                  className="px-6 py-3 bg-[#0097b2] text-white rounded-lg font-semibold"
                >
                  {t("home.locationModal.vienna")}
                </button>
                <button
                  onClick={() => { setServiceLocation("graz"); setLocationModalOpen(false); }}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold border"
                >
                  {t("home.locationModal.graz")}
                </button>
              </div>
              <div className="text-sm text-gray-500">
                <button onClick={() => { setLocationModalOpen(true); }} className="underline">{t("home.locationModal.prompt")}</button>
              </div>
            </div>
          </div>
        )}

        {/* show selected service location */}
        <div className="text-sm text-gray-700 mb-4">
          <label className="font-semibold mr-2">{t("home.serviceLocationLabel")}</label>
          <select
            value={serviceLocation}
            onChange={(e) => setServiceLocation(e.target.value)}
            className="ml-2 p-2 border rounded"
            aria-label={t("home.locationModal.title")}
          >
            <option value="">{t("home.locationModal.prompt")}</option>
            <option value="vienna">{t("home.locationModal.vienna")}</option>
            <option value="graz">{t("home.locationModal.graz")}</option>
          </select>
        </div>
        <h1
          className="text-center text-3xl font-bold mb-6"
          style={{ color: "#000000" }}
        >
          {t("home.title")}
        </h1>
        {successBooking ? (
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            {typeof window !== "undefined" && !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={150}
              />
            )}
            <h2 className="text-2xl font-bold mb-2">{t("home.successTitle", { defaultValue: "Inquiry sent successfully" })}</h2>
            <p className="mb-4">{t("home.successMessage", { defaultValue: "Thank you! Your inquiry has been successfully submitted." })}</p>
            <p className="text-sm text-gray-600">{t("home.bookingId", { id: successBooking.id, defaultValue: `Booking ID: ${successBooking.id}` })}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md space-y-6"
          >
          {/* Step 1: Contact information */}
          <div>
            <h3 className="text-lg font-medium mb-3">{t("home.contactTitle", { defaultValue: "Your contact details" })}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input name="title" value={form.title} onChange={handleChange} placeholder={t("contact.bookingContact.title", { defaultValue: "Title (optional)" })} className="p-3 border rounded w-full" />
              </div>
              <div />

              <div>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder={t("contact.bookingContact.firstName", { defaultValue: "First Name" })} className="p-3 border rounded w-full" />
                {firstNameError ? <p className="text-sm text-red-600 mt-1">{firstNameError}</p> : null}
              </div>

              <div>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder={t("contact.bookingContact.lastName", { defaultValue: "Last Name" })} className="p-3 border rounded w-full" />
                {lastNameError ? <p className="text-sm text-red-600 mt-1">{lastNameError}</p> : null}
              </div>

              <div className="flex gap-3">
                <input name="streetName" value={form.streetName} onChange={handleChange} placeholder={t("contact.bookingContact.streetName", { defaultValue: "Street Name" })} className="p-3 border rounded w-full" />
                <input name="houseNumber" value={form.houseNumber} onChange={handleChange} placeholder={t("contact.bookingContact.houseNumber", { defaultValue: "House Number" })} className="p-3 border rounded w-32" />
              </div>
              <div className="flex gap-3">
                <input name="doorNumber" value={form.doorNumber} onChange={handleChange} placeholder={t("contact.bookingContact.doorNumber", { defaultValue: "Door Number" })} className="p-3 border rounded w-32" />
                <input name="buildingNumber" value={form.buildingNumber} onChange={handleChange} placeholder={t("contact.bookingContact.buildingNumber", { defaultValue: "Building Number (optional)" })} className="p-3 border rounded w-full" />
              </div>
              <div className="flex gap-3">
                <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder={t("contact.bookingContact.postalCode", { defaultValue: "Postal Code" })} className="p-3 border rounded w-32" />
                <input name="city" value={form.city} onChange={handleChange} placeholder={t("contact.bookingContact.city", { defaultValue: "City" })} className="p-3 border rounded w-full" />
              </div>

              <div>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder={t("home.contact.phone", { defaultValue: "Phone number" })} className="p-3 border rounded w-full" />
                {phoneError ? <p className="text-sm text-red-600 mt-1">{phoneError}</p> : null}
              </div>
              <div>
                <input name="email" value={form.email} onChange={handleChange} onBlur={handleEmailBlur} placeholder={t("home.contact.email", { defaultValue: "Email address" })} className="p-3 border rounded w-full" />
                {emailError ? <p className="text-sm text-red-600 mt-1">{emailError}</p> : null}
              </div>

              {/* legacy free-text address fallback (hidden if structured provided) */}
              <div className="md:col-span-2">
                <input name="location" value={form.location} onChange={handleChange} placeholder={t("home.contact.address", { defaultValue: "Address" })} className="p-3 border rounded w-full" />
                {addressError ? <p className="text-sm text-red-600 mt-1">{addressError}</p> : null}
              </div>
            </div>
          </div>

          {/* Step 2: Flow decision */}
          <div>
           
<div className="w-full">
  {/* Inquiry is the current/main path */}
  <div className="rounded-xl border border-[#0097b2]/20 bg-[#0097b2]/5 p-4">
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0097b2] text-white">
        ✓
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-gray-900">
            {t("home.flow.inquiry", {
              defaultValue: "Send an Inquiry",
            })}
          </h3>

          
        </div>

        <p className="mt-1 text-sm text-gray-600">
          {t("home.flow.inquiryDescription", {
            defaultValue:
              "Fill in the form below and we'll get back to you with a personalized offer.",
          })}
        </p>
      </div>
    </div>
  </div>

  {/* Soft alternative: hidden temporarily
  <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
    <span>
      {t("home.flow.calculatorPrompt", {
        defaultValue: "Just want to get an estimated price?",
      })}
    </span>

    <button
      type="button"
      onClick={() => {
        saveContactToSession();
        setFlowChoice("calculator");
        navigate(getLocalizedPath(locale, "calculator"));
      }}
      className="font-medium text-gray-600 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-[#0097b2] hover:decoration-[#0097b2]"
    >
      {t("home.flow.calculator", {
        defaultValue: "View Price Calculator",
      })}
      <span className="ml-1">→</span>
    </button>
  </div>
  */}
</div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">
              {t("home.selectType")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cleaningTypes.map(({ key, emoji }) => {
                const label = t(`home.types.${key}`);
                const selected = form.typeOfCleaning === label;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => chooseType(label)}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-shadow ${
                      selected
                        ? "bg-[#5be3e3] shadow-lg"
                        : "bg-gray-50 hover:shadow"
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="text-4xl mb-2">{emoji}</div>
                    <div
                      className={`text-sm font-medium ${
                        selected ? "text-black" : "text-gray-800"
                      }`}
                    >
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
            {(() => {
              const selectedEntry = cleaningTypes.find(
                ({ key }) =>
                  t(`home.types.${key}`) === form.typeOfCleaning
              );
              if (!selectedEntry) return null;
              const description = t(
                `home.descriptions.${selectedEntry.key}`
              );
              return (
                <p className="mt-3 text-sm text-gray-700">{description}</p>
              );
            })()}
          </div>

          {shouldShowSubcategories && (
            <div>
              <h4 className="text-md font-medium mb-2">
                {t("home.subcategories.title")}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {premiumSubcategories.map(({ key, emoji }) => {
                  const selected =
                    Array.isArray(form.subcategories) &&
                    form.subcategories.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => chooseSubcategory(key)}
                      className={`flex items-center justify-center p-3 rounded-lg border transition-shadow ${
                        selected
                          ? "bg-[#5be3e3] shadow-lg"
                          : "bg-gray-50 hover:shadow"
                      }`}
                      aria-pressed={selected}
                    >
                      <span className="mr-2" aria-hidden>
                        {emoji}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          selected ? "text-black" : "text-gray-800"
                        }`}
                      >
                        {t(`home.subcategories.${key}`)}{key === 'window' && form.windows > 0 ? ` (${form.windows})` : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium mb-1"
            >
              {t("home.durationLabel") || "Hours (min 2)"}
            </label>
            <div className="flex items-stretch">
              <button
                type="button"
                onClick={decrementDuration}
                aria-label="Decrease hours"
                title={t("home.durationHelp", { defaultValue: "Mindestbuchung sind 2 Stunden." })}
                className="px-3 rounded-l-lg border bg-gray-50 hover:bg-gray-100"
              >
                −
              </button>
              <input
                id="duration"
                name="duration"
                type="number"
                inputMode="numeric"
                step="1"
                min="2"
                placeholder={t("home.durationPlaceholder") || "2+"}
                value={form.duration}
                onChange={handleChange}
                onKeyDown={handleDurationKeyDown}
                aria-describedby="duration-help"
                title={t("home.durationHelp", { defaultValue: "Mindestbuchung sind 2 Stunden." })}
                className="w-full p-3 border-t border-b text-center"
              />
              <button
                type="button"
                onClick={incrementDuration}
                aria-label="Increase hours"
                title={t("home.durationHelp", { defaultValue: "Mindestbuchung sind 2 Stunden." })}
                className="px-3 rounded-r-lg border bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <p
              id="duration-help"
              className="text-sm text-gray-600 mt-1"
            >
              {t("home.durationHelp")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium mb-1"
              >
                {t("home.dateLabel") || "Date"}
              </label>
              <div className="w-full p-3 border rounded-lg bg-white">
                {!form.location ? (
                  <p className="text-sm text-gray-500 mb-3">
                    {t("home.slots.enterAddress", {
                      defaultValue: "Enter your address to see available days.",
                    })}
                  </p>
                ) : null}
                {monthLoading ? (
                  <p className="text-sm text-gray-600">
                    {t("home.calendar.loading", {
                      defaultValue: "Loading availability…",
                    })}
                  </p>
                ) : monthError ? (
                  <p className="text-sm text-red-600">{monthError}</p>
                ) : (
                  (() => {
                    const year = monthCursor.getFullYear();
                    const month = monthCursor.getMonth();
                    const first = new Date(year, month, 1);
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const sundayBased = first.getDay();
                    const offset = (sundayBased + 6) % 7; // Monday=0
                    const cells = [];
                    for (let i = 0; i < offset; i += 1) cells.push(null);
                    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);

                    const locale = (i18n?.language || "").toLowerCase().startsWith("de") ? "de-AT" : "en-US";
                    const monthLabel = new Intl.DateTimeFormat(locale, {
                      month: "long",
                      year: "numeric",
                    }).format(first);

                    const dow = (i18n?.language || "").toLowerCase().startsWith("de")
                      ? ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
                      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

                    const toYMD = (dayNumber) => {
                      const mm = String(month + 1).padStart(2, "0");
                      const dd = String(dayNumber).padStart(2, "0");
                      return `${year}-${mm}-${dd}`;
                    };

                    const goPrev = () => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
                    const goNext = () => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

                    return (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <button
                            type="button"
                            onClick={goPrev}
                            className="px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2"
                            aria-label={t("home.calendar.prev", { defaultValue: "Previous month" })}
                          >
                            ←
                          </button>
                          <div className="text-sm font-semibold text-gray-800">{monthLabel}</div>
                          <button
                            type="button"
                            onClick={goNext}
                            className="px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2"
                            aria-label={t("home.calendar.next", { defaultValue: "Next month" })}
                          >
                            →
                          </button>
                        </div>

                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                          {form.date
                            ? (() => {
                                const selectedDate = new Date(`${form.date}T12:00:00`);
                                const selectedLabel = new Intl.DateTimeFormat(locale, {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }).format(selectedDate);
                                const selectedState = monthAvailableDays.has(form.date)
                                  ? t("home.calendar.selectedAvailable", { defaultValue: "Selected and available" })
                                  : t("home.calendar.selected", { defaultValue: "Selected" });
                                return `${selectedLabel} — ${selectedState}`;
                              })()
                            : t("home.calendar.dateHint", { defaultValue: "Choose a date from the calendar." })}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                          {dow.map((label) => (
                            <div key={label} className="text-xs font-semibold text-gray-500 text-center">
                              {label}
                            </div>
                          ))}
                          {cells.map((dayNumber, idx) => {
                            if (!dayNumber) {
                              return <div key={`empty-${idx}`} />;
                            }
                            const ymd = toYMD(dayNumber);
                            const isPast = ymd < todayYMD;
                            const isAvailable = monthAvailableDays.has(ymd);
                            const isSelected = form.date === ymd;
                            const disabled = isPast || !isAvailable;
                            const shortDate = new Intl.DateTimeFormat(locale, {
                              day: "numeric",
                              month: "short",
                            }).format(new Date(`${ymd}T12:00:00`));
                            const fullDate = new Intl.DateTimeFormat(locale, {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(`${ymd}T12:00:00`));
                            const statusText = isSelected
                              ? t("home.calendar.selected", { defaultValue: "Selected" })
                              : disabled
                                ? t("home.calendar.unavailable", { defaultValue: "Unavailable" })
                                : t("home.calendar.available", { defaultValue: "Available" });
                            const ariaText = `${fullDate} — ${statusText}`;

                            return (
                              <button
                                key={ymd}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                  setForm((prev) => ({
                                    ...prev,
                                    date: ymd,
                                    time: "",
                                  }))
                                }
                                aria-label={ariaText}
                                aria-pressed={isSelected}
                                className={`h-12 rounded-lg border text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 ${
                                  disabled
                                    ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                                    : isSelected
                                      ? "bg-[#5be3e3] border-[#0097b2] text-black"
                                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-800"
                                }`}
                                title={ariaText}
                              >
                                <span className="flex h-full flex-col items-center justify-center leading-none">
                                  <span className="text-sm font-semibold">{dayNumber}</span>
                                  <span className={`mt-1 text-[10px] font-medium ${
                                    disabled
                                      ? "text-gray-400"
                                      : isSelected
                                        ? "text-black"
                                        : "text-emerald-700"
                                  }`}>
                                    {shortDate}
                                  </span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()
                )}

                <input id="date" name="date" type="hidden" value={form.date} readOnly />
              </div>
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium mb-1"
              >
                {t("home.timeLabel") || "Time"}
              </label>
              <div className="w-full p-3 border rounded-lg bg-white">
                {!form.date ? (
                  <p className="text-sm text-gray-600">
                    {t("home.slots.chooseDate", {
                      defaultValue: "Pick a date to see available times.",
                    })}
                  </p>
                ) : slotsLoading ? (
                  <p className="text-sm text-gray-600">
                    {t("home.slots.loading", {
                      defaultValue: "Loading available times…",
                    })}
                  </p>
                ) : slotsError ? (
                  <p className="text-sm text-red-600">{slotsError}</p>
                ) : availableSlots.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    {t("home.slots.none", {
                      defaultValue:
                        "No available times for this day. Please choose another date.",
                    })}
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableSlots.map((slot) => {
                      const selected = form.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, time: slot }))
                          }
                          aria-pressed={selected}
                          className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                            selected
                              ? "bg-[#5be3e3] border-[#0097b2] text-black"
                              : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}

                <input
                  id="time"
                  name="time"
                  type="hidden"
                  value={form.time}
                  readOnly
                />
              </div>
            </div>
          </div>

          <label className="flex items-center space-x-3 text-sm">
            <input
              type="checkbox"
              name="renegotiate"
              checked={form.renegotiate}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>{t("home.renegotiate")}</span>
          </label>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">{t("order.notesLabel", { defaultValue: "Notes (optional)" })}</label>
            <textarea id="notes" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 border rounded" rows={4} />
          </div>

          <label className="flex items-start space-x-3 text-sm">
            <input
              type="checkbox"
              name="gdprConsent"
              checked={gdprConsent}
              onChange={(e) => { setGdprConsent(e.target.checked); setGdprError(""); }}
              className="w-4 h-4 mt-1"
            />
            <span>
              {t("order.gdprText", { defaultValue: "I agree that my data will be processed for the booking and contacted about this booking." })}
              {gdprError ? <div className="text-red-600 text-sm mt-1">{gdprError}</div> : null}
            </span>
          </label>

          {/* Price estimation removed from booking page; use Price Calculator instead */}

          <div className="relative">
            <button
              type="submit"
              className="group w-full focus:outline-none"
              aria-label={
                (i18n?.language || "")
                  .toLowerCase()
                  .startsWith("de")
                  ? "Belohnungsbox öffnen"
                  : "Open reward box"
              }
            >
              
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-black rounded-lg"
            style={{ backgroundColor: "#5be3e3" }}
          >
            {t("home.submitInquiry")}
          </button>
          </form>
        )}
      </div>
    </div>
  );
}
