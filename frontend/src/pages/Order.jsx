import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Order() {
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
    fetch(`http://localhost:5000/api/bookings/${id}`)
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
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/confirm`, {
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

  if (!booking) return <p className="text-center mt-10">Loading booking...</p>;

  return (
    <div className="bg-[#f9fafa] min-h-screen py-1 px-4 flex flex-col items-center">
      {/* Logo + Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#000000] mt-4">
          Confirm Your Booking
        </h1>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7]">
          <h2 className="text-2xl font-bold text-[#5be3e3] mb-6">
            Booking Summary
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Location:</strong> {booking.location}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Cleaning Type:</strong> {booking.typeOfCleaning}</p>
            <p><strong>Duration:</strong> {booking.duration} hours</p>
            <p><strong>Price:</strong> {booking.price}</p>
          </div>
         </div>

        {/* Confirmation Form or Success */}
        {!confirmed ? ( 
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e0f7f7] space-y-4">
            <h3 className="text-xl font-semibold text-[#5be3e3]">
              Enter your details to confirm
            </h3>

            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="Street & House No."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5be3e3]"
              required
            />
            <input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="Phone"
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
                I agree to the processing of my personal data in accordance
                with the{" "}
                <a
                  href="/privacy"
                  className="text-[#5be3e3] underline hover:text-[#000000]"
                >
                  Privacy Policy (GDPR)
                </a>.
              </span>
            </label>

            <button
              onClick={handleConfirm}
              disabled={loadingConfirm}
              className="w-full bg-[#5be3e3] text-black font-semibold py-3 rounded-xl hover:bg-[#48c9c9] transition"
            >
              {loadingConfirm ? "Confirming..." : "Confirm Booking"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-xl text-center">
            <h4 className="text-green-700 font-bold text-xl">
              Booking confirmed ✅
            </h4>
            <p className="mt-2 text-gray-700">
              A confirmation email has been sent to{" "}
              {customer.email || booking.email}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

