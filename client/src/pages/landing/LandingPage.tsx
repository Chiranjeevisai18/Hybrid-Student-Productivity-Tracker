import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Preview from "../../components/landing/Preview";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="bg-background min-h-screen w-full text-textPrimary overflow-x-hidden transition-colors duration-300">
      <Hero />
      <Features />
      <Preview />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
