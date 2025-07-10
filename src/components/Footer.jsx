import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  const colors = {
    facebookBlue: "#4267B2",
    whatsappGreen: "#25D366"
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const footerLinks = {
    "Company": [
      { name: "About Us", path: "/aboutus" }
    ],
    "Product": [
      { name: "Core", path: "/core" },
      { name: "Hire", path: "/hire" },
      { name: "Events", path: "/event" },
      { name: "Connect", path: "/connect" }
    ],
    "Legal": [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" }
    ],
    "Support": [
      { name: "FAQs", path: "/faqs" },
      { name: "Contact Us", path: "/contact" },
    ]
  };

  // Format WhatsApp number by removing all non-digit characters
  const whatsappNumber = websites[0].contactnumber1.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <motion.footer
      className="w-full h-full py-12 px-4 sm:px-8 lg:px-16"
      style={{
        backgroundImage: `linear-gradient(175deg, ${styles.primaryColor4} 0%, ${styles.primaryColor5} 100%)`,
        fontFamily: styles.text,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      initial="hidden"
      animate="show"
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Logo + Title + Slogan */}
        <motion.div 
          className="flex flex-col items-center text-center gap-2 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-14 h-14 rounded-xl bg-white bg-opacity-10 p-2 shadow-lg flex items-center justify-center">
            <img 
              src={websites[0].logo} 
              alt={t("website logo")} 
              className="w-full h-full object-contain"
            />
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${styles.primaryColor1}, ${styles.primaryColor3})`,
              fontFamily: styles.headings
            }}
          >
            {websites[0].name}
          </h2>
          
          <p className="text-sm text-white opacity-80 max-w-md">{websites[0].slogan}</p>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {t(category)}
              </h3>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-sm text-white opacity-80 hover:opacity-100 hover:underline"
                    >
                      {t(link.name)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center gap-6 mt-4">
          <div className="flex justify-center gap-6">
            {[
              {
                href: websites[0].facebookaccount,
                icon: <FaFacebook size={20} />,
                bg: colors.facebookBlue,
                label: 'Facebook'
              },
              {
                href: whatsappUrl,
                icon: <FaWhatsapp size={20} />,
                bg: colors.whatsappGreen,
                label: 'WhatsApp'
              }
            ].map(({ href, icon, bg, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full relative group flex items-center justify-center"
                style={{ 
                  backgroundColor: `${bg}20`,
                  color: bg
                }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.1,
                  backgroundColor: `${bg}30`
                }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
                <span className="absolute bottom-full mb-2 text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {t(label)}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div 
            className="text-center text-xs mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: styles.white }}
          >
            <p>
              {t(`© ${new Date().getFullYear()} ${websites[0].name}. All rights reserved.`)}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;