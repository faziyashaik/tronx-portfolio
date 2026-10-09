export interface TestimonialItem {
  _id?: string;
  id: string;
  name: string;
  role: string;
  company: string;
  shortQuote: string;
  content: string;
  image: string;
  rating?: number;
  tagline?: string;
  badge?: string;
}

export const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Elena Rostova",
    role: "Chief Product Officer",
    company: "Vanguard Tech",
    shortQuote: "TRONX transformed our suite into a seamless, high-performance digital ecosystem. Truly unmatched quality.",
    tagline: "Unmatched execution & spatial design",
    content: "TRONX transformed our fragmented digital suite into a seamless, high-performance ecosystem. The level of craftsmanship, spatial design, and speed of delivery exceeded every expectation.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Enterprise Platform"
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "Founder & CEO",
    company: "Aura Hospitality",
    shortQuote: "Our digital menu doubled customer engagement in under 30 days. Cinematic, intuitive, and rock solid.",
    tagline: "Elevated customer engagement instantly",
    content: "Our digital menu and ordering flow built by TRONX doubled customer engagement in under 30 days. It feels cinematic, intuitive, and remarkably stable at peak volume.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Smart Hospitality"
  },
  {
    id: "3",
    name: "Sophia Chen",
    role: "VP of Digital Operations",
    company: "Nexus Automation",
    tagline: "A total game-changer for workflow",
    shortQuote: "Working with TRONX brought clarity to complex business software. Deeply intuitive and reliable system design.",
    content: "Working with TRONX brought clarity to complex business software. Their team designs with a deep understanding of human interaction and underlying system architecture.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Workflow Software"
  },
  {
    id: "4",
    name: "David Vance",
    role: "Managing Director",
    company: "Krypton Global",
    shortQuote: "TRONX redefined how our executive team presents itself digitally. Exceptional craftsmanship throughout.",
    tagline: "Digital identity redefined",
    content: "TRONX redefined how our leadership team presents itself digitally. From NFC integrations to interactive portals, the end product is sophisticated and reliable.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Brand Ecosystem"
  },
  {
    id: "5",
    name: "Amara Nwosu",
    role: "Head of Growth",
    company: "Orbit Health",
    shortQuote: "Complex patient workflows turned into clear, reassuring interactions. Performance and detail are top tier.",
    tagline: "Empathetic, user-centered technology",
    content: "The care portal designed by TRONX turned complex patient workflows into clear, reassuring interactions. Their attention to detail and performance is top tier.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Health Systems"
  },
  {
    id: "6",
    name: "Julian Sterling",
    role: "Creative Director",
    company: "Monolith Architecture",
    shortQuote: "TRONX approaches web design like architecture — structured, beautiful, and built to scale flawlessly.",
    tagline: "Cinematic digital architecture",
    content: "TRONX approaches web design like architecture — structured, beautiful, and built to withstand scale. They delivered a masterpiece for our global brand.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Digital Architecture"
  },
  {
    id: "7",
    name: "Chloe Rodriguez",
    role: "Co-Founder & COO",
    company: "Pulse Logistics",
    shortQuote: "Our team gained instant clarity over daily dispatch and automated reporting. A truly transformative partner.",
    tagline: "Smooth, fault-tolerant operations",
    content: "The custom operations dashboard built by TRONX gave our team instant clarity over daily dispatch and automated reporting. A truly transformative digital partner.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "Logistics SaaS"
  },
  {
    id: "8",
    name: "Alexander Wright",
    role: "Chief Technology Officer",
    company: "Aether AI",
    shortQuote: "Engineering precision and UI fluidity brought to our flagship product is world-class. Weightless performance.",
    tagline: "Ultra-fast performance & elegance",
    content: "The engineering precision and UI fluidity TRONX brought to our flagship product is world class. Everything feels weightless, responsive, and beautifully built.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    badge: "AI Infrastructure"
  }
];
