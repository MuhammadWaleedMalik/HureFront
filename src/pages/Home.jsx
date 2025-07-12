import React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ApproachFlowchart from '../components/Approach.jsx';
import Features from "../components/Features.jsx";
import RequestDemo from "../components/RequestDemo.jsx";
import { useState } from "react";
import SignupModal from '../components/SignupModal.jsx';
import styles from '../../styles/colors.module.scss';

import {
  FiUserPlus,
  FiUsers,
  FiSettings,
  FiGlobe
} from "react-icons/fi";
import FAQs from "./FAQs.jsx";
import HomePricing from "./HomePricing.jsx";

// ======================
// FRAMER MOTION VARIANTS
// ======================
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const rotate = {
  hidden: { opacity: 0, rotate: -90 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const user = localStorage.getItem('token');

// ======================
// REUSABLE COMPONENTS
// ======================
const AnimatedSection = ({ children, variants, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ======================
// PAGE 1: HERO SECTION
// ======================
const HeroSection = ({ colors, setIsDemoModalOpen }) => {
  const [isSignupModalOpen, setIsSignupModalOpen] = React.useState(false);

  return (
    <>
      <section 
        className="h-full mt-24 flex flex-col justify-center items-center px-4 py-16 md:py-0"
        style={{ backgroundColor: colors.primaryColor3 }}
      >
        <AnimatedSection variants={fadeIn} className="text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-3" style={{ color: colors.primaryColor1, fontFamily: "New Times Roman" }}>
            HURE
          </h1>
          <p className="text-xl md:text-2xl mb-6" style={{ color: colors.primaryColor2 }}>
            A Unified HR Ecosystem, Built for Healthcare Teams
          </p>
          <p className="text-lg md:text-xl mb-8" style={{ color: colors.primaryColor1 }}>
            HURE is a unified platform designed specifically for healthcare organizations and medical professionals, 
            to manage their HR needs efficiently and effectively.
            Utilized for recruitment, onboarding, compliance, training, and team engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <motion.button
              onClick={() => {
                window.location.href = '/demo.gethure.com';
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg text-lg font-semibold transition-all"
              style={{ backgroundColor: colors.primaryColor5, color: "#FFFFFF" }}
            >
              Watch Demo
            </motion.button>
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.button
                  onClick={()=>{window.location.href='/pricing'}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg text-lg font-semibold transition-all"
                  style={{ backgroundColor: colors.primaryColor2, color: "#FFFFFF" }}
                >
                  Join Now
                </motion.button>
              </motion.div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <SignupModal 
          isOpen={isSignupModalOpen} 
          onClose={() => setIsSignupModalOpen(false)} 
        />
      )}
    </>
  );
};

// ======================
// PAGE 2: WEBSITE INFO SECTION
// ======================
const WebsiteInfoSection = ({ colors }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="py-12 md:py-24 px-4 md:px-8"
      style={{ backgroundColor: colors.primaryColor3 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image - Order changes on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: { delay: 0.2, duration: 0.6 },
            },
          }}
          className="order-2 md:order-1"
        >
          <img
            src="/images/landingpage.png"
            alt="HURE Platform"
            className="w-full rounded-lg shadow-xl object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Text Content */}
        <div className="space-y-4 order-1 md:order-2">
          <motion.h1
            initial={{ x: -10, opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                x: 0,
                opacity: 1,
                transition: { delay: 0.3, duration: 0.4 },
              },
            }}
            className="text-4xl md:text-5xl font-bold italic leading-snug"
            style={{
              background: `linear-gradient(to right, ${colors.primaryColor4}, ${colors.primaryColor5})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: '#336573',
              fontFamily: styles.headingFont,
            }}
          >
            About H U R E
          </motion.h1>

          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                x: 0,
                opacity: 1,
                transition: { delay: 0.5, duration: 0.4 },
              },
            }}
            className="text-base md:text-lg text-[#336573] leading-relaxed"
            style={{ fontFamily: styles.text }}
          >
            Healthcare Unified Resource Engine (HURE) is a Human Capital Management platform purpose-built for healthcare organizations across the region. We exist to help clinics, hospitals, and health networks manage their teams more efficiently, from recruitment and onboarding to shift scheduling, compliance, and continuous engagement.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// ======================
// PAGE 4: HOW IT WORKS SECTION
// ======================
const HowItWorksSection = ({ colors }) => {
  const [openStep, setOpenStep] = useState(null);

  const steps = [
    {
      number: "01",
      title: "Hure Core",
      description: "Manage your team, policies, and compliance—all in one place.",
      bgColor: colors.primaryColor1,
      icon: <FiUserPlus size={24} className="text-white" />
    },
    {
      number: "02",
      title: "Hure Hire",
      description: "Post jobs and manage healthcare recruitment seamlessly.",
      bgColor: colors.primaryColor4,
      icon: <FiUsers size={24} className="text-white" />
    },
    {
      number: "03",
      title: "Hure Events",
      description: "Plan and attend healthcare-specific trainings & conferences.",
      bgColor: colors.primaryColor2,
      icon: <FiSettings size={24} className="text-white" />
    },
    {
      number: "04",
      title: "HURE Connect",
      description: "Build your professional healthcare network.",
      bgColor: colors.primaryColor1,
      icon: <FiGlobe size={24} className="text-white" />
    }
  ];

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <section
      className="py-12 px-4"
      style={{ backgroundColor: colors.primaryColor3 }}
    >
      <div className="container mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12"
          style={{ color: colors.primaryColor5 }}
        >
          Explore HURE Ecosystem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="relative bg-white p-6 rounded-md shadow-md cursor-pointer hover:shadow-lg transition duration-300 min-h-[200px] flex flex-col justify-start"
              style={{ borderColor: colors.primaryColor4 }}
              onClick={() => toggleStep(index)}
            >
              {/* Circle Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow"
                  style={{ backgroundColor: step.bgColor }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                className="mt-8 text-xl font-medium mb-4"
                style={{ color: colors.primaryColor5, textDecoration: 'underline' }}
              >
                {step.title}
              </h3>

              {/* Description (Expandable) */}
              <AnimatePresence initial={false}>
                {openStep === index && (
                  <motion.p
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm md:text-base"
                    style={{ color: colors.primaryColor5 }}
                  >
                    {step.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ======================
// TESTIMONIAL SECTION
// ======================
const TestimonialSection = ({ colors }) => {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: colors.primaryColor3 }}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#9B7C70' }}>
          Why Healthcare Teams Love HURE
        </h1>
        
        <div className="space-y-4">
          <p className="text-lg md:text-xl" style={{ color: colors.primaryColor5 }}>
            ✅ "No more manual license tracking"
          </p>
          <p className="text-lg md:text-xl" style={{ color: colors.primaryColor5 }}>
            ✅ "It helped our HR cut paperwork by 70%"
          </p>
          <p className="text-lg md:text-xl" style={{ color: colors.primaryColor5 }}>
            ✅ "HR software built for healthcare, not corporate"
          </p>
        </div>
        
        <div className="mt-8">
          <p className="text-lg md:text-xl mb-4" style={{ color: colors.primaryColor5 }}>
            ✔️ Signing up to HURE Core unlocks all ecosystem modules.
          </p>
          <p className="text-lg md:text-xl" style={{ color: colors.primaryColor5 }}>
            ✔️ Prefer just one? Hire, Events, and Connect are also available as a standalone subscription.
          </p>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const colors = {
    primaryColor1: styles.primaryColor1,
    primaryColor2: styles.primaryColor2,
    primaryColor3: styles.primaryColor3,
    primaryColor4: styles.primaryColor4,
    primaryColor5: styles.primaryColor5,
  };

  return (
    <div
      className="flex overflow-hidden flex-col"
    style={{ backgroundColor: colors.primaryColor3, color: colors.primaryColor3, fontFamily: styles.headingFont }}>
      <HeroSection 
        colors={colors} 
        setIsDemoModalOpen={setIsDemoModalOpen}
      />
      <WebsiteInfoSection colors={colors} />
      <HowItWorksSection colors={colors} />
      <TestimonialSection colors={colors} />
      <ApproachFlowchart colors={colors} />
      <HomePricing colors={colors} />
      <Features colors={colors} />
      <RequestDemo 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
};

export default Home;