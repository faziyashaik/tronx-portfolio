"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["About", "#about"],
  ["Process", "#process"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a href="#top" className="wordmark" aria-label="TRONX home">
          <img 
            src="/tronx-logo.png" 
            alt="TRONX logo" 
            className="brand-logo" 
          />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <a key={href} href={href}>{name}</a>
          ))}
        </nav>

        <a className="button button-dark nav-cta" href="#book">
          Let’s Talk <ArrowUpRight size={16} />
        </a>

        <button 
          className="menu-toggle" 
          type="button" 
          aria-label={open ? "Close menu" : "Open menu"} 
          aria-expanded={open} 
          aria-controls="mobile-navigation" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav 
            id="mobile-navigation" 
            className="mobile-nav" 
            aria-label="Mobile navigation" 
            initial={reduce ? false : { opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={reduce ? undefined : { opacity: 0, y: -8 }} 
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            {links.map(([name, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {name}<ArrowUpRight size={16} />
              </a>
            ))}
            <a className="button button-dark mobile-cta" href="#book" onClick={() => setOpen(false)}>
              Let’s Talk <ArrowUpRight size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
