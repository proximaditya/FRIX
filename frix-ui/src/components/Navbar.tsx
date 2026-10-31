"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sun,
  Moon,
  Flame,
  Swords,
} from "lucide-react";

/**
 * Navigation links for smooth-scroll on the landing page.
 * Each href references an element ID on the page.
 */
const NAV_LINKS = [
  { label: "Live Arenas", href: "#live-arenas" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Orb System", href: "#orb-system" },
  { label: "Rankings", href: "#rankings" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  /* Track scroll position for sticky navbar glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Apply dark/light theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  /* Close mobile menu on ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Smooth-scroll to section and close mobile menu */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 1.5rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          background: scrolled
            ? "var(--bg-glass)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-glass)"
            : "1px solid transparent",
          transition:
            "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Flame
              size={28}
              style={{ color: "var(--rose)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
              className="gradient-text"
            >
              FRIX
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color var(--transition-fast)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--rose)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side: Theme Toggle + CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Dark/Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: "1px solid var(--border-glass)",
                background: "var(--bg-glass)",
                backdropFilter: "blur(10px)",
                color: "var(--text-primary)",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
              }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop CTA */}
            <Link
              href="/sign-up"
              className="btn-primary desktop-nav"
              style={{
                padding: "0.625rem 1.5rem",
                fontSize: "0.85rem",
              }}
            >
              <Swords size={16} /> Enter Arena
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="hamburger-btn"
              style={{
                display: "none",
                width: "40px",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-glass)",
                background: "var(--bg-glass)",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "var(--bg-glass)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
          onClick={() => setMobileOpen(false)}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <Link href="/sign-up" className="btn-primary" style={{ marginTop: "1rem" }}>
            <Swords size={18} /> Enter Arena
          </Link>
        </div>
      )}

      {/* Responsive styles for hamburger/desktop-nav */}
      <style jsx global>{`
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
