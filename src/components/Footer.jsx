import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  const colors = {
    linkedinBlue: "#0077B5",
    facebookBlue: "#4267B2",
    instagramPurple: "#E1306C"
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const links = {
    FAQs: "/faqs",
    Privacy: "/privacy",
    Terms: "/terms",
    "Demo Request": "/core",
    "About Us": "/aboutus",
    Pricing: "/pricing",
    "Customer Support": "/contact"
  };

  return (
    <motion.footer
      className="w-full h-full py-10 px-4 sm:px-8 lg:px-16"
      style={{
        backgroundImage: `linear-gradient(175deg, ${styles.primaryColor4} 0%, ${styles.primaryColor5} 100%)`,
        fontFamily: styles.text,
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      initial="hidden"
      animate="show"
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-0">
        
        {/* Logo + Title + Slogan */}
        <motion.div 
          className="flex flex-col items-center text-center gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-12 rounded-xl bg-white bg-opacity-10 p-2 shadow-lg backdrop-blur-md">
            <img 
              src={websites[0].logo} 
              alt={t("website logo")} 
              className="w-full h-full object-contain"
            />
          </div>

          <h2
            className="text-6xl  font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient( ${styles.primaryColor3})`,
              fontFamily: styles.headings
            }}
          >
            {websites[0].name}
          </h2>
          
          <p className="text-sm text-white opacity-80">{websites[0].slogan}</p>
        </motion.div>

        {/* Social Icons with Tooltips */}
        <div className="flex justify-center gap-6">
          {[{
            href: websites[0].linkedinaccount,
            icon: <FaLinkedin size={20} color={colors.linkedinBlue} />,
            bg: colors.linkedinBlue,
            label: 'LinkedIn'
          }, {
            href: websites[0].instagramaccount,
            icon: <FaInstagram size={20} color={colors.instagramPurple} />,
            bg: colors.instagramPurple,
            label: 'Instagram'
          }, {
            href: websites[0].facebookaccount,
            icon: <FaFacebook size={20} color={colors.facebookBlue} />,
            bg: colors.facebookBlue,
            label: 'Facebook'
          }].map(({ href, icon, bg, label }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full relative group"
              style={{ backgroundColor: `${bg}50` }}
              whileHover={{ y: -4, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon}
              <span className="absolute bottom-full mb-2 text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                {label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Link Grid */}
        <motion.div
          className="grid grid-cols-2 text-white sm:grid-cols-4 gap-4 justify-items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {Object.entries(links).map(([item, path], i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ y: -2, scale: 1.05 }}
              className="text-sm"
            >
              <Link
                to={path}
                className="hover:underline"
                style={{ color: styles.white }}
              >
                {t(item)}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: styles.primaryColor2 }}
        >
          <p style={{ color: styles.white }}>
            {t(`© ${new Date().getFullYear()} ${websites[0].name}. All rights reserved.`)}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;