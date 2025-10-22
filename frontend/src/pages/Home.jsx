import { useState, useEffect } from "react";
import { trackEvent } from "../lib/analytics";
import { apiFetch, parseJsonSafe } from "../lib/api";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedWorker(params.get("worker"));
  }, [location.search]);

  const selectedWorkerName = selectedWorker
    ? t(`profile.workers.${selectedWorker}`, { defaultValue: selectedWorker })
    : null;

  const [rewardImageError, setRewardImageError] = useState(false);

  const getHourlyRate = (typeOfCleaning, subcategories) => {
    const isHouseCleaning = typeOfCleaning === t("home.types.standard");
    const isApartmentHotel = typeOfCleaning === t("home.types.apartmentHotel");
    const isEligible = isHouseCleaning || isApartmentHotel;
    const count = Array.isArray(subcategories) ? subcategories.length : 0;
    if (!isEligible || count === 0) return 30;
    if (count === 1) return 42;
    return 48;
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

    setForm((prev) => ({ ...prev, [name]: updatedValue }));
  };

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
      <div className="w-full max-w-2xl">
        <h2
          className="text-center text-3xl font-bold mb-6"
          style={{ color: "#000000" }}
        >
          {t("home.title")}
        </h2>

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
                title={t("home.durationMinTip") || "Minimum is 3 hours"}
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
                title={t("home.durationMinTip") || "Minimum is 3 hours"}
                className="w-full p-3 border-t border-b text-center"
              />
              <button
                type="button"
                onClick={incrementDuration}
                aria-label="Increase hours"
                title={t("home.durationMinTip") || "Minimum is 3 hours"}
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
              <input
                id="date"
                name="date"
                type="date"
                placeholder={t("home.datePlaceholder") || "Select date"}
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium mb-1"
              >
                {t("home.timeLabel") || "Time"}
              </label>
              <input
                id="time"
                name="time"
                type="time"
                placeholder={t("home.timePlaceholder") || "Select time"}
                value={form.time}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
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
