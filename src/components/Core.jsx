import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';
import { Link } from 'react-router-dom';

const Core = () => {
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    address: '',
    package: 'Essential'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const isLoggedIn = localStorage.getItem('token');
  
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
        "HR document distribution with acknowledgment",
        "License alerting (up to 3 staff roles)",
        "2 workflow automations (e.g., onboarding, leave)",
        "Standard email support (response within 48 hours)",
        "Remote onboarding via Zoom/WhatsApp",
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
const APIURL=import.meta.env.VITE_API_URL
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    try {
      const response = await fetch(`${APIURL}/api/free`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: formData.email,
          userName: formData.name,
          userPhone: formData.phone,
          userDesig: formData.designation,
          userAddress: formData.address,
          userPackage: formData.package
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit request');
      }

      setSubmitStatus({ success: true, message: 'Your free trial request has been submitted successfully!' });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        designation: '',
        address: '',
        package: 'Essential'
      });

      // Auto-close modal after 3 seconds
      setTimeout(() => {
        setShowTrialModal(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: error.message || 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-7xl mt-24 mx-auto p-8 relative"
    >
      <motion.h1 
        className="text-4xl font-bold mb-6"
        style={{ 
          color: styles.primaryColor5,
          fontFamily: styles.headingFont 
        }}
      >
        {websites[0].name} Core
      </motion.h1>
      
      <motion.p 
        className="text-xl mb-8"
        style={{
          color: styles.primaryColor4,
          fontFamily: styles.subheadingFont
        }}
      >
        Ready to get started with {websites[0].name} Core?
      </motion.p>
      
      <motion.div 
        className="flex justify-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-md font-medium"
          style={{
            backgroundColor: styles.primaryColor1,
            color: styles.primaryColor3
          }}
          onClick={() => setShowTrialModal(true)}
        >
          Start your free trial
        </motion.button>
        
        <motion.button
        onClick={()=>{
          window.open('https://core.gethure.com', '_blank');
        }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-md font-medium"
          style={{
            backgroundColor: styles.primaryColor2,
            color: styles.primaryColor5
          }}
        >
          Request a Demo
        </motion.button>
      </motion.div>

      {isLoggedIn && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/dashboard" 
            className="text-blue-600 hover:underline"
          >
            Already using {websites[0].name}? Click here
          </Link>
        </motion.div>
      )}

      {/* Free Trial Modal */}
      {showTrialModal && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Start Your Free Trial</h2>
              <button 
                onClick={() => {
                  setShowTrialModal(false);
                  setSubmitStatus({ success: false, message: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                <FiX size={24} />
              </button>
            </div>
            
            {submitStatus.message ? (
              <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Designation *</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Select Package *</label>
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    disabled={isSubmitting}
                  >
                    {plans.map(plan => (
                      <option key={plan.id} value={plan.name}>{plan.name}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Pricing Section */}
      <section className="mt-16 py-8 px-4 lg:px-12">
        <h1 className="text-3xl font-bold text-center mb-8">Pricing Plans</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {plans.map((plan) => (
            <motion.div 
              key={plan.id} 
              className={`bg-white p-6 rounded-lg shadow-lg ${plan.isPopular ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}
              whileHover={{ y: -5 }}
            >
              {plan.isPopular && (
                <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-xl mb-4" style={{ color: styles.primaryColor1 }}>
                {plan.currency}{plan.price}/{plan.duration}
              </p>
              <p className="text-sm italic mb-4">{plan.idealFor}</p>
              <ul className="text-left mb-6">
                {plan.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <FiCheck className="mr-2" style={{ color: styles.primaryColor1 }} /> 
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
                onClick={() => {
                  setShowTrialModal(true);
                  setFormData(prev => ({ ...prev, package: plan.name }));
                }}
              >
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Detailed Plans */}
        <div className="max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div 
              key={plan.id} 
              className="bg-white p-6 rounded-lg shadow-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-2">
                {plan.name} – {plan.currency}{plan.price}/{plan.duration}
                {plan.isPopular && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    Most Popular
                  </span>
                )}
              </h2>
              <p className="text-md italic mb-4">Ideal for: {plan.idealFor}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FiCheck className="mt-1 mr-2 flex-shrink-0" style={{ color: styles.primaryColor1 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
            </motion.div>
          ))}
        </div>
        
        {/* Add-Ons Section */}
        <motion.section 
          className="py-12 px-4 lg:px-12 bg-gray-50 rounded-lg mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Add-Ons</h2>
          <p className="text-center mb-8">Enhance your plan with these optional add-ons:</p>
          
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
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 border-b">{addOn.name}</td>
                    <td className="p-4 border-b">{addOn.price}</td>
                    <td className="p-4 border-b">{addOn.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </section>
    </motion.div>
  );
};

export default Core;