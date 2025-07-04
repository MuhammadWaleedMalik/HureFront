import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/colors.module.scss';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deviceType, setDeviceType] = useState('mobile');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Slides data
  const slides = [
    {
      id: 1,
      image: '/images/weblogo.jpg',
      heading: 'Frontend & Backend Development',
      subheading: 'React.js Development & Server-Side Scripting & Cloud Server Deployment',
      headingAnimation: {
        initial: { x: -300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      }
    },
    {
      id: 2,
      image: '/images/mllogo.jpg',
      heading: 'Machine Learning Services',
      subheading: 'Model Training & Deep Learning Solutions & Predictive Analytics',
      headingAnimation: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
      }
    },
    {
      id: 3,
      image: '/images/gdlogo.jpg',
      heading: 'Graphic Designing Services',
      subheading: 'Logo, Branding & Motion Graphics & Animation',
      headingAnimation: {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      }
    },
    {
      id: 4,
      image: '/images/androidlogo.jpg',
      heading: 'Android Development Services',
      subheading: 'Custom Android App & Mobile UI/UX Design & App Testing',
      headingAnimation: {
        initial: { rotate: -15, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
      }
    },
    {
      id: 5,
      image: '/images/saaslogo.jpg',
      heading: 'SaaS Development Services',
      subheading: 'Scalable SaaS Applications, Custom Dashboard Interfaces, and Cloud-based Solutions',
      headingAnimation: {
        initial: { rotate: -15, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
      }
    },
    {
      id: 6,
      image: '/images/cryptologo.jpg',
      heading: 'Crypto & Blockchain Development',
      subheading: 'Decentralized Applications, Smart Contracts, and Secure Blockchain Solutions',
      headingAnimation: {
        initial: { rotate: -15, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
      }
    }
  ];

  // Detect device type and touch capability
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else if (width < 1536) {
        setDeviceType('desktop');
      } else {
        setDeviceType('large-screen');
      }
    };

    // Check if touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotation with different timing per device
  useEffect(() => {
    let intervalTime;
    switch(deviceType) {
      case 'mobile': intervalTime = 10000; break;
      case 'tablet': intervalTime = 8000; break;
      default: intervalTime = 6000;
    }

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [deviceType, slides.length]);

  // Responsive settings
  const getResponsiveSettings = useCallback(() => {
    switch(deviceType) {
      case 'mobile':
        return {
          height: '70vh',
          minHeight: '400px',
          textSize: {
            heading: 'text-2xl',
            subheading: 'text-base'
          },
          padding: 'p-4'
        };
      case 'tablet':
        return {
          height: '75vh',
          minHeight: '500px',
          textSize: {
            heading: 'text-3xl',
            subheading: 'text-lg'
          },
          padding: 'p-6'
        };
      case 'desktop':
        return {
          height: '80vh',
          minHeight: '600px',
          textSize: {
            heading: 'text-4xl',
            subheading: 'text-xl'
          },
          padding: 'p-8'
        };
      case 'large-screen':
        return {
          height: '85vh',
          minHeight: '700px',
          textSize: {
            heading: 'text-5xl',
            subheading: 'text-2xl'
          },
          padding: 'p-10'
        };
      default:
        return {
          height: '80vh',
          minHeight: '600px',
          textSize: {
            heading: 'text-4xl',
            subheading: 'text-xl'
          },
          padding: 'p-8'
        };
    }
  }, [deviceType]);

  const responsiveSettings = getResponsiveSettings();

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Animation transition settings
  const getTransitionSettings = useCallback(() => ({
    type: 'spring',
    stiffness: deviceType === 'mobile' ? 40 : 60,
    damping: 15
  }), [deviceType]);

  return (
    <div 
      className={`relative mt-24 mx-auto overflow-hidden rounded-xl shadow-xl ${deviceType === 'large-screen' ? 'max-w-8xl' : 'max-w-6xl'}`}
      style={{
        backgroundColor: styles.bgSecondary,
        border: `1px solid ${styles.border}`
      }}
      onTouchStart={isTouchDevice ? handleTouchStart : null}
      onTouchMove={isTouchDevice ? handleTouchMove : null}
      onTouchEnd={isTouchDevice ? handleTouchEnd : null}
    >
      <div 
        className="relative w-full"
        style={{
          height: responsiveSettings.height,
          minHeight: responsiveSettings.minHeight
        }}
      >
        <AnimatePresence mode='wait'>
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.33, 1, 0.68, 1]
                }}
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 z-0 bg-black/50"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.43, 0.13, 0.23, 0.96] 
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.heading}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/fallback.jpg'; // Add a fallback image
                    }}
                  />
                </motion.div>

                {/* Content Overlay */}
                <div className={`relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center ${responsiveSettings.padding} text-white`}>
                  <div 
                    className={`w-full md:w-1/2 p-4 md:p-6 rounded-xl backdrop-blur-sm ${deviceType === 'mobile' ? 'text-center' : 'text-left'}`}
                    style={{
                      backgroundColor: `${styles.black}66`,
                      border: `1px solid ${styles.borderDark}`
                    }}
                  >
                    <motion.h2
                      className={`${responsiveSettings.textSize.heading} font-bold mb-2 md:mb-4`}
                      style={{ color: styles.primaryColor2 }}
                      initial={slide.headingAnimation.initial}
                      animate={slide.headingAnimation.animate}
                      transition={{
                        ...getTransitionSettings(),
                        delay: deviceType === 'mobile' ? 0.1 : 0
                      }}
                    >
                      {slide.heading}
                    </motion.h2>
                    <motion.p
                      className={`${responsiveSettings.textSize.subheading}`}
                      style={{ color: styles.primaryColor2 }}
                      initial={slide.headingAnimation.initial}
                      animate={slide.headingAnimation.animate}
                      transition={{
                        ...getTransitionSettings(),
                        delay: deviceType === 'mobile' ? 0.2 : 0.3
                      }}
                    >
                      {slide.subheading}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center space-x-2 md:space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors`}
            style={{
              backgroundColor: currentSlide === index ? styles.primaryColor2 : `${styles.primaryColor2}80`
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile if touch device */}
      {(!isTouchDevice || deviceType !== 'mobile') && (
        <>
          <motion.button
            onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
            className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg transition ${isTouchDevice ? 'active:scale-90' : ''}`}
            style={{
              backgroundColor: `${styles.primaryColor2}33`,
              color: styles.primaryColor2
            }}
            aria-label="Previous slide"
            whileHover={{ scale: 1.1, backgroundColor: `${styles.primaryColor2}4D` }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
            className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg transition ${isTouchDevice ? 'active:scale-90' : ''}`}
            style={{
              backgroundColor: `${styles.primaryColor2}33`,
              color: styles.primaryColor2
            }}
            aria-label="Next slide"
            whileHover={{ scale: 1.1, backgroundColor: `${styles.primaryColor2}4D` }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </>
      )}
    </div>
  );
};

export default Slider;