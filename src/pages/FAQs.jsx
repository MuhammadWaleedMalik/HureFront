import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      icon: '❓',
      question: 'What is HURE and how does it help clinics?',
      answer: `HURE is a healthcare-focused HR platform that simplifies administrative work like onboarding, credential tracking, and compliance so clinics can focus on delivering care.`
    },
    {
      icon: '🩺',
      question: 'Can HURE manage different staff roles like doctors and nurses?',
      answer: `Yes, you can assign role-based access for doctors, nurses, HR, and admin staff — giving each group the right permissions.`
    },
    {
      icon: '🔐',
      question: 'How does HURE handle license and credential compliance?',
      answer: `HURE automatically tracks license renewal dates, sends alerts, and stores compliance documents securely for audits.`
    },
    {
      icon: '🏥',
      question: 'Is HURE suitable for small clinics or only large hospitals?',
      answer: `HURE is built to scale — it works just as well for a small clinic as it does for a multi-location hospital.`
    },
    {
      icon: '📘',
      question: 'Can I track training progress and staff development in HURE?',
      answer: `Yes, HURE includes training tools for assigning modules, tracking completion, and issuing certifications.`
    },
    {
      icon: '🛡️',
      question: 'How secure is the data stored in HURE?',
      answer: `HURE uses end-to-end encryption, GDPR-compliant infrastructure, and role-based access to keep your data secure.`
    },
    {
      icon: '💬',
      question: 'Do you offer support after setup?',
      answer: `Yes, we offer ongoing technical support, updates, and optimization packages for clinics of all sizes.`
    },
    {
      icon: '🚀',
      question: 'How can I get started with HURE?',
      answer: `Just visit ${websites[0].contactwebsite} or book a free demo. We’ll onboard your clinic in minutes.`
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="w-[full] max-w-4xl mt-24  mx-auto py-12 px-4 md:px-6"
      style={{
        backgroundColor: styles.primaryColor3,
        fontFamily: styles.bodyText,
      }}
    >
      <div className="text-center mb-10">
        <h2
          style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: styles.primaryColor1,
            fontFamily: styles.headings
          }}
        >
          FAQs — Frequently Asked Questions
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            color: styles.primaryColor4,
            fontFamily: styles.headings
          }}
        >
          Everything you need to know about our services
        </p>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="rounded-xl border overflow-hidden transition-all"
            style={{
              borderColor: styles.primaryColor1,
              backgroundColor: "#ffffff"
            }}
            whileHover={{ boxShadow: `0 6px 16px ${styles.primaryColor2}` }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center px-5 py-4"
              style={{
                backgroundColor: "#f9f9f9",
                borderBottom: `1px solid ${styles.primaryColor2}`,
                cursor: "pointer"
              }}
            >
              <span className="flex items-start gap-2 text-lg font-semibold text-gray-800">
                <span>{faq.icon}</span>
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                className="text-xl font-bold text-gray-500"
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 py-4 text-gray-700 text-base" style={{ backgroundColor: "#ffffff" }}>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
