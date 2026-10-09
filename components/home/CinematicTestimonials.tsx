"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, X } from "lucide-react";
import { fallbackTestimonials, type TestimonialItem } from "@/data/testimonials";
import TestimonialCard, { type CardPosDef } from "@/components/home/TestimonialCard";
import StatsStrip from "@/components/home/StatsStrip";

// Symmetrically spaced 3D card positions with generous breathing room on both Left and Right sides
const cardPosDef: CardPosDef[] = [
  // LEFT FLANK (3 Cards) - Extra spacing from central text corridor
  { x: "-46%", y: "-28%", z: 90, rotate: -6, scale: 0.96, width: 160, height: 200 },
  { x: "-42%", y: "2%", z: 140, rotate: 5, scale: 1.05, width: 170, height: 215 },
  { x: "-46%", y: "34%", z: 100, rotate: -4, scale: 0.98, width: 160, height: 200 },

  // RIGHT FLANK (3 Cards) - Extra spacing from central text corridor
  { x: "46%", y: "-28%", z: 85, rotate: 6, scale: 0.96, width: 160, height: 200 },
  { x: "42%", y: "2%", z: 135, rotate: -5, scale: 1.05, width: 170, height: 215 },
  { x: "46%", y: "34%", z: 95, rotate: 4, scale: 0.98, width: 160, height: 200 },
];

