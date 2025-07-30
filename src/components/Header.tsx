import React, { useEffect, useState } from "react";

const navItems = [
  { name: "start", href: "#start" },
  { name: "service", href: "#service" },
  { name: "kontakt", href: "#kontakt" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background shadow-md py-2" : "py-4"}`}
    >
      <nav className="flex items-center justify-between gap-4 main-container transition-all duration-300">
        <a href="/">
          <img
            src="/logo.png"
            alt="MDS Logo"
            className={`w-[74px] h-auto object-contain transition-all duration-300 ${scrolled ? "w-[60px]" : "w-[74px]"}`}
            height={48}
            width={74}
          />
        </a>
        <ul className="flex items-center gap-5 md:gap-9">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-nav md:text-nav hover:text-primary duration-300 hover:underline underline-offset-4"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
