import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import ClientLogos from './components/sections/ClientLogos';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import TechStack from './components/sections/TechStack';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import CTABanner from './components/sections/CTABanner';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <ClientLogos />
          <Services />
          <About />
          <Portfolio />
          <TechStack />
          <Testimonials />
          <Blog />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
