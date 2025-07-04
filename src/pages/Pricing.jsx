import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const colors = {
  primary: "#8D6E63",
  secondary: "#F9E795",
  accent: "#1565C0",
  textDark: "#000000",
  background: "#F5F5F0",
};

const Pricing = () => {
  const { t } = useTranslation();

  const plans = [
    { 
      id: "essential", 
      name: "Essential", 
      price: "6,500", 
      duration: "month", 
      currency: "Ksh",
      idealFor: "Solo clinics or small teams (5–15 staff)",
      features: [
        "Staff profile creation & role assignment",
        "Shift scheduling",
        "Clock in/out (manual or kiosk)",
        "Attendance & leave tracking",
        "HR document distribution with acknowledgment",
        "License alerting (up to 3 staff roles)",
        "2 workflow automations (e.g., onboarding, leave)",
        "Standard email support (response within 48 hours)",
        "Remote onboarding via Zoom/WhatsApp"
      ] 
    },
    { 
      id: "professional", 
      name: "Professional", 
      price: "13,000", 
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
      price: "20,000", 
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

  const addOns = [
    { name: "Extra Location", price: "Ksh 2,500/month", purpose: "Add new branch" },
    { name: "Extra 25 Staff", price: "Ksh 3,500/month", purpose: "Scale beyond tier limits" },
    { name: "Onsite Setup (within 50 km of Nairobi CBD)", price: "Ksh 13,000 (one-time)", purpose: "Physical onboarding/training" },
    { name: "Onsite Setup (Beyond 50 km)", price: "Custom Quote", purpose: "Physical onboarding/training" },
    { name: "Offline Device Mode", price: "Ksh 1,500/month", purpose: "Works without internet + auto-sync" },
    { name: "HURE Hire", price: "Ksh 1,000/month", purpose: "Job board + 2 postings" },
    { name: "HURE Events", price: "Ksh 500/month", purpose: "Monthly events listing" },
    { name: "HURE Connect", price: "Ksh 750/month", purpose: "Community chat & networking" },
  ];

  const onboardingSteps = [
    { step: "Sign Up", content: "Create your account with organization details" },
    { step: "Thank You", content: "Payment successful, proceed to setup" },
    { step: "Welcome", content: "Begin setup with a short video guide" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Pricing Section */}
      <section className="py-16 px-4 lg:px-12">
        <h1 className="text-5xl font-bold text-center mb-8" style={{ color: colors.primary }}>Pricing</h1>
        <p className="text-center mb-6"><a href="#full-details" className="text-blue-600 underline">View Full Plan Details</a></p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: colors.primary }}>{plan.name}</h2>
              <p className="text-lg mb-4" style={{ color: colors.accent }}>{plan.currency}{plan.price}/month</p>
              <ul className="text-left mb-6">
                {plan.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-center mb-2"><FiCheck className="mr-2" style={{ color: colors.primary }} /> {feature}</li>
                ))}
              </ul>
              <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">Sign Up</button>
            </div>
          ))}
        </div>
        <div id="full-details" className="mt-12">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: colors.primary }}>{plan.name} – {plan.currency}{plan.price}/month</h2>
              <p className="text-md italic mb-4" style={{ color: colors.accent }}>Ideal for: {plan.idealFor}</p>
              <ul className="list-disc list-inside mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="py-16 px-4 lg:px-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.primary }}>Add-Ons</h2>
        <p className="text-center mb-6">Enhance your plan with optional add-ons:</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-left">Cost</th>
                <th className="p-4 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((addOn, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-4 border-b">{addOn.name}</td>
                  <td className="p-4 border-b">{addOn.price}</td>
                  <td className="p-4 border-b">{addOn.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Onboarding Flow */}
      <section className="py-16 px-4 lg:px-12">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.primary }}>Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {onboardingSteps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>{step.step}</h3>
              <p className="mb-4">{step.content}</p>
              {step.step === "Sign Up" && (
                <div>
                  <input className="w-full p-2 mb-2 border rounded" placeholder="Full Name" />
                  <input className="w-full p-2 mb-2 border rounded" placeholder="Organization Name" />
                  <input className="w-full p-2 mb-2 border rounded" placeholder="Phone Number +254" />
                  <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">Sign Up</button>
                </div>
              )}
              {step.step === "Thank You" && <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">Continue</button>}
              {step.step === "Welcome" && (
                <div>
                  <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">Get Started</button>
                  <p className="mt-4 text-sm">If you need help, we’re one message away <span className="text-blue-600">📧</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;