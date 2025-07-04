import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ApproachFlowchart from '../components/Approach.jsx';
import Features from "../components/Features.jsx";

import FAQs from   '../pages/FAQs.jsx';
import RequestDemo from "../components/RequestDemo.jsx";
import { useState } from "react";

import SignupModal from '../components/SignupModal.jsx';

import styles from '../../styles/colors.module.scss';

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

const user=localStorage.getItem('token')

// ======================
// REUSABLE COMPONENTS
// ======================
const AnimatedSection = ({ children, variants, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

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


const HeroSection = ({ gradientBackground, setIsDemoModalOpen }) => {
  const [isSignupModalOpen, setIsSignupModalOpen] = React.useState(false);

  return (
    <>
      <section 
        className="min-h-screen flex flex-col justify-center items-center"
        style={gradientBackground}
      >
        <AnimatedSection variants={fadeIn} className="text-center">
          <h1 className="text-6xl font-bold mb-24 mt-12" style={{ color: "#F5F5F5", fontFamily: "New Times Roman" }}>
            
          </h1>
          <p className="text-2xl mb-8" style={{ color: "#D1D5DB" }}>
            Healthcare Unified Resource Engine
          </p>
          <p className="text-2xl mr-24 ml-24 mb-8" style={{ color: "#D1D5DB" }}>
            HURE is a purpose-built digital engine for healthcare organizations. Designed for clinics, hospitals, and medical teams, it centralizes recruitment, staff management, credential tracking, training, and compliance, all in one intuitive SaaS platform tailored to East African healthcare systems.
          </p>
          
          <div className="flex justify-end mr-24 mt-12 gap-4">
            <motion.button
               onClick={() => {
    window.location.href = '/core';
  }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg text-lg font-semibold transition-all"
              style={{ backgroundColor: "#2F4F6F", color: "#FFFFFF" }}
            >
              View Platform Demo
            </motion.button>
            {!user && ( // Changed from {user && ...} to {!user && ...}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="mt-1"
  >
    <motion.button
      onClick={() => setIsSignupModalOpen(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 rounded-lg text-lg font-semibold transition-all"
      style={{ backgroundColor: "#7A4F41", color: "#FFFFFF" }}
    >
      {'Sign Up Your Clinic'}
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
const WebsiteInfoSection = ({  colors }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.dark }}>
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="flex flex-col md:flex-row mt-12 mb-12 items-center gap-6 p-1 md:p-8 rounded-xl shadow-lg max-w-[1000px] mx-auto"
        style={{ 
          backgroundColor: colors.light,
          borderColor: colors.accent,
          color: colors.dark
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0"
        >
          <img 
            
            src="/images/logo.png"
            alt="Website Logo"
            className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shadow-md"
            loading="lazy"
          />
        </motion.div>

        <div className="flex-1 space-y-4">
          <motion.h1
            initial={{ x: -10, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                x: 0, 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.4 }
              }
            }}
            className="text-3xl md:text-4xl font-bold"
            style={{ 
              background: `linear-gradient(to right, ${colors.accent}, ${colors.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: styles.headingFont
            }}
          >
            Welcome To Hure
          </motion.h1>

          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                x: 0, 
                opacity: 1,
                transition: { delay: 0.4, duration: 0.4 }
              }
            }}
            style={{ fontFamily: styles.text }}
            className="text-lg md:text-xl"
          >
        HURE is a comprehensive Human Capital SaaS platform designed specifically for the unique needs of healthcare organizations, clinics, and medical professionals. It serves as an all-in-one digital hub that brings together everything a healthcare HR department needs — from recruitment and onboarding to compliance, training, and team engagement.
                  <br/><br/>
        Built with a deep understanding of the healthcare industry's operational challenges, HURE simplifies and automates key HR processes, allowing clinical teams to focus more on care delivery and less on paperwork.  </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

// ======================
// PAGE 3: SLIDER SECTION
// ======================
const SliderSection = ({ colors }) => {
  const sliderItems = [
    { text: "Human Capital SaaS for Clinics", delay: 0.2 },
    { text: "Automation.", delay: 0.3 },
    { text: "HR Compilance.", delay: 0 },
    { text: "Staff Welness", delay: 0.6 },
    { text: "Training Tracker", delay: 0.2 },
    { text: "Elevate Every Day", delay: 0.4 },
  ];

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center" style={{ 
      backgroundColor: colors.dark 
    }}>
      {sliderItems.map((strip, i) => (
        <motion.div
          key={i}
          initial={{ x: i % 2 === 0 ? "-100vw" : "100vw", rotate: Math.random() * 30 - 15 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1.5, delay: strip.delay }}
          className="absolute w-[250%] h-12 font-bold flex items-center justify-center transform rotate-45 border-dashed border-4 shadow-lg"
          style={{ 
            top: `${30 + i * 15}%`,
            backgroundColor: colors.light,
            color: colors.dark,
            borderColor: colors.accent,
            fontFamily: styles.text
          }}
        >
          {strip.text}
        </motion.div>
      ))}
    </section>
  );
};

// ======================
// PAGE 4: HOW IT WORKS SECTION
// ======================
const HowItWorksSection = ({ colors }) => {
  const steps = [
    {
      number: "01",
      title: "Sign Up Your Clinic",
      description: "Create your HURE account and clinic profile in minutes.",
      bgColor: colors.primary
    },
    {
      number: "02",
      title: "Add Your Team",
      description: "Invite healthcare staff and assign roles like HR Admin, Doctor, or Nurse.",
      bgColor: colors.accent
    },
    {
      number: "03",
      title: "Automate HR Tasks",
      description: "Use HURE Core to manage time tracking, leave, contracts, and compliance — all in one dashboard.",
      bgColor: colors.secondary
    },
    {
      number: "04",
      title: "Explore the HURE Ecosystem",
      description: "Post jobs, host or attend training, and connect with professionals — all through one login.",
      bgColor: colors.primary
    }
  ];

  return (
    <section className="py-12 min-h-screen flex items-center" style={{ backgroundColor: colors.light }}>
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12" style={{ color: colors.dark }}>How it works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-white p-6 w-72 rounded-md shadow-sm" style={{ borderColor: colors.accent }}>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="text-white text-lg font-bold w-12 h-12 rounded-full flex items-center justify-center shadow" style={{ backgroundColor: step.bgColor }}>
                  {step.number}
                </div>
              </div>
              <h3 className="mt-8 text-xl font-medium" style={{ color: colors.dark }}>{step.title}</h3>
              <p className="mt-2" style={{ color: colors.dark }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};





const Home = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const colors = {
    primary: styles.primaryColor1,
    secondary: styles.primaryColor2,
    light: styles.primaryColor3,
    accent: styles.primaryColor4,
    dark: styles.primaryColor5,
  };

  const gradientBackground = {
    background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.dark} 100%)`
  };

  return (
    <div style={{ backgroundColor: colors.dark, color: colors.light, fontFamily: styles.headingFont }}>
      <HeroSection 
        
        colors={colors} 
        gradientBackground={gradientBackground} 
        setIsDemoModalOpen={setIsDemoModalOpen}
      />
      <WebsiteInfoSection  colors={colors} />
      <ApproachFlowchart colors={colors} />
      <HowItWorksSection colors={colors} />
      <Features colors={colors} />
      <FAQs />
      
      <RequestDemo 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
