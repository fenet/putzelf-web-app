import logo from "../assets/logo.png";

export default function LogoHeader() {
  return (
    <header className="py-3 flex flex-col items-center text-center">
      {/* Logo as a clickable link */}
      <a href="/">
  <img
    src={logo}
    alt="Logo"
    className="w-48 h-auto mb-1 cursor-pointer"
  />
</a>


      {/* Bigger text */}
      <h1 className="text-6xl font-extrabold text-black">
        Putz<span style={{ color: "#0097b2" }}>ELF</span>
      </h1>
    </header>
  );
}

