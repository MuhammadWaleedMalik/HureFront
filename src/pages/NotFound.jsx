import { motion } from 'framer-motion';
import { FaRobot, FaJediOrder, FaSpaceShuttle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const NotFound = () => {
  const robotVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    hover: {
      y: -10,
      transition: { 
        yoyo: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
        <title>Page Not Found | {websites[0].name}</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="The page you're looking for doesn't exist." />

      <motion.div 
        className="min-h-screen mt-24 mb-24 flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: styles.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Animated Robot */}
        <motion.div
          className="relative mb-12"
          variants={robotVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <FaRobot className="text-8xl" style={{ color: styles.primaryColor1 }} />
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              rotate: [0, 15, -15, 0],
              transition: { 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }
            }}
          >
            <FaSpaceShuttle className="text-4xl" style={{ color: styles.error }} />
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.div 
          className="text-center mb-12"
          variants={textVariants}
        >
          <motion.h1 
            className="text-9xl font-bold mb-4"
            style={{ 
              background: `linear-gradient(to right, ${styles.primaryColor1}, ${styles.black})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            whileHover={{ scale: 1.05 }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-4xl font-semibold mb-6"
            style={{ color: styles.black }}
          >
            Galactic Anomaly Detected!
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: styles.black }}
          >
            The cosmic page you're searching for has been sucked into a black hole.
          </motion.p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            to="/" 
            className="px-8 py-3 rounded-full flex items-center gap-2 transition-all"
            style={{ 
              backgroundColor: styles.primaryColor1,
              color: styles.primaryColor2
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 5px 15px ${styles.primaryColor5}80`
            }}
          >
            <FaJediOrder /> Beam Me Home
          </Link>
        </motion.div>

        {/* Floating Space Elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            transition: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <FaJediOrder className="text-6xl" style={{ color: styles.primaryColor1 }} />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-1/4 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -360],
            transition: {
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <FaJediOrder className="text-8xl" style={{ color: styles.primaryColor1 }} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;