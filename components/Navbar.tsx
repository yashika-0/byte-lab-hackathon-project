"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/challenge", label: "Challenge" },
  { href: "/about", label: "About" },
];

const BOTTOM_NAV = [
  { href: "/", icon: "⌂", label: "Home" },
  { href: "/dashboard", icon: "◉", label: "Progress" },
  { href: "/challenge", icon: "✓", label: "Challenge" },
  { href: "/profile", icon: "○", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <Link href="/" className="navbar-brand">
          <span>ABTALKS</span>
        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <nav className={menuOpen ? "open" : ""}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link className="btn primary" href="/challenge">
            Start challenge →
          </Link>
        </nav>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Mobile app navigation">
        {BOTTOM_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </Link>
        ))}
      </nav>
    </>
  );
}