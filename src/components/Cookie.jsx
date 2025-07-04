import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Cookie = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-[#263238] text-[#F4F1ED] shadow-xl border-t border-[#8E9B97]"
        >
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-[#8D6E63] font-heading"
                whileHover={{ scale: 1.02 }}
              >
                {t("Cookie Notice for HURE Users")}
              </motion.h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-semibold text-[#F4F1ED] font-subheading">
                    {t("About HURE")}
                  </h3>
                  <p className="text-[#F4F1ED] font-text">
                    {t("HURE is a healthcare-focused HR platform offering secure and intelligent staff management solutions. Our mission is to streamline healthcare operations while protecting data integrity and privacy.")}
                  </p>
                  <ul className="space-y-2 pl-5">
                    {[
                      { service: t('Workforce Management'), desc: t('Efficient scheduling, credentials tracking, and compliance checks') },
                      { service: t('Secure Data'), desc: t('We prioritize security in all healthcare HR records and transactions') },
                      { service: t('Automation'), desc: t('Reduce manual HR tasks using intelligent process flows') },
                      { service: t('Privacy-Centered'), desc: t('Full GDPR & HIPAA compliance with all user data') }
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="py-2 border-b border-[#8E9B97] text-[#F4F1ED] font-text"
                        whileHover={{ 
                          x: 5,
                          color: '#8E9B97'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <strong className="text-[#8D6E63]">{item.service}:</strong> {item.desc}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-semibold text-[#F4F1ED] font-subheading">
                    {t("Cookie Usage at HURE")}
                  </h3>
                  <p className="text-[#F4F1ED] font-text">
                    {t("HURE uses cookies to optimize your user experience, enable secure access, and understand engagement analytics. Cookies help us provide a seamless, personalized, and secure experience across our platform.")}
                  </p>
                  <p className="text-[#F4F1ED] font-text">
                    {t("By continuing to use HURE, you consent to our cookie policy. You may manage or disable cookies via your browser settings at any time. Essential cookies are required for core platform functionality.")}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <motion.button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-[#8D6E63] text-white font-medium rounded-lg hover:bg-[#7b5f55] transition-colors duration-200 font-heading"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 4px 14px rgba(141, 110, 99, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("Accept Cookies")}
                </motion.button>
                <motion.button
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-3 bg-[#607D8B] text-white font-medium rounded-lg hover:bg-[#546E7A] transition-colors duration-200 font-heading"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 4px 14px rgba(96, 125, 139, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("Decline")}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cookie;
