// src/components/RequestDemo.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/colors.module.scss';

const RequestDemo = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    facilityType: 'Clinic',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Demo requested:', formData);
    setSubmitted(true);
    
    // In a real app, you would send this data to your server
    // and trigger the confirmation email from there
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: styles.primaryColor3 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: styles.primaryColor5 }}>
              Request a Demo
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-semibold mb-2" style={{ color: styles.primaryColor5 }}>
                Thank You!
              </h3>
              <p className="mb-4" style={{ color: styles.primaryColor5 }}>
                Your demo request has been submitted successfully.
              </p>
              <p className="mb-6" style={{ color: styles.primaryColor5 }}>
                We've sent a confirmation email with more details about your scheduled demo.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md font-medium"
                style={{ 
                  backgroundColor: styles.primaryColor4,
                  color: styles.primaryColor3
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      backgroundColor: styles.primaryColor3
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      backgroundColor: styles.primaryColor3
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="facilityType" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                    Type of Facility *
                  </label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      backgroundColor: styles.primaryColor3
                    }}
                  >
                    <option value="Clinic">Clinic</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Rehab Center">Rehab Center</option>
                    <option value="Diagnostic Center">Diagnostic Center</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      backgroundColor: styles.primaryColor3
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      backgroundColor: styles.primaryColor3
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        backgroundColor: styles.primaryColor3
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        backgroundColor: styles.primaryColor3
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium" style={{ color: styles.primaryColor5 }}>
                    Notes (What would you like to see in the demo?)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      backgroundColor: styles.primaryColor3
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ 
                    backgroundColor: styles.primaryColor3,
                    color: styles.primaryColor5,
                    border: `1px solid ${styles.primaryColor5}`
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ 
                    backgroundColor: styles.primaryColor4,
                    color: styles.primaryColor3
                  }}
                >
                  Request Demo
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RequestDemo;