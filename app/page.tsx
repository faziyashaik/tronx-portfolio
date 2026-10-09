import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/motion/Reveal";
import AboutScene from "@/components/home/AboutScene";
import CinematicHero from "@/components/home/CinematicHero";
import CinematicServices from "@/components/home/CinematicServices";
import { BusinessSystemLaunch, RestaurantMenuLaunch } from "@/components/home/ProductLaunchScenes";
import WorkGallery from "@/components/home/WorkGallery";
import ImmersiveScene from "@/components/home/ImmersiveScene";
import ProcessJourney from "@/components/home/ProcessJourney";
import WhyScene from "@/components/home/WhyScene";
import ConsultationChapter from "@/components/home/ConsultationChapter";
import CinematicTestimonials from "@/components/home/CinematicTestimonials";

export default function HomePage() {
  return <>
    <Navbar />
    <main>
      <CinematicHero />
      <AboutScene />
      <CinematicServices />
      <RestaurantMenuLaunch />
      <BusinessSystemLaunch />
      <WorkGallery />
      <ImmersiveScene />
      <ProcessJourney />
      <WhyScene />
      <section className="launch-faq-section" aria-labelledby="faq-heading">
        <div className="container launch-faq-layout">
          <Reveal className="launch-faq-intro"><p className="eyebrow"><span className="eyebrow-mark" />A few questions</p><h2 id="faq-heading">Good to know.</h2><p>A few starting points to make the next step clearer.</p></Reveal>
          <Reveal className="launch-faq-list"><FAQ /></Reveal>
        </div>
      </section>
      <CinematicTestimonials />
      <ConsultationChapter />
    </main>
    <Footer />
  </>;
}
