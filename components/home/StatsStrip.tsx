"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const statsData = [
  { value: 120, label: "Projects Delivered", suffix: "+" },
  { value: 4.9, label: "Average Client Rating", prefix: "", suffix: "/5", isDecimal: true },
  { value: 98, label: "Client Retention Rate", suffix: "%" },
];

function StatItem({
  value,
  label,
  suffix = "",
  isDecimal = false,
  inView,
}: {
  value: number;
  label: string;
  suffix?: string;
  isDecimal?: boolean;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1600; // ms
    const steps = 40;
    const stepTime = duration / steps;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value, reduce]);

  return (
    <div className="stat-strip-item">
      <strong className="stat-strip-number">
        {isDecimal ? displayValue.toFixed(1) : Math.round(displayValue)}
        <span>{suffix}</span>
      </strong>
      <span className="stat-strip-label">{label}</span>
    </div>
  );
}

export default function StatsStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="stats-strip-container"
      ref={containerRef}
      initial={reduce ? false : { opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      role="region"
      aria-label="TRONX performance statistics"
    >
      <div className="stats-strip-divider" aria-hidden="true" />
      <div className="stats-strip-grid">
        {statsData.map((stat, idx) => (
          <StatItem
            key={idx}
            value={stat.value}
            label={stat.label}
            suffix={stat.suffix}
            isDecimal={stat.isDecimal}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}