export default function CinematicTestimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(fallbackTestimonials.slice(0, 6));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isClientStoriesOpen, setIsClientStoriesOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth mouse tilt spring physics
  const mouseX = useSpring(0, { stiffness: 90, damping: 24 });
  const mouseY = useSpring(0, { stiffness: 90, damping: 24 });

  // Controlled scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [22, -22]);

  // Load testimonials from API if available, enforcing exactly 6 items with clean fallbacks
  useEffect(() => {
    let active = true;
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const mapped: TestimonialItem[] = json.data.map((item: any, idx: number) => {
              const fb = fallbackTestimonials[idx % fallbackTestimonials.length];
              const isMockName = !item.name || item.name.toLowerCase().includes("test client") || item.name.toLowerCase().includes("test name");
              const isMockCompany = !item.company || item.company.toLowerCase().includes("test company");

              return {
                id: item._id || item.id || String(idx + 1),
                name: isMockName ? fb.name : item.name,
                role: item.role && !item.role.toLowerCase().includes("test") ? item.role : fb.role,
                company: isMockCompany ? fb.company : item.company,
                content: item.content && item.content.length > 15 ? item.content : fb.content,
                shortQuote: item.shortQuote || fb.shortQuote,
                image: (item.image && item.image.trim().startsWith("http")) ? item.image : fb.image,
                rating: item.rating || 5,
                tagline: item.tagline || fb.tagline || "Validated TRONX Results",
                badge: item.badge || fb.badge || "Verified Client",
              };
            });
            
            let sixList = mapped.slice(0, 6);
            if (sixList.length < 6) {
              const padded = [...sixList];
              for (let i = sixList.length; i < 6; i++) {
                padded.push(fallbackTestimonials[i % fallbackTestimonials.length]);
              }
              sixList = padded;
            }
            if (active) setTestimonialsList(sixList);
          }
        }
      } catch (err) {
        console.warn("Using fallback testimonials data:", err);
      }
    }
    loadTestimonials();
    return () => {
      active = false;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredIdx(null);
  };

  useEffect(() => {
    if (selectedIdx === null && !isClientStoriesOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
        setIsClientStoriesOpen(false);
      }
      if (selectedIdx !== null) {
        if (e.key === "ArrowRight") setSelectedIdx((prev) => (prev === null ? 0 : (prev + 1) % testimonialsList.length));
        if (e.key === "ArrowLeft") setSelectedIdx((prev) => (prev === null ? 0 : (prev - 1 + testimonialsList.length) % testimonialsList.length));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, isClientStoriesOpen, testimonialsList.length]);

  const currentModalItem = selectedIdx !== null ? testimonialsList[selectedIdx] : null;

  return (
    <section 
      id="testimonials" 
      className="testimonials-launch-section" 
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
    >
      {/* Background Radial Glow & Texture */}
      <div className="testimonials-ambient-glow" aria-hidden="true" />
      <div className="testimonials-grid-texture" aria-hidden="true" />

      <div
        className="container testimonials-stage-wrap"
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D Spatial Gallery: 3 Left Flank Cards & 3 Right Flank Cards */}
        <div className="testimonials-spatial-stage">
          {testimonialsList.slice(0, 6).map((item, index) => {
            const pos = cardPosDef[index % cardPosDef.length];
            const parallaxY = index % 2 === 0 ? parallaxY1 : parallaxY2;

            return (
              <TestimonialCard
                key={`${item.id}-${index}`}
                item={item}
                index={index}
                pos={pos}
                mouseX={mouseX}
                mouseY={mouseY}
                parallaxY={parallaxY}
                reduce={reduce}
                hoveredIdx={hoveredIdx}
                setHoveredIdx={setHoveredIdx}
                setSelectedIdx={setSelectedIdx}
              />
            );
          })}
        </div>

        {/* Unobstructed Central Content */}
        <motion.div
          className="testimonials-central-content"
          initial={reduce ? false : { opacity: 0, y: 25 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="testimonials-pill-tag">
            <span className="pill-dot" /> Testimonials
          </div>
          <h2 id="testimonials-heading" className="testimonials-title">
            <span className="testimonials-title-line1">Good work.</span>
            <em className="testimonials-title-line2">Real impact.</em>
          </h2>
          <p className="testimonials-description">
            A closer look at the people and businesses building better digital experiences with TRONX.
          </p>
          <div className="testimonials-actions">
            <button
              type="button"
              className="button button-glass testimonials-cta"
              onClick={() => setIsClientStoriesOpen(true)}
            >
              Explore client stories <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Social Proof Stats Strip */}
          <StatsStrip />
        </motion.div>
      </div>

      {/* Dedicated Client Stories Showcase Modal (Mounted to body via React Portal) */}
      {isMounted && isClientStoriesOpen && createPortal(
        <AnimatePresence>
          <div 
            className="testimonial-modal-backdrop" 
            onClick={() => setIsClientStoriesOpen(false)} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="client-stories-modal-title"
          >
            <motion.div
              className="client-stories-modal-card"
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="testimonial-modal-close"
                onClick={() => setIsClientStoriesOpen(false)}
                aria-label="Close client stories showcase"
              >
                <X size={18} />
              </button>

              <div className="client-stories-header">
                <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> CASE STORIES & IMPACT</p>
                <h3 id="client-stories-modal-title" className="client-stories-title">How leading teams build with TRONX</h3>
                <p className="client-stories-subtext">Real-world results, architecture highlights, and measurable impact across industries.</p>
              </div>

              <div className="client-stories-grid">
                {testimonialsList.map((item, idx) => (
                  <div key={item.id} className="client-story-card">
                    <div className="client-story-top">
                      <div className="client-story-avatar">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackTestimonials[idx % fallbackTestimonials.length].image;
                          }}
                        />
                      </div>
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.role} &middot; <strong>{item.company}</strong></p>
                      </div>
                      <span className="client-story-badge">{item.badge || "Verified Case"}</span>
                    </div>
                    <blockquote className="client-story-quote">“{item.content}”</blockquote>
                    <div className="client-story-footer">
                      <div className="client-story-metric">
                        <span>Outcome</span>
                        <strong>{item.tagline || "Validated TRONX Delivery"}</strong>
                      </div>
                      <button 
                        type="button" 
                        className="client-story-link"
                        onClick={() => {
                          setIsClientStoriesOpen(false);
                          setSelectedIdx(idx);
                        }}
                      >
                        Read quote <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="client-stories-modal-footer">
                <p>Ready to build your next-generation digital experience?</p>
                <a 
                  href="#contact" 
                  className="button button-glass" 
                  onClick={() => setIsClientStoriesOpen(false)}
                >
                  Start a project with TRONX <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

      {/* Individual Testimonial Quote Modal Overlay (Mounted to body via React Portal) */}
      {isMounted && selectedIdx !== null && currentModalItem && createPortal(
        <AnimatePresence>
          <div 
            className="testimonial-modal-backdrop" 
            onClick={() => setSelectedIdx(null)} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modal-client-name"
          >
            <motion.div
              className="testimonial-modal-card"
              initial={reduce ? false : { opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="testimonial-modal-close"
                onClick={() => setSelectedIdx(null)}
                aria-label="Close testimonial overlay"
              >
                <X size={18} />
              </button>

              <div className="testimonial-modal-body">
                <div className="testimonial-modal-left">
                  <div className="testimonial-modal-avatar">
                    <img 
                      src={currentModalItem.image || fallbackTestimonials[selectedIdx % fallbackTestimonials.length].image} 
                      alt={`${currentModalItem.name} avatar`} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackTestimonials[selectedIdx % fallbackTestimonials.length].image;
                      }}
                    />
                  </div>
                  <div className="testimonial-modal-rating" aria-label={`Rating: ${currentModalItem.rating || 5} out of 5 stars`}>
                    {[...Array(currentModalItem.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} className="star-filled" />
                    ))}
                  </div>
                  {currentModalItem.badge && (
                    <span className="testimonial-modal-badge">{currentModalItem.badge}</span>
                  )}
                </div>

                <div className="testimonial-modal-right">
                  {currentModalItem.tagline && (
                    <h3 className="testimonial-modal-tagline">“{currentModalItem.tagline}”</h3>
                  )}
                  <blockquote className="testimonial-modal-quote">
                    “{currentModalItem.content}”
                  </blockquote>
                  <div className="testimonial-modal-author">
                    <h4 id="modal-client-name">{currentModalItem.name}</h4>
                    <p>{currentModalItem.role} &middot; <span className="highlight-company">{currentModalItem.company}</span></p>
                  </div>
                </div>
              </div>

              <div className="testimonial-modal-footer">
                <div className="testimonial-modal-counter">
                  {selectedIdx + 1} / {testimonialsList.length}
                </div>
                <div className="testimonial-modal-nav">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setSelectedIdx((prev) => (prev === null ? 0 : (prev - 1 + testimonialsList.length) % testimonialsList.length))
                    }
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() =>
                      setSelectedIdx((prev) => (prev === null ? 0 : (prev + 1) % testimonialsList.length))
                    }
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
