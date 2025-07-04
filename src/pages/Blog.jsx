import { motion } from "framer-motion";
import { FaCogs, FaUserMd, FaCalendarCheck, FaUsers } from "react-icons/fa";
import styles from '../../styles/colors.module.scss';
import { Link } from "react-router-dom";

const Blog = () => {
  const hureFeatures = [
    {
      icon: <FaCogs size={32} />,
      title: "HURE Core",
      description: "A centralized HR system built specifically for healthcare facilities."
    },
    {
      icon: <FaUserMd size={32} />,
      title: "HURE Hire",
      description: "Easily post jobs and attract top-tier healthcare professionals."
    },
    {
      icon: <FaCalendarCheck size={32} />,
      title: "HURE Events",
      description: "Promote and manage CPD events, workshops, and training sessions."
    },
    {
      icon: <FaUsers size={32} />,
      title: "HURE Connect",
      description: "Foster a professional healthcare network through profiles and forums."
    }
  ];

  return (
    <section 
      className="py-16 px-4 sm:px-8 lg:px-16"
      style={{ 
        backgroundColor: "#F4F1ED", // Sand background
        fontFamily: "Inter, sans-serif"
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
            className="text-3xl md:text-4xl font-bold italic mt-24 mb-4"
            style={{ 
              color: "#8D6E63", // Clay Brown
              fontFamily: "Poppins, sans-serif"
            }}
          >
            HURE Blog
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "#607D8B" }} // Slate Blue
          >
            Insights, updates, and innovations in smarter HR for healthcare teams.
          </p>
        </motion.div>

        {/* About HURE Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold mb-4" style={{ color: "#8D6E63" }}>
              What is HURE?
            </h3>
            <p className="mb-4 leading-relaxed" style={{ color: "#263238" }}>
              <strong>HURE</strong> is a secure, all-in-one HR platform designed specifically for clinics and healthcare organizations in emerging markets.
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: "#263238" }}>
              From hiring to compliance, staff engagement to professional development, HURE simplifies everything so your teams can focus on care.
            </p>
            <Link
              to="/contact"
              className="self-start px-6 py-2 rounded-lg font-medium"
              style={{ 
                backgroundColor: "#8D6E63",
                color: "#F4F1ED"
              }}
            >
              Request a Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {hureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl shadow-sm"
                style={{ 
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #DDD"
                }}
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: "#8E9B97" }} // Olive Green
                >
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-1" style={{ color: "#8D6E63" }}>
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: "#607D8B" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-xl mb-12 text-center"
          style={{ 
            backgroundColor: "#8D6E63",
            color: "#FFFFFF",
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`
          }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3">
            Join the Movement Toward Smarter Healthcare HR
          </h3>
          <p className="max-w-2xl mx-auto mb-6">
            Learn how HURE empowers clinics and hospitals to streamline HR and improve team well-being.
          </p>
          <Link
            to="/"
            className="px-6 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: "#F4F1ED",
              color: "#8D6E63"
            }}
          >
            Explore Features
          </Link>
        </motion.div>

        {/* Grid of Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl shadow-sm"
              style={{ 
                backgroundColor: "#FFFFFF",
                border: "1px solid #DDD"
              }}
            >
              <div 
                className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                style={{ backgroundColor: "#8E9B97" }}
              >
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: "#8D6E63" }}>
                {feature.title}
              </h4>
              <p className="text-sm" style={{ color: "#607D8B" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
