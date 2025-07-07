import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from '../../styles/colors.module.scss';

const ApproachFlowchart = ({ colors }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const steps = [
    {
      title: "Sign Up Your Clinic",
      description: "Create your HURE account and clinic profile in minutes.",
      icon: "📝",
    },
    {
      title: "Add Your Team",
      description: "Support your team with role-specific access and permissions.",
      icon: "👥",
    },
    {
      title: "Automate HR Tasks",
      description: "Use HURE Core to standardize HR workflows.",
      icon: "⚙️",
      services: [
        "Time Tracking",
        "Leave Management",
        "Digital Contracts",
        "HR Compliance",
      ],
    },
    {
      


      title: "HURE Connect",
      description: "Build your professional healthcare network.",
      icon: "🌐",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.primaryColor3 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-4xl font-bold sm:text-5xl mb-4"
            style={{ color: colors.primaryColor5, fontFamily: styles.headingFont }}
          >
            How HURE Works
          </h1>
          <p 
            className="text-xl"
            style={{ color: colors.primaryColor2, fontFamily: styles.subheadingFont }}
          >
            A simple, streamlined process for healthcare HR management
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-1/2 top-0 h-full w-1 transform -translate-x-1/2"
            style={{ backgroundColor: colors.primaryColor4 }}
          ></div>

          {/* Timeline items */}
          <div className="space-y-0 ">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative pl-8 pr-8 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                style={{ maxWidth: '500px' }}
              >
                {/* Timeline dot */}
                <div 
                  className={`absolute top-5 w-8 h-8 text-center rounded-full ${index % 2 === 0 ? '-right-2' : '-left-2'}`}
                  style={{ backgroundColor: colors.primaryColor1 }}
                
                >
                  {index+1}
                </div>

                {/* Timeline card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`p-6 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ${expandedIndex === index ? 'shadow-md' : 'hover:shadow-md'}`}
                  style={{ 
                    backgroundColor: colors.primaryColor3,
                    border: `1px solid ${colors.primaryColor4}`,
                  }}
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-start">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4"
                      style={{ 
                        backgroundColor: colors.primaryColor1,
                        color: colors.primaryColor3
                      }}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: colors.primaryColor5, textDecoration : 'underline',fontFamily: styles.headingFont }}
                      >
                        {step.title}
                      </h3>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: expandedIndex === index ? 'auto' : 0,
                          opacity: expandedIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <p 
                            className="mb-4"
                            style={{ color: colors.primaryColor4, fontFamily: styles.subheadingFont }}
                          >
                            {step.description}
                          </p>
                          
                          {step.services && (
                            <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.primaryColor4 }}>
                              <h4 
                                className="text-sm font-semibold mb-2"
                                style={{ color: colors.primaryColor4 }}
                              >
                                Services Included:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {step.services.map((service, i) => (
                                  <motion.span
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: expandedIndex === index ? 1 : 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                                    style={{ 
                                      backgroundColor: colors.primaryColor2,
                                      color: colors.primaryColor3
                                    }}
                                  >
                                    {service}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default ApproachFlowchart;