import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full p-4 shadow-md transition-all duration-300 ${
        isScrolled ? "bg-white bg-opacity-90" : "bg-gray-200"
      }`}
    >
      <h1 className="text-2xl font-bold text-center">Job Listings</h1>
    </div>
  );
};

export default Header;
