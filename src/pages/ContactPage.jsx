import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    message: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const APIURL=import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${APIURL}/api/help`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          Email: formData.email,
          Message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Message sent successfully! We\'ll contact you soon.' 
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.message || 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media data with icons and colors
  const socialMedia = [
    { 
      name: 'instagram', 
      icon: <FaInstagram className="text-white text-xl" />, 
      color: 'bg-gradient-to-tr from-purple-500 to-pink-500',
      link: websites[0].instagramaccount 
    },
    { 
      name: 'facebook', 
      icon: <FaFacebookF className="text-white text-xl" />, 
      color: 'bg-blue-600',
      link: websites[0].facebookaccount 
    },
    { 
      name: 'linkedin', 
      icon: <FaLinkedinIn className="text-white text-xl" />, 
      color: 'bg-blue-700',
      link: websites[0].linkedinaccount 
    },
    { 
      name: 'youtube', 
      icon: <FaYoutube className="text-white text-xl" />, 
      color: 'bg-red-600',
      link: '' 
    },
    { 
      name: 'tiktok', 
      icon: <FaTiktok className="text-white text-xl" />, 
      color: 'bg-black',
      link: '' 
    }
  ];

  return (
    <div className='mt-24 mb-24 bg-[#FCF6F5FF]'>
      {/* Page metadata */}
      <title>Contact Us - {websites[0].name}</title>
      <meta name="description" content={websites[0].slogan} />

      {/* Main container */}
      <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Header section */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-extrabold text-[#2BAE66FF] italic sm:text-5xl sm:tracking-tight lg:text-6xl font-${styles.headings}`}>
              Contact Us
            </h1>
            <p className={`mt-5 max-w-xl mx-auto text-xl text-green-600 font-${styles.subheadings}`}>
              We're available <span className={`font-semibold text-${styles.primaryColor1}`}>24/7</span> to assist you.
            </p>
          </div>

          {/* Main content area */}
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            
            {/* Contact form */}
            <div className={`w-full lg:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden`}>
              <div className="p-6 sm:p-10">
                <h2 className={`text-2xl font-bold text-gray-900 mb-6 font-${styles.headings}`}>
                  Send us a message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name input */}
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-1 font-${styles.text}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-green-800 focus:border-green-500 transition font-${styles.text}`}
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email input */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-1 font-${styles.text}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border text-green-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-${styles.text}`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-1 font-${styles.text}`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className={`w-full text-green-800 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition font-${styles.text}`}
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                        isSubmitting ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition font-${styles.text}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </button>
                  </div>

                  {/* Submission status message */}
                  {submitStatus.message && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      submitStatus.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    } font-${styles.text}`}>
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Social media orbit */}
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                 
                {/* Central static circle with logo */}
                <div className={`absolute inset-0 m-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg flex items-center justify-center overflow-hidden z-10`}>
                  <div className="w-3/4 h-3/4 rounded-full bg-white shadow-inner overflow-hidden border-4 border-white">
                    <img 
                      src={websites[0].logo} 
                      alt={websites[0].name} 
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional contact information */}
          <div className={`mt-16 text-center bg-white p-6 rounded-xl shadow-md`}>
            <h3 className={`text-xl font-bold text-gray-900 mb-4 font-${styles.headings}`}>
              Other Ways to Reach Us
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className='flex flex-col'>
                <p className={`font-medium text-gray-700 font-${styles.text}`}>
                  Email
                </p>
                <a 
                  href={`mailto:${websites[0].contactwebsite}`} 
                  className={`text-green-600 hover:underline font-${styles.text}`}
                >
                  {websites[0].contactwebsite}
                </a>
                <a 
                  href={`mailto:${websites[0].contactwebsite1}`} 
                  className={`text-green-600 hover:underline font-${styles.text}`}
                >
                  {websites[0].contactwebsite1}
                </a>
                
              </div>
             
              <div className='flex flex-col'>
                <p className={`font-medium text-gray-700 font-${styles.text}`}>
                  Phone
                </p>
                <a 
                  href={`tel:${websites[0].contactnumber1}`} 
                  className={`text-green-600 hover:underline font-${styles.text}`}
                >
                  {websites[0].contactnumber1}
                </a>
                <a 
                  href={`tel:${websites[0].contactnumber2}`} 
                  className={`text-green-600 hover:underline font-${styles.text}`}
                >
                  {websites[0].contactnumber2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;