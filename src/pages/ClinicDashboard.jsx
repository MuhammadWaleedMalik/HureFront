import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import websites from '../../utils/Website/Website_Info';

const ClinicDashboard = () => {
  // Job states
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    organization: '',
    location: '',
    description: '',
    jobType: 'Full-time',
    salaryRange: '$95,000 - $120,000',
    postedBy: ''
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const APIURL=import.meta.env.VITE_API_URL

  // Event states
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    tags: [],
    speaker: {
      name: '',
      designation: ''
    },
    zoomLink: ''
  });
  const [currentTag, setCurrentTag] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);

  // Fetch jobs and applications
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch jobs
        const jobsResponse = await fetch(`${APIURL}/api/job/get`);
        const jobsData = await jobsResponse.json();
        if (jobsData.success) {
          // Filter jobs posted by the clinic
          const clinic = JSON.parse(localStorage.getItem('user'));
          const clinicEmail = clinic.email;
          const clinicJobs = jobsData.data.filter(job => job.postedBy === clinicEmail);
          setJobs(clinicJobs);
        }

        // Fetch applications
        const appsResponse = await fetch(`${APIURL}/api/application/get`);
        const appsData = await appsResponse.json();
        if (appsData.success) {
          setApplications(appsData.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Job functions
  const handlePostJob = async () => {
    if (!newJob.title || !newJob.organization || !newJob.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const clinic = JSON.parse(localStorage.getItem('user'));
      if (!clinic || !clinic.email) {
        alert('Please login as a clinic to post jobs');
        return;
      }

      const jobToPost = {
        ...newJob,
        postedBy: clinic.email
      };

      const response = await fetch(`${APIURL}/api/job/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(jobToPost)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to post job');
      }

      setJobs(prevJobs => [...prevJobs, data.data]);
      resetJobForm();
      alert('Job posted successfully!');
      
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const resetJobForm = () => {
    setNewJob({ 
      title: '', 
      organization: '', 
      location: '',
      description: '',
      jobType: 'Full-time',
      salaryRange: '$95,000 - $120,000',
      postedBy: ''
    });
  };

 

  // const handleDeleteJob = async (jobId) => {
  //   try {
  //     const response = await fetch(`YOUR_DELETE_JOB_API_ENDPOINT/${jobId}`, {
  //       method: 'DELETE'
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       setJobs(jobs.filter(job => job._id !== jobId));
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // Event functions
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSpeakerChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      speaker: {
        ...prev.speaker,
        [name]: value
      }
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !newEvent.tags.includes(currentTag.trim())) {
      setNewEvent(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewEvent(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePostEvent = async () => {
    try {
      const clinic = JSON.parse(localStorage.getItem('user'));
      if (!clinic?.email) {
        alert('Please login as a clinic to post events');
        return;
      }

      const eventToPost = {
        ...newEvent,
        postedBy: clinic.email
      };

      const response = await fetch(`${APIURL}/api/event/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(eventToPost)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to post event');
      
      alert('Event posted successfully!');
      setShowEventForm(false);
      resetEventForm();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const resetEventForm = () => {
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      category: '',
      description: '',
      tags: [],
      speaker: { name: '', designation: '' },
      zoomLink: ''
    });
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-primary-color-3 text-primary-color-5 font-subheading">
      {/* Header */}
      <header className="bg-primary-color-1 text-primary-color-3 py-4 px-8 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <img 
            src={websites[0]?.logo} 
            alt={`${websites[0]?.name || 'Clinic'} Logo`} 
            className="h-12 w-auto"
          />
          <h1 className="text-3xl font-bold font-heading">
            {websites[0]?.name || 'Clinic'} Dashboard
          </h1>
        </div>
        <p className="text-sm italic mt-2 font-subheading">
          Healthcare Job Management System
        </p>
      </header>

      <motion.div 
        className="py-8 px-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Event Form Toggle */}
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={() => setShowEventForm(!showEventForm)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            {showEventForm ? 'Hide Event Form' : 'Create New Event'}
          </motion.button>
        </div>

        {/* Event Form */}
        {showEventForm && (
          <motion.div 
            className="mb-12 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleEventChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date*</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleEventChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time*</label>
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleEventChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleEventChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category*</label>
                <select
                  name="category"
                  value={newEvent.category}
                  onChange={handleEventChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select category</option>
                  <option value="Training">Training</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Webinar">Webinar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Speaker Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEvent.speaker.name}
                  onChange={handleSpeakerChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Speaker Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={newEvent.speaker.designation}
                  onChange={handleSpeakerChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Description*</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleEventChange}
                  required
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Zoom Link</label>
                <input
                  type="url"
                  name="zoomLink"
                  value={newEvent.zoomLink}
                  onChange={handleEventChange}
                  placeholder="https://zoom.us/j/..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tag"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newEvent.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePostEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Post Event
              </button>
            </div>
          </motion.div>
        )}

        {/* Job Posting Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 font-heading">Post New Job</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Organization*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.organization}
                  onChange={(e) => setNewJob({...newJob, organization: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <select
                  className="w-full p-2 border rounded"
                  value={newJob.jobType}
                  onChange={(e) => setNewJob({...newJob, jobType: e.target.value})}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salary Range</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.salaryRange}
                  onChange={(e) => setNewJob({...newJob, salaryRange: e.target.value})}
                  placeholder="$95,000 - $120,000"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description*</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                required
              />
            </div>
            <motion.button
              onClick={handlePostJob}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Post Job
            </motion.button>
          </div>
        </motion.div>

        {/* Posted Jobs Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 font-heading">Posted Jobs ({jobs.length})</h2>
          <div className="space-y-4">
            {jobs.map((job) => {
              const jobApplications = applications.filter(app => 
                app.jobId && app.jobId._id === job._id
              );
              
              return (
                <motion.div 
                  key={job._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-primary-color-4">{job.organization} - {job.location}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        Posted on: {new Date(job.postedAt).toLocaleDateString()}
                      </p>
                      <p className="mt-1">
                        Type: <span className="font-semibold">{job.jobType || 'Full-time'}</span>
                      </p>
                      <p className="mt-1">
                        Salary: <span className="font-semibold">{job.salaryRange || 'Negotiable'}</span>
                      </p>
                      <p className="mt-1">
                        Applicants: <span className="font-semibold">
                          {jobApplications.length}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setSelectedJob(selectedJob?._id === job._id ? null : job)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        whileTap={{ scale: 0.95 }}
                      >
                        {selectedJob?._id === job._id ? 'Hide Details' : 'View Applicants'}
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteJob(job._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>

                  {selectedJob?._id === job._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <h4 className="font-medium mb-3">Applicants ({jobApplications.length})</h4>
                      {jobApplications.length > 0 ? (
                        <ul className="space-y-3">
                          {jobApplications.map(application => (
                            <li key={application._id} className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-medium">{application.fullName}</p>
                                <p className="text-sm">{application.email}</p>
                                <p className="text-sm">{application.phoneNumber}</p>
                                <p className="text-sm mt-2">
                                  Cover Letter: {application.coverLetter}
                                </p>
                                <p className="text-sm">
                                  Resume: {' '}
                                  <a 
                                    href={application.resumeUrl.startsWith('http') ? application.resumeUrl : `http://${application.resumeUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline hover:text-blue-700"
                                  >
                                    View Resume
                                  </a>
                                </p>
                                <p className="text-sm mt-1">
                                  Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm mt-1">
                                  Status: <span className={`font-semibold ${
                                    application.status === 'accepted' ? 'text-green-600' : 
                                    application.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                                  }`}>
                                    {application.status || 'pending'}
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => handleStatusUpdate(application._id, 'accepted')}
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Accept
                                </motion.button>
                                <motion.button
                                  onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Reject
                                </motion.button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No applicants yet</p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClinicDashboard;