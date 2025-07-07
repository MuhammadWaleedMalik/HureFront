import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const Privacy = () => {
  const { t } = useTranslation();
  
  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }),
    hover: {
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  // Policy sections
  const policySections = [
    {
      title: t("1. Information We Collect"),
      content: t(`We may collect the following when you interact with HURE:
      • Full name, email address, and job title
      • Clinic details and employment history
      • Staff licenses and certifications
      • System usage data (e.g., logins, activities, timestamps)`),
      icon: t("📋")
    },
    {
      title: t("2. How We Use Your Information"),
      content: t(`Your data helps us:
      • Streamline HR workflows
      • Ensure compliance and licensing
      • Track performance and support staff
      • Deliver updates and feature improvements
      • Analyze service performance (anonymized where possible)`),
      icon: t("🔍")
    },
    {
      title: t("3. Data Sharing & Disclosure"),
      content: t(`We do not sell or rent your personal data.
      We may share data with trusted third-party providers for:
      • Digital contract signing
      • Credential verification
      • System integrations (under strict confidentiality agreements)`),
      icon: t("🤝")
    },
    {
      title: t("4. Data Security"),
      content: t(`We implement strict security measures, including:
      • End-to-end encryption
      • Two-factor authentication
      • Role-based access
      • Routine vulnerability assessments`),
      icon: t("🔒")
    },
    {
      title: t("5. Cookies & Tracking Technologies"),
      content: t(`We use cookies to:
      • Remember sessions
      • Track platform usage
      • Improve functionality
      You may control cookie settings through your browser or platform preferences.`),
      icon: t("🍪")
    },
    {
      title: t("6. User Rights & Choices"),
      content: t(`You have the right to:
      • View, update, or delete your personal information
      • Request data removal (admin-level access for clinic accounts)
      To exercise your rights, contact us directly.`),
      icon: t("👤")
    },
    {
      title: t("7. Compliance with Healthcare Regulations"),
      content: t(`HURE is designed with HIPAA, GDPR, and regional compliance in mind. We follow strict protocols for handling staff credentials, medical certifications, and personally identifiable information.
      • HURE complies with applicable data protection laws in jurisdictions where we operate, including Kenya's Data Protection Act, 2019. Where national frameworks are limited or evolving, we apply global best practices such as GDPR and HIPAA for data handling and security.`),
      icon: t("⚖️")
    },
    {
      title: t("8. Contact & Questions"),
      content: t(`For privacy concerns or data inquiries, contact our Data Protection Officer at support@gethure.com
      We respond to all requests within 15 days, in accordance with applicable laws.`),
      icon: t("📧")
    }
  ];

  return (
    <div className='mt-24' style={{ backgroundColor: styles.colorBg, minHeight: '100vh' }}>
        <title>{t(`Privacy Policy | ${websites[0].name}`)}</title>
        <meta name="description" content={t(`Privacy policy for ${websites[0].name} detailing how we collect and protect your data`)} />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 max-w-5xl"
        style={{ fontFamily: styles.text }}
      >
        {/* Header Section */}
        <motion.header 
          variants={itemVariants}
          custom={0}
          className="mb-16 text-center"
        >
          <motion.h1 
            className="text-5xl font-bold mb-6"
            style={{ color: styles.primaryColor1, fontFamily: styles.headings }}
            whileHover={{ scale: 1.02 }}
          >
            {t("Privacy Policy")}
          </motion.h1>
          <motion.p 
            className="text-xl"
            style={{ color: styles.colorGray600 }}
          >
            {t("Effective Date: June 9, 2025")}
          </motion.p>
        </motion.header>

        {/* Introductory Paragraph */}
        <motion.div 
          variants={itemVariants}
          custom={1}
          className="mb-12 p-8 rounded-2xl"
          style={{ 
            backgroundColor: styles.primaryColor1,
            boxShadow: styles.shadowMd
          }}
        >
          <p 
            className="text-lg leading-relaxed"
            style={{ color: styles.colorGray800 }}
          >
            {t(`HURE ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.`)}
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="grid gap-8">
          {policySections.map((section, index) => (
            <motion.section
              key={index}
              custom={index + 2}
              variants={itemVariants}
              className="p-8 rounded-xl relative overflow-hidden"
              style={{
                backgroundColor: styles.primaryColor3,
                borderLeft: `4px solid ${styles.primaryColor1}`,
                boxShadow: styles.shadowSm
              }}
              whileHover={{ 
                boxShadow: styles.shadowLg,
                borderLeftWidth: '6px'
              }}
              transition={{ 
                duration: styles.transitionNormal,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-start gap-6">
                <div 
                  className="text-3xl p-3 rounded-full flex-shrink-0"
                  style={{ 
                    backgroundColor: `${styles.primaryColor5}20`,
                    color: styles.primaryColor2
                  }}
                >
                  {section.icon}
                </div>
                <div>
                  <motion.h2 
                    className="text-2xl font-semibold mb-4"
                    style={{ 
                      color: styles.primaryColor5,
                      fontFamily: styles.subheadings
                    }}
                  >
                    {section.title}
                  </motion.h2>
                  <motion.p 
                    className="text-lg leading-relaxed whitespace-pre-line"
                    style={{ color: styles.colorGray700 }}
                  >
                    {section.content}
                  </motion.p>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer Section */}
        <motion.footer
          variants={itemVariants}
          custom={policySections.length + 2}
          className="mt-16 pt-12 text-center"
          style={{ borderTop: `1px solid ${styles.colorBorder}` }}
        >
          <motion.p 
            className="text-lg mb-4"
            style={{ color: styles.colorGray600 }}
          >
            {t("For any privacy concerns or data requests:")}
          </motion.p>
          <motion.a
            href="mailto:support@gethure.com"
            className="text-xl font-medium inline-block"
            style={{ color: styles.primaryColor1 }}
            whileHover={{ 
              scale: 1.05,
              color: styles.colorBlack
            }}
            transition={{ duration: 0.2 }}
          >
            support@gethure.com
          </motion.a>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p style={{ color: styles.colorGray500 }}>
              {t(`© ${new Date().getFullYear()} ${websites[0].name}. All rights reserved.`)}
            </p>
          </motion.div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Privacy; 