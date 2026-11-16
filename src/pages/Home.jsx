import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import KickstarterSection from "../components/KickstarterSection";
import { KICKSTARTER_ENABLED } from "../content/features";
import WhoWeAre from "../components/WhoWeAre";
import Characters from "../components/Characters";
import WhatsInBox from "../components/WhatsInBox";
import Testimonials from "../components/Testimonials";
import GiveBack from "../components/GiveBack";
import GetFirstBox from "../components/GetFirstBox";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";

export default function Home() {
  return (
    <div className="min-h-screen bg-pet-pattern font-body overflow-x-hidden">
      <Seo path="/" />
      <Navbar />
      <Hero />
      {/* Kickstarter section, switched by KICKSTARTER_ENABLED in
          src/content/features.js. When it is off, the hero runs straight
          into Who We Are (both blue), as before the campaign. */}
      {KICKSTARTER_ENABLED && (
        <>
          {/* blue → white */}
          <SectionDivider direction="down" color="#ffffff" />
          <KickstarterSection />
          {/* white → blue */}
          <SectionDivider direction="up" color="#00A9D6" />
        </>
      )}
      <WhoWeAre />
      {/* blue → white */}
      <SectionDivider direction="down" color="#ffffff" />
      <Characters />
      {/* white → blue */}
      <SectionDivider direction="up" color="#00A9D6" />
      <WhatsInBox />
      {/* blue → white */}
      <SectionDivider direction="down" color="#ffffff" />
      <Testimonials />
      {/* white → blue */}
      <SectionDivider direction="up" color="#00A9D6" />
      <GiveBack />
      {/* blue → white */}
      <SectionDivider direction="down" color="#ffffff" />
      <GetFirstBox />
      {/* white → blue (footer) */}
      <SectionDivider direction="up" color="#00A9D6" />
      <Footer />
    </div>
  );
}