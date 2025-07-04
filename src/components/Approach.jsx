import React from "react";
import { motion } from "framer-motion";

const ApproachFlowchart = () => {
 const steps = [
  {
    title: "Sign Up Your Clinic",
    description: "Create your HURE account and clinic profile in minutes.",
    icon: "📝",
    color: "bg-green-600",
    position: "left",
  },
  {
    title: "Add Your Team",
    description: "Invite healthcare staff and assign roles like HR Admin, Doctor, or Nurse.",
    icon: "👥",
    color: "bg-yellow-600",
    position: "right",
  },
  {
    title: "Automate HR Tasks",
    description: "Use HURE Core to manage time tracking, leave, contracts, and compliance — all in one dashboard.",
    icon: "⚙️",
    color: "bg-red-600",
    position: "left",
    services: [
      "Time Tracking",
      "Leave Management",
      "Digital Contracts",
      "HR Compliance",
    ],
  },
  {
    title: "Explore the HURE Ecosystem",
    description: "Post jobs, host or attend training, and connect with professionals — all through one login.",
    icon: "🌐",
    color: "bg-blue-700",
    position: "right",
  },
];

  // Calculate positions for the connecting line
  const linePoints = steps.map((_, i) => {
    const x = i % 2 === 0 ? 25 : 75;
    const y = 15 + i * 23;
    return { x, y };
  });

  // Create SVG path data
  const pathData = linePoints.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    return `${acc} L ${point.x},${point.y}`;
  }, "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Our Development Process
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A structured approach to delivering exceptional results
          </p>
        </motion.div>

        <div className="relative h-[700px]">
          {/* SVG connecting line with arrows */}
          <svg
            className="absolute w-full h-full top-0 left-0 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              d={pathData}
              stroke="#3b82f6"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Arrow markers */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            
            {/* Animated path with arrow markers */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              d={pathData}
              stroke="#3b82f6"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="2s"
                begin="0.5s"
                fill="freeze"
              />
            </motion.path>
          </svg>

          {/* Step cards */}
          <div className="relative z-10 h-full">
            {steps.map((step, index) => {
              const leftPosition = step.position === "left" ? "0" : "auto";
              const rightPosition = step.position === "right" ? "0" : "auto";
              const topPosition = `${10 + index * 23}%`;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.3 + 0.5 }}
                  className="absolute w-[45%]"
                  style={{
                    left: leftPosition,
                    right: rightPosition,
                    top: topPosition,
                  }}
                >
                  <div className="relative">
                    {/* Step connector dot */}
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 ${step.position === "left" ? "-right-12" : "-left-12"} w-4 h-4 rounded-full bg-blue-500 shadow-md`}
                    />
                    
                    <div 
                      className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto shadow-md hover:scale-105 transition-transform duration-300`}
                    >
                      {step.icon}
                    </div>
                    
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      {step.services && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-500 mb-2">
                            Services Applied:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {step.services.map((service, i) => (
                              <motion.span
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 + 1 }}
                                className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors"
                              >
                                {service}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-24 bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Process Overview
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center">
                  <div className={`${step.color} w-3 h-3 rounded-full mr-2`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex items-center px-1 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApproachFlowchart;