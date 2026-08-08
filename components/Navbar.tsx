"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/profile";

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
  { href: "/profile", icon: "●", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState("S");

  useEffect(() => {
    const profile = getProfile();
    const name = (profile.name || "Student").trim();
    const computed = name
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setInitials(computed || "S");
  }, [pathname]);

  return (
    <>
      <header className="navbar">
        <Link href="/" className="logo">
          <span>A</span> ABTALKS
        </Link>
        <Link href="/profile" className="mobile-profile-button" aria-label="Open student profile">
          {initials}
        </Link>
        <button className="menu-btn" onClick={() => setMenuOpen((open) => !open)}>
          ☰
        </button>
        <nav className={menuOpen ? "open" : ""}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/dashboard">
            Start challenge ↗
          </Link>
        </nav>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Mobile app navigation">
        {BOTTOM_NAV.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </Link>
        ))}
      </nav>
    </>
  );
}