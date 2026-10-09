"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Building2, Globe2, HeartPulse, MapPin, MessageSquareText, MoveUpRight, Nfc, Video, Workflow } from "lucide-react";
import { services } from "@/data/services";

const icons = { workflow: Workflow, message: MessageSquareText, map: MapPin, nfc: Nfc, media: Video, web: Globe2, software: Building2, health: HeartPulse, growth: MoveUpRight } as const;

function ServiceObject({ index }: { index: number }) {
  const patterns = ["nodes", "reviews", "local", "identity", "tour", "web", "system", "care", "growth"];
  const pattern = patterns[index];
  if (pattern === "nodes") return <div className="object-nodes"><i /><i /><i /><i /><i /><span /><span /></div>;
  if (pattern === "reviews") return <div className="object-reviews"><div className="object-stars">★★★★★</div><strong>Good to hear<br />from you.</strong><i /><i /><i /></div>;
  if (pattern === "local") return <div className="object-map"><span /><span /><span /><span /><i className="map-pin-shape"><MapPin size={22} /></i></div>;
  if (pattern === "identity") return <div className="object-identity"><span>T.</span><small>TRONX / CONNECT</small><strong>Make a<br />connection.</strong><Nfc size={23} /></div>;
  if (pattern === "tour") return <div className="object-tour"><div className="tour-ring ring-one" /><div className="tour-ring ring-two" /><span>360°</span></div>;
  if (pattern === "web") return <div className="object-browser"><div className="browser-bar"><i /><i /><i /></div><strong>Make a place<br />on the web.</strong><div className="browser-block" /><i className="browser-line" /></div>;
  if (pattern === "system") return <div className="object-system"><div className="system-sidebar"><i /><i /><i /><i /></div><div className="system-content"><small>WORKSPACE / OVERVIEW</small><strong>A clearer view<br />of the day.</strong><div className="system-counters"><i /><i /><i /></div><div className="system-graph"><b /><b /><b /><b /><b /><b /></div></div></div>;
  if (pattern === "care") return <div className="object-care"><HeartPulse size={24} /><span>CARE, MADE CLEAR.</span><strong>A simpler<br />digital visit.</strong><div><i /><i /><i /></div></div>;
  return <div className="object-growth"><small>LOCAL PRESENCE</small><strong>Good work,<br />more visible.</strong><div className="growth-columns"><i /><i /><i /><i /><i /><i /><i /></div></div>;
}

function CapabilityScene({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const count = services.length;
  const step = 1 / count;
  
  // Calculate precise keyframes so each card has a distinct entry, smooth peak hold, and clean exit phase
  const start = index * step;
  const fadeInEnd = start + step * 0.22;
  const fadeOutStart = start + step * 0.78;
  const end = (index + 1) * step;

  // Native array useTransform for 60fps GPU-accelerated scroll animations without JS callback bottlenecks
  const opacity = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [28, 0, 0, -24]);
  const scale = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [0.97, 1, 1, 0.98]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.4 ? "auto" : "none"));

  const service = services[index];
  const Icon = icons[service.icon];

  return (
    <motion.article 
      className="capability-scene" 
      style={{ opacity, y, scale, pointerEvents }} 
      aria-label={`${service.number} ${service.title}`}
    >
      <div className="capability-copy">
        <span className="capability-index">{service.number}<i />09</span>
        <p className="launch-kicker">TRONX CAPABILITY</p>
        <h3>{service.title}</h3>
        <p className="capability-description">{service.description}</p>
        <a href="#book" className="text-button">Explore this capability <ArrowUpRight size={16} /></a>
      </div>
      <div className="capability-visual">
        <div className="capability-object-frame">
          <div className="capability-object-top">
            <span><Icon size={15} />{service.title.toUpperCase()}</span>
            <span>TRONX / CONCEPT</span>
          </div>
          <ServiceObject index={index} />
          <div className="capability-object-bottom">
            <span>BUILT AROUND THE BUSINESS</span>
            <span>{service.number} / 09</span>
          </div>
        </div>
        <div className="object-shadow" />
      </div>
    </motion.article>
  );
}

function StaticServices() {
  return (
    <div className="service-static-list">
      {services.map((service) => (
        <article key={service.number}>
          <span>{service.number}</span>
          <div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <a href="#book" aria-label={`Ask about ${service.title}`}><ArrowUpRight size={17} /></a>
        </article>
      ))}
    </div>
  );
}

export default function CinematicServices() {
  const track = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="services" className="services-launch-section">
      <div className="container services-launch-heading">
        <p className="eyebrow"><span className="eyebrow-mark" />A connected digital ecosystem</p>
        <h2>What we build</h2>
        <p>Explore the tools, experiences, software and growth systems that can move a business forward.</p>
        <div className="sr-only">
          <h3>TRONX capabilities</h3>
          <ul>{services.map((service) => <li key={service.number}><strong>{service.title}.</strong> {service.description}</li>)}</ul>
        </div>
      </div>
      {reduce ? (
        <div className="container"><StaticServices /></div>
      ) : (
        <div className="service-scroll-track" ref={track}>
          <div className="service-sticky-stage">
            <div className="service-progress">
              <span>CAPABILITIES</span>
              <motion.i style={{ width: progressWidth }} />
              <span>01 — 09</span>
            </div>
            {services.map((service, index) => (
              <CapabilityScene key={service.number} index={index} progress={scrollYProgress} />
            ))}
            <div className="service-scroll-hint">
              <ArrowDown size={13} /> SCROLL TO MOVE THROUGH THE ECOSYSTEM
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
