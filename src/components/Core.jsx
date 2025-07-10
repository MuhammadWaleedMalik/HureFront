import React from 'react';
import { motion } from 'framer-motion';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';
import { Link } from 'react-router-dom';

const Core = () => {
  // Check if token exists in localStorage
  const isLoggedIn = localStorage.getItem('token');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mt-24 mx-auto p-8"
    >
      <motion.h1 
        className="text-4xl font-bold mb-6"
        style={{ 
          color: styles.primaryColor5,
          fontFamily: styles.headingFont 
        }}
      >
        {websites[0].name} Core
      </motion.h1>
      
      <motion.p 
        className="text-xl mb-8"
        style={{
          color: styles.primaryColor4,
          fontFamily: styles.subheadingFont
        }}
      >
        Ready to get started with {websites[0].name} Core?
      </motion.p>
      
      <motion.div 
        className="flex justify-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-md font-medium"
          style={{
            backgroundColor: styles.primaryColor1,
            color: styles.primaryColor3
          }}
        >
          Request a Demo
        </motion.button>
        
        {/* Only show Signup button if no token exists */}
        {!isLoggedIn && (
          <Link
            to="/signup" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-md font-medium"
            style={{
              backgroundColor: styles.primaryColor2,
              color: styles.primaryColor5
            }}
          >
            Join Now
          </Link>
        )}
      </motion.div>
      
      {/* Rest of your component remains the same */}
      <motion.div
        className="mt-16 flex flex-col md:flex-row items-center gap-8 text-left max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ... existing content ... */}
      </motion.div>
    </motion.div>
  );
};

export default Core;