import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import websites from '../../utils/Website/Website_Info.js';

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user info from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user.email;
  const APIURL=import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make sure we have a user email before making the request
        if (!userEmail) {
          setError('User email not found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${APIURL}/api/application/get`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.data.success) {
          // Filter applications by user email
          const userApplications = response.data.data.filter(app => 
            app.email === userEmail
          );
          setApplications(userApplications);
        } else {
          setError('Failed to fetch applications');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userEmail]);

  // Calculate stats
  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => app.status !== 'withdrawn').length;
  const withdrawnApplications = applications.filter(app => app.status === 'withdrawn').length;

  const handleWithdraw = async (applicationId) => {
    try {
      await axios.patch(`http://localhost:4000/api/application/withdraw/${applicationId}`);
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: 'withdrawn' } : app
      ));
    } catch (err) {
      console.error('Failed to withdraw application:', err);
      setError(err.response?.data?.message || err.message || 'Failed to withdraw application');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const statCardVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-color-3 text-primary-color-5 font-subheading flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color-1 mb-4"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-color-3 text-primary-color-5 font-subheading flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-color-3 text-primary-color-5 font-subheading">
      {/* Header */}
      <header className="bg-primary-color-1 text-primary-color-3 py-4 px-8 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <img 
            src={websites[0]?.logo} 
            alt={`${websites[0]?.name || 'HURE'} Logo`} 
            className="h-12 w-auto"
          />
          <motion.h1 
            className="text-3xl font-bold font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {websites[0]?.name || 'HURE'}
          </motion.h1>
        </div>
        <motion.p 
          className="text-sm italic mt-2 font-subheading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {websites[0]?.slogan || 'Smarter HR for Healthcare Teams'}
        </motion.p>
      </header>

      {/* Dashboard Content */}
      <motion.div 
        className="py-8 px-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-primary-color-2 text-primary-color-5 p-6 rounded-lg shadow-md"
            variants={statCardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
            <p className="text-3xl font-bold">{totalApplications}</p>
          </motion.div>
          
          <motion.div 
            className="bg-primary-color-2 text-primary-color-5 p-6 rounded-lg shadow-md"
            variants={statCardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold mb-2">Active Applications</h3>
            <p className="text-3xl font-bold text-green-600">{activeApplications}</p>
          </motion.div>
          
          <motion.div 
            className="bg-primary-color-2 text-primary-color-5 p-6 rounded-lg shadow-md"
            variants={statCardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold mb-2">Withdrawn</h3>
            <p className="text-3xl font-bold text-red-600">{withdrawnApplications}</p>
          </motion.div>
        </motion.div>

        {/* Active Applications */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 font-heading">Your Job Applications</h2>
          
          {applications.length === 0 ? (
            <motion.p 
              className="text-gray-500 italic"
              variants={itemVariants}
            >
              You haven't applied to any jobs yet.
            </motion.p>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {applications.filter(app => app.status !== 'withdrawn').map((application) => (
                <motion.div 
                  key={application._id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <h3 className="text-xl font-semibold">{application.jobId?.title || 'Job Title Not Available'}</h3>
                    <p className="text-primary-color-4">{application.jobId?.location || 'Location Not Available'}</p>
                    <p className="mt-2">
                      Status: <span className="font-semibold text-green-600">{application.status || 'Active'}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied on: {new Date(application.appliedAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  
                  
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Withdrawn Applications Section */}
        {withdrawnApplications > 0 && (
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 font-heading">Withdrawn Applications</h2>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {applications.filter(app => app.status === 'withdrawn').map((application) => (
                <motion.div 
                  key={application._id}
                  className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  variants={itemVariants}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-600">{application.jobId?.title || 'Job Title Not Available'}</h3>
                    <p className="text-gray-500">{application.jobId?.location || 'Location Not Available'}</p>
                    <p className="mt-2">
                      Status: <span className="font-semibold text-red-600">Withdrawn</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Applied on: {new Date(application.appliedAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="bg-primary-color-5 text-primary-color-3 py-6 px-8 text-center">
        <p className="mb-2">
          Contact us: {websites[0]?.contactwebsite || 'N/A'} | {websites[0]?.contactnumber1 || 'N/A'}
        </p>
        <div className="flex justify-center gap-4">
          {websites[0]?.facebookaccount && (
            <a 
              href={websites[0]?.facebookaccount} 
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          )}
          {websites[0]?.instagramaccount && (
            <a 
              href={websites[0]?.instagramaccount} 
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}
          {websites[0]?.linkedinaccount && (
            <a 
              href={websites[0]?.linkedinaccount} 
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;