import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const Terms = () => {
  const { t } = useTranslation();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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
      y: -5,
      transition: { duration: 0.3 }
    }
  };
const sections = [
  {
    title: t("1. Acceptance of Terms"),
    content: t(`By accessing or using any features provided by HURE, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part, you may not use our platform or services.`),
    icon: t("📝")
  },
  {
    title: t("2. Services Provided"),
    content: t("HURE offers SaaS-based HR automation tools designed specifically for the healthcare industry, including credential tracking, scheduling, onboarding, and performance management. Services may evolve with feature releases and user feedback."),
    icon: t("🛠️")
  },
  {
    title: t("3. Intellectual Property"),
    content: t("All platform content, software, and materials are the intellectual property of HURE. Clients receive a non-transferable license to use the platform. Custom features developed during contracts remain property of HURE unless otherwise agreed."),
    icon: t("🔒")
  },
  {
    title: t("4. Payment Terms"),
    content: t("Subscription fees are billed monthly or annually. Custom development or enterprise features may require upfront payment. Late payments may result in service suspension. All transactions are in USD unless specified."),
    icon: t("💳")
  },
  {
    title: t("5. Confidentiality"),
    content: t("HURE upholds strict confidentiality regarding client, staff, and healthcare data. Information is only accessed internally to support and improve services, and never shared without explicit permission."),
    icon: t("🤫")
  },
  {
    title: t("6. Liability Limitations"),
    content: t("HURE’s liability is limited to the value of the active subscription or service contract. We are not responsible for indirect, incidental, or consequential damages arising from use of our services."),
    icon: t("⚖️")
  },
  {
    title: t("7. Revisions & Refunds"),
    content: t("Plan changes or feature enhancements may be requested. Refunds for prepaid services are not guaranteed and are evaluated case-by-case. Refunds on development work are subject to milestone status."),
    icon: t("🔄")
  },
  {
    title: t("8. Termination"),
    content: t("You may cancel your subscription at any time via your account portal. HURE reserves the right to terminate services for violations of these terms, with or without prior notice."),
    icon: t("🚪")
  },
  {
    title: t("9. Governing Law"),
    content: t("These Terms shall be governed by and construed under the laws of your operating region, unless otherwise agreed in writing. Any disputes will be resolved in the relevant jurisdiction’s courts."),
    icon: t("🏛️")
  },
  {
    title: t("10. Changes to Terms"),
    content: t("HURE may modify these Terms occasionally. Users will be notified of material changes via email or platform notice. Continued use implies acceptance of the updated terms."),
    icon: t("🔄")
  }
];


  return (
    <div className='mt-24' style={{ backgroundColor: styles.colorBg, minHeight: '100vh' }}>
        <title>{t(`Terms & Conditions | ${websites[0].name}`)}</title>
        <meta name="description" content={t(`Legal terms for ${websites[0].name} software development services`)} />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 max-w-5xl"
        style={{ fontFamily: styles.text }}
      >
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
            {t("Terms & Conditions")}
          </motion.h1>
          <motion.p 
            className="text-xl"
            style={{ color: styles.colorGray600 }}
          >
            {t("Last Updated:")} {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </motion.header>

        <motion.div 
          variants={itemVariants}
          custom={1}
          className="mb-12 p-8 rounded-2xl"
          style={{ 
            backgroundColor: styles.primaryColor2,
            boxShadow: styles.shadowMd
          }}
        >
          <p 
            className="text-lg leading-relaxed"
            style={{ color: styles.colorGray800 }}
          >
            {t(`These Terms and Conditions govern your use of our services. By engaging ${websites[0].name} for any project, you agree to these terms in full. Please read them carefully.`)}
          </p>
        </motion.div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              custom={index + 2}
              variants={itemVariants}
              className="p-8 rounded-xl relative overflow-hidden"
              style={{
                backgroundColor: styles.primaryColor3,
                borderLeft: `4px solid ${styles.primaryColor3}`,
                boxShadow: styles.shadowSm
              }}
              whileHover={{ 
                boxShadow: styles.shadowLg,
                borderLeft: `6px solid ${styles.primaryColor1}`
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
                    backgroundColor: `${styles.primaryColor1}20`,
                    color: styles.primaryColor3
                  }}
                >
                  {section.icon}
                </div>
                <div>
                  <motion.h2 
                    className="text-2xl font-semibold mb-4"
                    style={{ 
                      color: styles.primaryColor1,
                      fontFamily: styles.subheadings
                    }}
                  >
                    {section.title}
                  </motion.h2>
                  <motion.p 
                    className="text-lg leading-relaxed"
                    style={{ color: styles.colorGray700 }}
                  >
                    {section.content}
                  </motion.p>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.footer
          variants={itemVariants}
          custom={sections.length + 2}
          className="mt-16 pt-12 text-center"
          style={{ borderTop: `1px solid ${styles.colorBorder}` }}
        >
          <motion.p 
            className="text-lg mb-4"
            style={{ color: styles.colorGray600 }}
          >
            {t("For questions about these Terms, contact us at:")}
          </motion.p>
          <motion.a
            href={`mailto:${websites[0].contactwebsite}`}
            className="text-xl font-medium inline-block"
            style={{ color: styles.primaryColor1 }}
            whileHover={{ 
              scale: 1.05,
              color: styles.colorBlack
            }}
            transition={{ duration: 0.2 }}
          >
            {websites[0].contactwebsite}
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

export default Terms;