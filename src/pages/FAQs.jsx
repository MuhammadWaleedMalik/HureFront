import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
  {
    question: 'What is HURE and how does it help clinics?',
    answer: `HURE is a healthcare-focused HR and workforce management platform designed to streamline clinic operations. From staff onboarding and credential tracking to automated HR workflows, HURE simplifies complex administrative processes so clinics can focus on delivering quality care.`
  },
  {
    question: 'Can HURE manage different staff roles like doctors and nurses?',
    answer: `Yes, HURE supports role-based access and staff segmentation. You can assign specific permissions to doctors, nurses, HR personnel, and administrative staff. This ensures that each team member has access only to the tools and data relevant to their responsibilities.`
  },
  {
    question: 'How does HURE handle staff license and credential compliance?',
    answer: `HURE automatically tracks certifications, licenses, and renewal dates. It sends proactive alerts before expiry and securely stores documents for easy access during audits. This helps clinics stay compliant with regional healthcare regulations effortlessly.`
  },
  {
    question: 'Is HURE suitable for small clinics or only large hospitals?',
    answer: `HURE is scalable and flexible. Whether you're a small single-location clinic or a large multi-branch hospital, the platform adapts to your operational size. You can start small and expand as your team and needs grow.`
  },
  {
    question: 'Can I track training progress and staff development in HURE?',
    answer: `Absolutely. HURE includes built-in training management tools that let you assign learning modules, track completion, and issue certifications. This ensures your medical and administrative staff stay updated on protocols, compliance, and care standards.`
  },
  {
    question: 'How secure is the data stored in HURE?',
    answer: `HURE is built on enterprise-grade cloud infrastructure with end-to-end encryption, role-based access, and GDPR-compliant storage. We prioritize data privacy and security, ensuring your clinic’s records remain safe and confidential.`
  },
  {
    question: 'Do you offer support after setup?',
    answer: `Yes, we offer continuous support packages that include technical assistance, feature updates, bug fixes, and performance optimization. Our team is available to help you as your clinic evolves or scales its operations.`
  },
  {
    question: 'How can I get started with HURE?',
    answer: `To get started, visit our website at ${websites[0].contactwebsite} or book a free demo session. Our onboarding team will walk you through the platform, understand your needs, and set you up quickly for success.`
  }
];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto',
        padding: '3rem 1rem',
        backgroundColor: styles.primaryColor3,
        fontFamily: styles.bodyText
      }}
    >
      <div style={{ 
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h2 style={{
          fontSize: '2.275rem',
          fontStyle : 'italic',
          fontWeight: '700',
          marginBottom: '1rem',
          marginTop: '5rem',
          color: styles.primaryColor1,
          fontFamily: styles.headings
        }}>
          Frequently Asked Questions
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: styles.primaryColor4,
          fontFamily: styles.headings
        }}>
          Everything you need to know about our services
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            style={{
              border: `1px solid ${styles.primaryColor1}`,
              borderRadius: '1.5rem',
              overflow: 'hidden'
            }}
            whileHover={{ boxShadow: `0 4px 12px ${styles.primaryColor2}` }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '1rem',
                textAlign: 'left',
                backgroundColor: styles.primaryColor2,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: styles.primaryColor5,
                fontFamily: styles.headings,
                margin: 0
              }}>
                {faq.question}
              </h3>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                style={{
                  fontSize: '1.5rem',
                  color: styles.primaryColor1
                }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto',
                    backgroundColor: styles.primaryColor3
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: styles.primaryColor1,
                    padding: '0 1rem'
                  }}
                >
                  <div style={{ padding: '1rem 0' }}>
                    <p style={{ fontFamily: styles.bodyText, margin: 0 }}>{faq.answer}</p>
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
