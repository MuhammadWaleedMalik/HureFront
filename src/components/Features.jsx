import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap, FiUsers, FiRepeat, FiShield,
  FiShare2, FiBookOpen, FiBarChart2, FiLock,
  FiChevronDown, FiChevronUp
} from "react-icons/fi";
import styles from '../../styles/colors.module.scss';

const iconMap = {
  zap: FiZap,
  users: FiUsers,
  repeat: FiRepeat,
  shield: FiShield,
  network: FiShare2,
  book: FiBookOpen,
  "bar-chart": FiBarChart2,
  lock: FiLock
};

const Features = ({ colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = [
    {
      title: "Clinic Onboarding",
      short: "Set up your clinic in minutes using our guided wizard.",
      full: [
        "HURE's intuitive onboarding wizard walks clinic administrators through every setup step — from basic information like clinic name and location to more detailed configurations like services offered and staff roles.",
        "The system automatically generates necessary documents and compliance checklists based on your clinic type and location, ensuring you meet all regulatory requirements from day one.",
        "No technical skills required - our guided process helps even non-tech-savvy users get their clinic fully configured in under 30 minutes."
      ],
      icon: "zap",
      badge: "Popular"
    },
    {
      title: "Role-Based Management",
      short: "Assign custom roles like HR Admin, Nurse, or Doctor.",
      full: [
        "Create granular access levels tailored to different healthcare roles - doctors, nurses, administrators, and support staff each get appropriate system access.",
        "Pre-configured role templates for common healthcare positions save setup time while remaining fully customizable to your clinic's unique structure.",
        "Hierarchical permissions ensure sensitive data like payroll and performance reviews are only accessible to authorized personnel."
      ],
      icon: "users"
    },
    {
      title: "HR Workflow Engine",
      short: "Automate time tracking, onboarding, and approvals.",
      full: [
        "Our smart workflows automate repetitive HR tasks like contract generation, onboarding checklists, and leave approvals, saving administrators hours each week.",
        "Customizable approval chains ensure the right people review and sign off on requests based on type, department, and amount.",
        "Integration with biometric devices and mobile apps allows for accurate time tracking across all clinic locations and shifts."
      ],
      icon: "repeat"
    },
    {
      title: "Credential Compliance",
      short: "Track licenses and get reminders before expiry.",
      full: [
        "Centralized digital credential management stores all staff certifications, licenses, and training records in one secure location.",
        "Automated alerts notify both staff and administrators 90, 60, and 30 days before certifications expire, preventing lapses in compliance.",
        "Built-in audit trails maintain complete histories of credential submissions, approvals, and renewals for regulatory reporting."
      ],
      icon: "shield"
    },
    {
      title: "HURE Community",
      short: "Post jobs, join training, and connect with clinics.",
      full: [
        "Our healthcare professional network allows clinics to post job openings visible only to verified medical professionals.",
        "Staff can discover and register for continuing education courses and specialized training programs directly through the platform.",
        "Secure messaging and forum features enable knowledge sharing between healthcare organizations while maintaining patient privacy."
      ],
      icon: "network",
      badge: "New"
    },
    {
      title: "Training Tools",
      short: "Assign and track internal training modules.",
      full: [
        "Upload your own training materials or choose from our library of healthcare-specific courses covering topics from HIPAA compliance to new clinical procedures.",
        "Automated assignment and tracking ensures all staff complete mandatory training on schedule, with manager dashboards showing completion status.",
        "Testing and certification features validate comprehension, with results automatically recorded in employee profiles."
      ],
      icon: "book"
    },
    {
      title: "Smart Dashboards",
      short: "Visualize HR metrics and clinic data easily.",
      full: [
        "Customizable dashboards provide real-time visibility into key HR metrics like attendance, overtime, training completion, and performance indicators.",
        "Drill-down reports help administrators identify trends and issues across departments, locations, or individual staff members.",
        "Exportable data visualizations make it easy to share insights with clinic leadership and board members."
      ],
      icon: "bar-chart"
    },
    {
      title: "Secure SaaS Infra",
      short: "Encrypted, scalable, and GDPR-compliant.",
      full: [
        "Enterprise-grade security including end-to-end encryption, regular penetration testing, and SOC 2 compliance ensures your data remains protected.",
        "Role-based access controls paired with detailed audit logs provide visibility into all system activity while preventing unauthorized access.",
        "Our cloud infrastructure automatically scales to support clinics of any size, from small practices to large hospital networks."
      ],
      icon: "lock"
    }
  ];

  const toggleExpand = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <section 
      className="py-16 px-4 sm:px-8"
      style={{ backgroundColor: colors.primaryColor3 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.primaryColor2, fontFamily: styles.headingFont }}
          >
            Healthcare-Focused Features
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: colors.primaryColor1, fontFamily: styles.subheadingFont }}
          >
            Designed specifically for clinics and medical teams to streamline HR operations
          </p>
        </motion.div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || FiZap;
            return (
              <motion.div
                key={idx}
                className="rounded-lg overflow-hidden"
                style={{ 
                  backgroundColor: colors.primaryColor3,
                  border: `1px solid ${colors.primaryColor2}`
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: colors.primaryColor2 }}
                    >
                      <IconComponent 
                        size={20} 
                        style={{ color: colors.primaryColor3 }} 
                      />
                    </div>
                    <h3 
                      className="font-semibold"
                      style={{ color: colors.primaryColor5 }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  {expandedFeature === idx ? (
                    <FiChevronUp style={{ color: colors.primaryColor5 }} />
                  ) : (
                    <FiChevronDown style={{ color: colors.primaryColor5 }} />
                  )}
                </button>

                <AnimatePresence>
                  {expandedFeature === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                      style={{ color: colors.primaryColor4 }}
                    >
                      <p className="mb-3">{feature.short}</p>
                      <div className="space-y-3">
                        {feature.full.map((paragraph, i) => (
                          <p key={i} className="text-sm">{paragraph}</p>
                        ))}
                      </div>
                      {feature.badge && (
                        <span
                          className="inline-block mt-3 px-2 py-1 text-xs font-bold rounded-full"
                          style={{ 
                            backgroundColor: `${colors.primaryColor1}30`,
                            color: colors.primaryColor5
                          }}
                        >
                          {feature.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((feature, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeIndex === idx
                    ? "text-white"
                    : "text-white hover:bg-white/10"
                }`}
                style={{
                  color: "black",
                  backgroundColor: activeIndex === idx ? colors.primaryColor1 : 'transparent',
                  border: `1px solid ${activeIndex === idx ? colors.primaryColor1 : colors.primaryColor3}`
                }}
              >
                {feature.title}
              </motion.button>
            ))}
          </div>

          <motion.div
            layout
            className="mx-auto max-w-4xl p-6 rounded-xl"
            style={{
              backgroundColor: colors.primaryColor3,
              border: `1px solid ${colors.primaryColor4}`,
              color: colors.primaryColor5
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-6">
              <div 
                className="p-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors.primaryColor1 }}
              >
                {(() => {
                  const IconComponent = iconMap[features[activeIndex].icon] || FiZap;
                  return (
                    <IconComponent 
                      size={24} 
                      style={{ color: colors.primaryColor3 }} 
                    />
                  );
                })()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: styles.headingFont }}
                  >
                    {features[activeIndex].title}
                  </h3>
                  {features[activeIndex].badge && (
                    <span
                      className="px-3 py-1 text-xs font-bold rounded-full ml-2"
                      style={{ 
                        backgroundColor: `${colors.primaryColor1}30`,
                        color: colors.primaryColor5
                      }}
                    >
                      {features[activeIndex].badge}
                    </span>
                  )}
                </div>
                
                <p className="mb-4" style={{ fontFamily: styles.subheadingFont }}>
                  {features[activeIndex].short}
                </p>

                <div className="space-y-4">
                  {features[activeIndex].full.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm"
                      style={{ color: colors.primaryColor4 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;