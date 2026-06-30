import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FlavorGallery from "./components/FlavorGallery";
import CustomCakes from "./components/CustomCakes";
import Pasticceria from "./components/Pasticceria";
import VisitUs from "./components/VisitUs";
import Journal from "./components/Journal";
import Footer from "./components/Footer";

/**
 * Single-page narrative, scrolled top to bottom:
 *   Hero (the gelato disassembles in place as you scroll) → Flavours →
 *   Custom Cakes → Pasticceria → Visit Us → Journal → Footer.
 */
export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <FlavorGallery />
        <CustomCakes />
        <Pasticceria />
        <VisitUs />
        <Journal />
      </main>
      <Footer />
    </>
  );
}
