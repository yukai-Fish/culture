import { Link, useLocation } from "wouter";
import { useCulture } from "@/contexts/CultureContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "文化选择", icon: "◎" },
  { path: "/culture-map", label: "万象图", icon: "山" },
  { path: "/interactive", label: "感应场", icon: "禅" },
  { path: "/library", label: "藏书阁", icon: "书" },
  { path: "/meditation", label: "禅修房", icon: "定" },
];

export default function Navigation() {
  const [location] = useLocation();
  const { culture, theme } = useCulture();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (location === "/" && !culture) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-b border-white/20">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl" style={{ color: theme?.primary || "#2D4A3E" }}>
              全域文化
            </span>
            {theme && (
              <span className="text-sm opacity-60 font-serif">{theme.name}</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`px-4 py-2 rounded-sm font-serif text-sm transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-[var(--color-mountain-near)]/10 text-[var(--color-mountain-near)]"
                        : "text-[var(--color-ink-medium)] hover:text-[var(--color-mountain-near)] hover:bg-[var(--color-mountain-near)]/5"
                    }`}
                  >
                    <span className="font-display text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[var(--color-ink-medium)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden glass-card border-b border-white/20"
          >
            <div className="container py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`px-4 py-3 rounded-sm font-serif text-sm flex items-center gap-3 ${
                        isActive
                          ? "bg-[var(--color-mountain-near)]/10 text-[var(--color-mountain-near)]"
                          : "text-[var(--color-ink-medium)]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-display text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
