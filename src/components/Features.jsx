import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCheckCircle, FiZap, FiLayers, FiCode, FiDatabase, FiLock, FiGlobe, FiBarChart2, FiSmartphone, FiServer, FiCloud, FiShield } from "react-icons/fi";
import styles from '../../styles/colors.module.scss';

// ======================
// FRAMER MOTION VARIANTS
// ======================
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleHover = {
  scale: 1.03,
  transition: { duration: 0.3 }
};

// ======================
// FEATURE ITEM COMPONENT
// ======================
const FeatureItem = ({ feature, colors, index }) => {
  const iconComponents = {
    check: <FiCheckCircle size={24} />,
    zap: <FiZap size={24} />,
    layers: <FiLayers size={24} />,
    code: <FiCode size={24} />,
    database: <FiDatabase size={24} />,
    lock: <FiLock size={24} />,
    globe: <FiGlobe size={24} />,
    chart: <FiBarChart2 size={24} />,
    mobile: <FiSmartphone size={24} />,
    server: <FiServer size={24} />,
    cloud: <FiCloud size={24} />,
    shield: <FiShield size={24} />
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={scaleHover}
      className="flex flex-col p-6 rounded-xl shadow-lg h-full"
      style={{
        backgroundColor: colors.light,
        borderLeft: `4px solid ${colors.accent}`,
        color: colors.dark
      }}
    >
      <div className="flex items-center mb-4">
        <div 
          className="p-3 rounded-full mr-4"
          style={{ 
            backgroundColor: `${colors.accent}20`, // 20% opacity
            color: colors.accent
          }}
        >
          {iconComponents[feature.icon] || iconComponents.check}
        </div>
        <h3 className="text-xl font-semibold">{feature.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      {feature.badge && (
        <div className="mt-auto">
          <span 
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{ 
              backgroundColor: `${colors.primary}20`,
              color: colors.primary
            }}
          >
            {feature.badge}
          </span>
        </div>
      )}
    </motion.div>
  );
};

// ======================
// FEATURES COMPONENT
// ======================
const Features = ({ colors }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Feature data array


  const features = [
  {
    title: "Clinic Onboarding Made Easy",
    description: "Quickly set up your clinic profile in just a few clicks. HURE’s user-friendly onboarding wizard walks you through essential configurations — from clinic name and location to services offered. The process requires no tech expertise, so healthcare teams can go live in minutes. Whether you’re a solo practice or a multi-location network, setup scales effortlessly to your clinic’s needs. Say goodbye to long IT onboarding sessions.",
    icon: "zap",
    badge: "Popular"
  },
  {
    title: "Role-Based Staff Management",
    description: "Invite doctors, nurses, HR admins, and support staff with personalized roles and access. Assign specific responsibilities, manage credentials, and control who sees what across the platform. Staff can be grouped by departments or units, with clear visibility into schedules, tasks, and compliance records. Keep your workforce organized, accountable, and structured, without endless spreadsheets or manual recordkeeping.",
    icon: "users"
  },
  {
    title: "Automated HR Workflow Engine",
    description: "Automate your most time-consuming HR tasks like onboarding checklists, time tracking, leave management, and contract approvals. HURE’s workflow engine ensures that every task is executed consistently and on time — from digital document signing to automated reminders for compliance updates. Reduce the burden on HR teams and allow staff to focus on patient care while the system handles the paperwork.",
    icon: "repeat"
  },
  {
    title: "Integrated Credential & License Compliance",
    description: "Ensure staff certifications, licenses, and continuing education are always up to date. HURE monitors renewal dates and sends proactive alerts to both HR and individuals. Store all documentation securely and access it instantly during audits or inspections. With region-specific rules and automation for reminders, your clinic stays legally compliant and professionally accredited without added stress.",
    icon: "shield"
  },
  {
    title: "HURE Community & Ecosystem",
    description: "Connect with the broader healthcare HR ecosystem through job boards, training sessions, and professional networking. Clinics can post openings, join virtual training events, and collaborate with healthcare professionals — all within the platform. Build your reputation, grow your team, and stay current with industry trends while fostering community and professional development at every level.",
    icon: "network",
    badge: "New"
  },
  {
    title: "Built-In Training & Development Tools",
    description: "Create, assign, and track staff training programs directly within HURE. Upload your own materials or use industry-standard modules. Monitor staff progress, issue certifications, and ensure knowledge is continuously refreshed. This empowers healthcare teams to stay updated on protocols, safety standards, and patient care best practices — all while tracking progress in real-time.",
    icon: "book"
  },
  {
    title: "Smart Dashboards & Reporting",
    description: "Gain visibility into clinic performance and HR metrics through intelligent dashboards. Track attendance, task completion, training scores, and more. HURE’s analytics engine delivers visual reports for compliance audits, staff reviews, and executive decision-making. Customizable charts and data exports give you total control over how you analyze and present insights to stakeholders.",
    icon: "bar-chart"
  },
  {
    title: "Secure, Scalable SaaS Infrastructure",
    description: "Built on enterprise-grade cloud infrastructure, HURE ensures your clinic’s data is protected with end-to-end encryption and GDPR-compliant practices. Role-based permissions and secure backups ensure peace of mind. Whether you're managing 5 or 500 employees, our system scales effortlessly with zero downtime. Focus on care, knowing your operations are powered by a secure foundation.",
    icon: "lock"
  }
];

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.dark }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.light }}>
            Powerful Features
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureItem 
              key={index} 
              feature={feature} 
              colors={colors} 
              index={index} 
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg" style={{ color: colors.light }}>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;