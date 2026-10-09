"use client";

import { useEffect, useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import { fallbackTestimonials, type TestimonialItem } from "@/data/testimonials";

export interface CardPosDef {
  x: string;
  y: string;
  z: number;
  rotate: number;
  scale: number;
  width: number;
  height: number;
}

export default function TestimonialCard({
  item,
  index,
  pos,
  mouseX,
  mouseY,
  parallaxY,
  reduce,
  hoveredIdx,
  setHoveredIdx,
  setSelectedIdx,
}: {
  item: TestimonialItem;
  index: number;
  pos: CardPosDef;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduce: boolean | null;
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
  setSelectedIdx: (idx: number) => void;
}) {
  const isHovered = hoveredIdx === index;
  const fallbackImg = fallbackTestimonials[index % fallbackTestimonials.length].image;
  const [imgSrc, setImgSrc] = useState(item.image && item.image.trim().startsWith("http") ? item.image : fallbackImg);

  useEffect(() => {
    if (item.image && item.image.trim().startsWith("http")) {
      setImgSrc(item.image);
    } else {
      setImgSrc(fallbackImg);
    }
  }, [item.image, fallbackImg]);

  const handleImgError = () => {
    setImgSrc(fallbackImg);
  };

  // 3D Tilt and Parallax Motion
  const cardX = useTransform(mouseX, (val) => val * (pos.z * 0.12));
  const cardY = useTransform(mouseY, (val) => val * (pos.z * 0.12));
  const rotX = useTransform(mouseY, (val) => -val * 6);
  const rotY = useTransform(mouseX, (val) => val * 7);
  const combinedY = useTransform([parallaxY, cardY], ([pY, cY]) => (pY as number) + (cY as number));

  const shortQuote = item.shortQuote || item.tagline || fallbackTestimonials[index % fallbackTestimonials.length].shortQuote;

  return (
    <motion.figure
      className={`testimonial-floating-card card-pos-${index + 1} ${isHovered ? "is-hovered" : ""}`}
      style={{
        left: `calc(50% + ${pos.x})`,
        top: `calc(44% + ${pos.y})`,
        zIndex: isHovered ? 50 : Math.round(pos.z),
        x: reduce ? 0 : cardX,
        y: reduce ? 0 : combinedY,
        rotateX: reduce || isHovered ? 0 : rotX,
        rotateY: reduce || isHovered ? 0 : rotY,
        rotateZ: reduce || isHovered ? 0 : pos.rotate,
        scale: isHovered ? pos.scale * 1.06 : pos.scale,
        transformStyle: "preserve-3d",
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.75, y: 35 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: pos.scale, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHoveredIdx(index)}
      onMouseLeave={() => setHoveredIdx(null)}
      onClick={() => setSelectedIdx(index)}
      tabIndex={0}
      role="button"
      aria-label={`View testimonial from ${item.name}, ${item.role} at ${item.company}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedIdx(index);
        }
      }}
    >
      <div 
        className="testimonial-card-frame"
        style={{ width: `${pos.width}px`, height: `${pos.height}px` }}
      >
        <div className="testimonial-portrait-wrap">
          <img
            src={imgSrc}
            alt={`${item.name} portrait`}
            className="testimonial-portrait-img"
            onError={handleImgError}
            loading="lazy"
          />
          <div className="testimonial-card-glare" aria-hidden="true" />
          <div className="testimonial-card-badge" aria-hidden="true">
            <MessageSquareQuote size={11} />
          </div>
        </div>

        <figcaption className="testimonial-card-figcaption">
          <div className="testimonial-card-meta">
            <strong className="testimonial-client-name">{item.name}</strong>
            <span className="testimonial-client-company">{item.company}</span>
          </div>

          <motion.blockquote
            className="testimonial-hover-quote"
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
              marginTop: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p>“{shortQuote}”</p>
          </motion.blockquote>
        </figcaption>
      </div>
    </motion.figure>
  );
}
