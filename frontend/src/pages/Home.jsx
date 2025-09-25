import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "",
    date: "",
    time: "",
    duration: 3,
    typeOfCleaning: "Standard Cleaning",
    renegotiate: false,
  });

  // Helper to get hourly rate based on cleaning type
  const getHourlyRate = (typeOfCleaning) => {
    const premiumTypes = ["Intensive Cleaning", "Window Cleaning", "Moving Cleaning"];
    return premiumTypes.includes(typeOfCleaning) ? 42 : 36;
  };

  const [calculatedPrice, setCalculatedPrice] = useState(getHourlyRate(form.typeOfCleaning) * 3);

  const cleaningTypes = [
    { label: "Standard Cleaning", emoji: "✨" },
    { label: "Window Cleaning", emoji: "🪟" },
    { label: "Office Cleaning", emoji: "🏢" },
    { label: "Spring Cleaning", emoji: "🌸" },
    { label: "Moving Cleaning", emoji: "🚚" },
    { label: "Intensive Cleaning", emoji: "🔥" },
    { label: "Apartment Cleaning", emoji: "🏠" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (name === "duration") {
      let hours = Number(updatedValue) || 0;
      if (hours < 3) hours = 3;
      updatedValue = hours;
      const rate = getHourlyRate(form.typeOfCleaning);
      setCalculatedPrice(hours * rate);
    }

    setForm((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const chooseType = (label) => {
    setForm((prev) => {
      const rate = getHourlyRate(label);
      setCalculatedPrice(prev.duration * rate);
      return { ...prev, typeOfCleaning: label };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.time || !form.typeOfCleaning) {
      alert("Please fill location, date, time and select a cleaning type.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create booking");
      navigate(`/order/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Error creating booking: " + (err.message || "unknown"));
    }
  };

  return (
    <div className="flex flex-col items-center py-1 px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-center text-3xl font-bold mb-6" style={{ color: "#000000" }}>
          Book Your Cleaning
        </h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-6">
          
           <div>
            <h3 className="text-lg font-medium mb-3">Select Cleaning Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cleaningTypes.map(({ label, emoji }) => {
                const selected = form.typeOfCleaning === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => chooseType(label)}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-shadow ${
                      selected ? "bg-[#5be3e3] shadow-lg" : "bg-gray-50 hover:shadow"
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="text-4xl mb-2">{emoji}</div>
                    <div className={`text-sm font-medium ${selected ? "text-black" : "text-gray-800"}`}>{label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <input
              name="duration"
              type="number"
              min="3"
              value={form.duration}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-1">
              Minimum booking is <span className="font-semibold">3 hours</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
          </div>


          <label className="flex items-center space-x-3 text-sm">
            <input
              type="checkbox"
              name="renegotiate"
              checked={form.renegotiate}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Willing to renegotiate if job takes longer</span>
          </label>

          <div className="p-6 rounded-xl text-center shadow-md" style={{ backgroundColor: "#f8fdfd" }}>
            <p className="text-sm text-gray-700 mb-2">Estimated Price</p>
            <p className="font-extrabold text-4xl md:text-6xl" style={{ color: "#0097b2" }}>
              €{(calculatedPrice || 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-2">Rate: €{getHourlyRate(form.typeOfCleaning)}/hour</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-black rounded-lg"
            style={{ backgroundColor: "#5be3e3" }}
          >
            Let's Go
          </button>
        </form>
      </div>
    </div>
  );
}
