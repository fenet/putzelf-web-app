import { useState, useEffect } from "react";
import { trackEvent } from "../lib/analytics";
import { apiFetch, parseJsonSafe } from "../lib/api";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import Seo from "../components/Seo";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    location: "",
    date: "",
    time: "",
    duration: 3,
    typeOfCleaning: "Standard Cleaning",
    subcategories: [],
    renegotiate: false,
  });

  const [selectedWorker, setSelectedWorker] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("worker");
  });

  const [workersIndex, setWorkersIndex] = useState({});
  const [workersError, setWorkersError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setWorkersError(null);
        const res = await apiFetch("/api/workers", { signal: controller.signal });
        const data = await parseJsonSafe(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load workers");
        }
        const employees = Array.isArray(data?.employees) ? data.employees : [];
        const index = {};
        employees.forEach((emp) => {
          const code = String(emp?.code || "").trim();
          if (!code) return;
          index[code] = { name: String(emp?.name || code).trim() || code };
        });
        setWorkersIndex(index);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setWorkersIndex({});
        setWorkersError(err?.message || "Failed to load workers");
      }
    })();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedWorker(params.get("worker"));
  }, [location.search]);

  const selectedWorkerName = selectedWorker
    ? workersIndex?.[selectedWorker]?.name ||
      t(`profile.workers.${selectedWorker}`, { defaultValue: selectedWorker })
    : null;

  const [rewardImageError, setRewardImageError] = useState(false);

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
    const worker = String(selectedWorker || "").trim();
    const durationHours = Number(form.duration || 0);
    if (!worker || !durationHours) {
      setMonthAvailableDays(new Set());
      setMonthError(null);
      setMonthLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      worker,
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
        setMonthError(err?.message || "Failed to load availability");
      } finally {
        setMonthLoading(false);
      }
    })();

    return () => controller.abort();
  }, [selectedWorker, form.duration, form.location, monthCursor]);

  const getHourlyRate = (typeOfCleaning, subcategories) => {
    const isHouseCleaning = typeOfCleaning === t("home.types.standard");
    const isApartmentHotel = typeOfCleaning === t("home.types.apartmentHotel");
    const isEligible = isHouseCleaning || isApartmentHotel;
    const subs = Array.isArray(subcategories) ? subcategories : [];

    if (!isEligible || subs.length === 0) return 30;
    if (subs.includes("intensive") && subs.includes("window")) return 50;
    if (subs.includes("window")) return 44.9;
    if (subs.includes("intensive")) return 43.2;
    return 30;
  };

  const [calculatedPrice, setCalculatedPrice] = useState(
    getHourlyRate(form.typeOfCleaning, []) * 3
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
      if (hours < 3) hours = 3;
      updatedValue = hours;
      const rate = getHourlyRate(form.typeOfCleaning, form.subcategories);
      setCalculatedPrice(hours * rate);
    }

    setForm((prev) => {
      const next = { ...prev, [name]: updatedValue };
      if (name === "date" || name === "duration" || name === "location") {
        next.time = "";
      }
      return next;
    });
  };

  useEffect(() => {
    const worker = String(selectedWorker || "").trim();
    const day = String(form.date || "").trim();
    const durationHours = Number(form.duration || 0);

    if (!worker || !day || !durationHours) {
      setAvailableSlots([]);
      setSlotsError(null);
      setSlotsLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      worker,
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
        setSlotsError(err?.message || "Failed to load available times");
      } finally {
        setSlotsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [selectedWorker, form.date, form.duration, form.location]);

  const decrementDuration = () => {
    setForm((prev) => {
      const next = Math.max(3, Number(prev.duration || 0) - 1);
      const rate = getHourlyRate(prev.typeOfCleaning, prev.subcategories);
      setCalculatedPrice(next * rate);
      return { ...prev, duration: next };
    });
  };

  const incrementDuration = () => {
    setForm((prev) => {
      const next = Number(prev.duration || 0) + 1;
      const rate = getHourlyRate(prev.typeOfCleaning, prev.subcategories);
      setCalculatedPrice(next * rate);
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
      setCalculatedPrice(prev.duration * rate);
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

    if (!selectedWorker) {
      alert(t("home.alerts.noWorker"));
      return;
    }

    if (!form.date || !form.time || !form.typeOfCleaning) {
      alert(t("home.alerts.missing"));
      return;
    }

    try {
      try {
        trackEvent("Booking_Form_Submit", {
          service_type: form.typeOfCleaning,
          duration: form.duration,
          price: calculatedPrice,
          preferredWorker: selectedWorker,
        });
      } catch (_) {}

      const payload = { ...form, preferredWorker: selectedWorker };

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
          preferredWorker: selectedWorker,
        });
      } catch (_) {}

      navigate(`/order/${data?.id}`);
    } catch (err) {
      console.error(err);
      alert(
        t("home.alerts.createError", { msg: err.message || "unknown" })
      );
    }
  };

  return (
    <div className="flex flex-col items-center py-1 px-4">
      <Seo
        title={i18n.language?.startsWith("de") ? "Reinigung buchen" : "Booking"}
        description={
          i18n.language?.startsWith("de")
            ? "Termin auswählen und Ihre Daten eingeben."
            : "Book a cleaning and enter your details."
        }
        path="/book"
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
            email: "info@putzelf.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Waagner-Biro-Straße",
              addressLocality: "Graz",
              addressCountry: "AT",
            },
            url: "/graz",
          }),
        }}
      />

      {/* Graz CTA moved to LandingAlternative.jsx */}
      <div className="w-full max-w-2xl">
        <h1
          className="text-center text-3xl font-bold mb-6"
          style={{ color: "#000000" }}
        >
          {t("home.title")}
        </h1>

        {selectedWorker ? (
          <div className="mb-6 rounded-2xl border border-[#5be3e3] bg-[#e6fbff] p-5 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0097b2]">
              {t("home.selectedWorker.label")}
            </p>
            <p className="mt-2 text-2xl font-bold text-[#000000]">
              {selectedWorkerName}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {t("home.selectedWorker.selected", {
                name: selectedWorkerName,
              })}
            </p>
            <Link
              to="/profile"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-[#0097b2] px-4 py-2 text-sm font-semibold text-[#0097b2] hover:bg-[#0097b2]/10 transition"
            >
              {t("home.selectedWorker.change")}
            </Link>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-dashed border-gray-300 p-5 text-center">
            <p className="text-base font-semibold text-gray-700">
              {t("home.selectedWorker.missing")}
            </p>
            <Link
              to="/profile"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[#0097b2] px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
            >
              {t("home.selectedWorker.choose")}
            </Link>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md space-y-6"
        >
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
                        {t(`home.subcategories.${key}`)}
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
              {t("home.durationLabel") || "Hours (min 3)"}
            </label>
            <div className="flex items-stretch">
              <button
                type="button"
                onClick={decrementDuration}
                aria-label="Decrease hours"
                title={t("home.durationHelp", { defaultValue: "Mindestbuchung sind 3 Stunden." })}
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
                min="3"
                placeholder={t("home.durationPlaceholder") || "3+"}
                value={form.duration}
                onChange={handleChange}
                onKeyDown={handleDurationKeyDown}
                aria-describedby="duration-help"
                title={t("home.durationHelp", { defaultValue: "Mindestbuchung sind 3 Stunden." })}
                className="w-full p-3 border-t border-b text-center"
              />
              <button
                type="button"
                onClick={incrementDuration}
                aria-label="Increase hours"
                title={t("home.durationHelp", { defaultValue: "Mindestbuchung sind 3 Stunden." })}
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
                {!selectedWorker ? (
                  <p className="text-sm text-gray-600">
                    {t("home.slots.chooseWorker", {
                      defaultValue: "Choose a worker to see available days.",
                    })}
                  </p>
                ) : monthLoading ? (
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
                            className="px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 text-sm font-semibold"
                            aria-label={t("home.calendar.prev", { defaultValue: "Previous month" })}
                          >
                            ←
                          </button>
                          <div className="text-sm font-semibold text-gray-800">{monthLabel}</div>
                          <button
                            type="button"
                            onClick={goNext}
                            className="px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 text-sm font-semibold"
                            aria-label={t("home.calendar.next", { defaultValue: "Next month" })}
                          >
                            →
                          </button>
                        </div>

                        {workersError ? (
                          <p className="text-xs text-red-600 mb-2">{workersError}</p>
                        ) : null}

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
                                aria-pressed={isSelected}
                                className={`h-10 rounded-lg border text-sm font-semibold transition text-center ${
                                  disabled
                                    ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                                    : isSelected
                                      ? "bg-[#5be3e3] border-[#0097b2] text-black"
                                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-800"
                                }`}
                                title={
                                  disabled
                                    ? t("home.calendar.unavailable", { defaultValue: "Unavailable" })
                                    : t("home.calendar.available", { defaultValue: "Available" })
                                }
                              >
                                {dayNumber}
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
                {!selectedWorker ? (
                  <p className="text-sm text-gray-600">
                    {t("home.slots.chooseWorker", {
                      defaultValue: "Choose a worker to see available times.",
                    })}
                  </p>
                ) : !form.date ? (
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

          <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-[#5be3e3] via-[#00b3c1] to-[#0097b2] shadow-lg">
            <div className="rounded-2xl bg-gradient-to-br from-[#ecfeff] via-white to-[#e0f7f7] px-4 py-5 sm:px-6 sm:py-6">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#0097b2]">
                {t("home.estimated")}
              </p>
              <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none text-[#00343d]">
                €{(Number(calculatedPrice || 0) * 1.2).toFixed(2)}
              </p>
              <p className="mt-3 text-sm sm:text-base text-gray-700">
                {t("home.rate", {
                  rate: (
                    getHourlyRate(form.typeOfCleaning, form.subcategories) * 1.2
                  ).toFixed(2),
                })}{" "}
                <span className="text-xs text-gray-600">(Brutto)</span>
              </p>
            </div>
          </div>

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
              <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#5be3e3] via-[#48c9c9] to-[#00b3c1] shadow-lg transition-transform duration-200 group-hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#5be3e3]/50">
                <div className="rounded-2xl bg-white text-center px-6 py-8 md:py-10">
                  {(() => {
                    const isGerman = (i18n?.language || "")
                      .toLowerCase()
                      .startsWith("de");
                    const headline = isGerman
                      ? "Öffne deine Belohnung, indem du deinen Termin buchst"
                      : "Open your reward by booking your appointment";
                    return (
                      <div className="flex flex-col items-center max-w-[34rem] mx-auto">
                        <div className="my-4 flex justify-center">
                          <Gift
                            className="h-24 sm:h-28 md:h-36 w-24 sm:w-28 md:w-36 text-[#00b3c1] animate-bounce drop-shadow-lg"
                            strokeWidth={2.5}
                          />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                          {headline}
                        </h3>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-black rounded-lg"
            style={{ backgroundColor: "#5be3e3" }}
          >
            {t("home.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
