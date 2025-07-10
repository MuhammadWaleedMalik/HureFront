import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const colors = {
  primary: "#336573",
  secondary: "#9B7C70",
  accent: "#1565C0",
  textDark: "#000000",
  background: "#F4EFEA",
};

const HomePricing = () => {
  const { t } = useTranslation();

  const plans = [
    { 
      id: "essential", 
      name: "Essential", 
      price: "8000", 
      duration: "month", 
      currency: "Ksh",
      idealFor: "Solo clinics or small teams (5–15 staff)",
      features: [
        "Staff profile creation & role assignment",
        "Shift scheduling",
        "Clock in/out (manual or kiosk)",
        "Attendance & leave tracking",
        "Access to Hire, Events, Connect Modules    " ,
    
        "License alerting (up to 3 staff roles)",
        "2 workflow automations (e.g., onboarding, leave)",
        "Standard email support (response within 48 hours)",
        "Remote onboarding via Zoom/WhatsApp"
      ] 
    },
    { 
      id: "professional", 
      name: "Professional", 
      price: "15,000", 
      duration: "month", 
      currency: "Ksh",
      isPopular: true,
      idealFor: "Clinics with 1–2 branches and 15–40 staff",
      features: [
        "Everything in Essential, plus:",
        "Unlimited license & certification tracking",
        "Staff incident & performance logging",
        "CSV & PDF HR reports",
        "HR letter library with bulk dispatch",
        "5 custom workflows",
        "Training log + certificate upload",
        "Role-based document packets",
        "Priority email support (response within 24 hours)",
        "Remote onboarding via Zoom/WhatsApp"
      ] 
    },
    { 
      id: "enterprise", 
      name: "Enterprise", 
      price: "25,000", 
      duration: "month", 
      currency: "Ksh",
      idealFor: "Clinic groups or multi-site teams",
      features: [
        "Everything in Professional, plus:",
        "Multi-location dashboard (up to 5 clinics)",
        "Branded HR portal",
        "Role-based access controls",
        "Unlimited workflow automations",
        "Full HR document library",
        "Compliance dashboards & wellness check-ins",
        "Dedicated onboarding specialist + WhatsApp support",
        "Remote onboarding via Zoom/WhatsApp"
      ] 
    },
  ];

 
  return (
    <div className=" bg-[#F4EFEA] font-times-new-roman">
      {/* Pricing Section */}
      <section className="py-16 px-4 lg:px-12">
        <h1 className="text-5xl font-bold text-center mb-8" style={{ color: colors.primary }}>Pricing</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: colors.primary }}>{plan.name}</h2>
              <p className="text-lg mb-4" style={{ color: colors.accent }}>{plan.currency} {plan.price}/month</p>
              <ul className="text-left mb-6">
                {plan.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-center mb-2"><FiCheck className="mr-2" style={{ color: colors.primary }} /> {feature}</li>
                ))}
              </ul>
       
                     <Link to={"signup"} className="w-[100px] bg-gray-800 text-white py-2 px-8 rounded-lg hover:bg-gray-700">Sign Up</Link>
       
            </div>
          ))}
        </div>
    
    
      </section>

      
    </div>
  );
};

export default HomePricing;