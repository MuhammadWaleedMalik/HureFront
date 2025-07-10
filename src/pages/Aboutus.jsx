import { motion } from "framer-motion";
import { FaUsers, FaClipboardCheck, FaCalendarAlt, FaNetworkWired, FaUserMd, FaShieldAlt } from "react-icons/fa";
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';
import { Link } from "react-router-dom";

const AboutUs = () => {
  const services = [
    {
      icon: <FaUsers size={32} />,
      title: "HURE Core",
      description: "Comprehensive HR management system for healthcare teams"
    },
    { 
      icon: <FaUserMd size={32} />,
      title: "HURE Hire",
      description: "Healthcare-specific job board and recruitment tool"
    },
    {
      icon: <FaCalendarAlt size={32} />,
      title: "HURE Events",
      description: "Portal for health webinars, CPD sessions, and training"
    },
    {
      icon: <FaNetworkWired size={32} />,
      title: "HURE Connect",
      description: "Professional network for healthcare workers"
    },
    {
      icon: <FaClipboardCheck size={32} />,
      title: "Compliance Tools",
      description: "Automated documentation and tracking"
    },
    {
      icon: <FaShieldAlt size={32} />,
      title: "Secure Ecosystem",
      description: "All-in-one digital platform for healthcare HR"
    }
  ];

  return (
    <section 
      className="py-16 px-4 sm:px-8 lg:px-16"
      style={{ 
        backgroundColor: styles.primaryColor3,
        fontFamily: styles.text
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold italic mt-24 mb-4 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${styles.primaryColor1})`,
              fontFamily: styles.headings
            }}
          >
            About HURE Platform
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: styles.colorGray700 }}
          >
            Transforming Healthcare HR Management in Eastern Africa
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 
              className="text-2xl font-semibold mb-4"
              style={{ color: styles.primaryColor1 }}
            >
              Our Purpose
            </h3>
            <p 
              className="mb-4 leading-relaxed"
              style={{ color: styles.colorGray700 }}
            >
              HURE (Human Resource Ecosystem) is a <strong className="text-[green]">Human Capital Mangement platform</strong> specifically designed for healthcare teams and clinics in Eastern Africa.
            </p>
            <p 
              className="mb-6 leading-relaxed"
              style={{ color: styles.colorGray700 }}
            >
              We simplify <strong className="text-[green]">HR operations</strong> including hiring, compliance, retention, training, and professional networking — all in one secure digital ecosystem.
            </p>
            {/* <Link
              to={'/signup'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start px-6 py-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: styles.primaryColor2,
                color: styles.primaryColor1
              }}
            >
              Signup
            </Link> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl shadow-sm"
                style={{ 
                  backgroundColor: styles.primaryColor2,
                  border: `1px solid ${styles.colorGray200}`
                }}
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: `${styles.primaryColor1}80` }}
                >
                  {service.icon}
                </div>
                <h4 
                  className="font-semibold mb-1"
                  style={{ color: styles.primaryColor1}}
                >
                  {service.title}
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: styles.colorGray600 }}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: styles.primaryColor1 }}
          >
            Our Comprehensive Ecosystem
          </h3>
          
          <div className="space-y-6">
            {/* HURE Core */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: `${styles.primaryColor1}10` }}>
              <h4 className="text-xl font-semibold mb-3 flex items-center" style={{ color: styles.primaryColor1 }}>
                <FaUsers className="mr-2" /> HURE Core
              </h4>
              <p className="mb-3" style={{ color: styles.colorGray700 }}>
                The main HR management system with centralized tools for:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['HR automation', 'Employee management', 'Training tracking', 'Wellness tools', 'Compliance documentation'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span style={{ color: styles.colorGray600 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HURE Hire */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: `${styles.primaryColor1}10` }}>
              <h4 className="text-xl font-semibold mb-3 flex items-center" style={{ color: styles.primaryColor1 }}>
                <FaUserMd className="mr-2" /> HURE Hire
              </h4>
              <p className="mb-2" style={{ color: styles.colorGray700 }}>
                Healthcare-specific job board (Ksh.250/week per listing)
              </p>
              <ul className="space-y-1">
                {['Employers can post job listings', 'Jobseekers can browse and apply', 'Filters by location, role, and type', 'Simple jobseeker signup (requires approval)'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span style={{ color: styles.colorGray600 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HURE Events */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: `${styles.primaryColor1}10` }}>
              <h4 className="text-xl font-semibold mb-3 flex items-center" style={{ color: styles.primaryColor1 }}>
                <FaCalendarAlt className="mr-2" /> HURE Events
              </h4>
              <p style={{ color: styles.colorGray700 }}>
                Portal for health-related webinars, CPD sessions, and training
              </p>
            </div>

            {/* HURE Connect */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: `${styles.primaryColor1}10` }}>
              <h4 className="text-xl font-semibold mb-3 flex items-center" style={{ color: styles.primaryColor1 }}>
                <FaNetworkWired className="mr-2" /> HURE Connect
              </h4>
              <p className="mb-2" style={{ color: styles.colorGray700 }}>
                Professional network features:
              </p>
              <ul className="space-y-1">
                {['Create professional profiles', 'Find and connect with colleagues', 'Discussion board for community interaction', 'Future features: DMs, following system'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span style={{ color: styles.colorGray600 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-xl mb-12 text-center"
          style={{ 
            backgroundColor: `${styles.primaryColor1}70`,
            border: `1px solid ${styles.primaryColor1}`,
            boxShadow: `5px 5px 15px rgba(55, 90, 23, 0.3)`
          }}
        >
          <h3 
            className="text-xl md:text-2xl font-semibold mb-3"
            style={{ color: styles.colorPrimary }}
          >
            Ready to Transform Your Healthcare HR?
          </h3>
          <p 
            className="max-w-2xl mx-auto mb-6"
            style={{ color: styles.colorGray700 }}
          >
            Join Eastern Africa's premier healthcare HR ecosystem and streamline your operations today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: styles.primaryColor2,
                color: styles.primaryColor1,
                border: `1px solid ${styles.primaryColor1}`
              }}
            >
              View Pricing
            </Link>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: styles.primaryColor1 }}
          >
            Platform Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl shadow-sm"
                style={{ 
                  backgroundColor: styles.primaryColor2,
                  border: `1px solid ${styles.colorGray200}`
                }}
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                  style={{ backgroundColor: `${styles.primaryColor1}80` }}
                >
                  {service.icon}
                </div>
                <h4 
                  className="text-lg font-semibold mb-2"
                  style={{ color: styles.primaryColor1}}
                >
                  {service.title}
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: styles.colorGray600 }}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;