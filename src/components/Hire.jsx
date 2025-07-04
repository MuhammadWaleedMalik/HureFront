import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../Slicers/JobSlice';
import styles from '../../styles/colors.module.scss';

const HUREHire = () => {
   const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  // console.log(jobs)

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

 
  const [filteredJobs, setFilteredJobs] = useState([]);
  

  
  // Filter states
  const [locationFilter, setLocationFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  

  
  // Application states
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [coverLetter, setCoverLetter] = useState('');
const [resume, setResume] = useState('');
 

  // Update filtered jobs when Redux jobs change
  useEffect(() => {
    let results = jobs;
    if (locationFilter) {
      results = results.filter(job => 
        (job.organization || '').toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (roleFilter) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(roleFilter.toLowerCase())
      );
    }
    if (typeFilter) {
      results = results.filter(job => (job.type || '') === typeFilter);
    }
    setFilteredJobs(results);
  }, [locationFilter, roleFilter, typeFilter, jobs]);

 

  // Animation variants
    const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

    useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);
const userId ='123'
  // Handle job application
  const handleApply = async (e) => {
  e.preventDefault();
  if (!selectedJob || !userId ) return;

  // ✅ Prepare Form Data
  const formData = new FormData();
  formData.append('userId', userId); // ✅ Correct user ID
  formData.append('jobId', selectedJob._id); // ✅ Correct job ID
  formData.append('fullName', fullName);     // Bind from input
  formData.append('email', email);           // Bind from input
  formData.append('phoneNumber', phoneNumber); // Bind from input
  formData.append('resume', resume);         // Bind from input
  formData.append('coverLetter', coverLetter); // Optional         // File input
  formData.append('appliedAt', new Date().toISOString());

  try {
   const res = await fetch('http://localhost:4000/api/application/apply', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId,
    jobId: selectedJob._id,
    fullName,
    email,
    phoneNumber,
    coverLetter,
    resumeUrl: resume, // if this is a string URL, not a file
    appliedAt: new Date().toISOString(),
  }),
});


    if (res.ok) {
      alert(`Application submitted for ${selectedJob.title}`);
      setShowApplication(false);
      setSelectedJob(null);
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      // setCvFile(null);
    } else {
      alert('Failed to submit application. Please try again.');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong.');
  }
};



  return (
    <div className="min-h-screen mt-24 bg-gray-50" style={{ backgroundColor: styles.primaryColor3 }}>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="md:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg shadow-md sticky top-8"
              style={{ 
                backgroundColor: styles.primaryColor3,
                fontFamily: styles.subheadingFont
              }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: styles.primaryColor5 }}>
                Filter Jobs
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="Department"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Nurse, Therapist, etc."
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Job Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    setLocationFilter('');
                    setRoleFilter('');
                    setTypeFilter('');
                  }}
                  className="w-full py-2 rounded-md transition"
                  style={{ 
                    backgroundColor: styles.primaryColor4,
                    color: 'white',
                    hoverBg: styles.primaryColor5
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          </aside>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
  <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
    <p style={{ color: styles.primaryColor5 }}>No jobs match your filters. Try adjusting your search criteria.</p>
  </div>
) : (
  <div className="space-y-6">
    <AnimatePresence>
      {jobs.map((job) => (
        <motion.div
          key={job._id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className="rounded-lg shadow-md overflow-hidden border-l-4"
          style={{ 
            backgroundColor: styles.primaryColor3,
            borderLeftColor: styles.primaryColor1 
          }}
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                  {job.title}
                </h3>
                <p className="mt-1" style={{ color: styles.primaryColor4 }}>
                  {job.organization}
                </p>
              </div>
              <span 
                className="text-xs px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: styles.primaryColor2,
                  color: styles.primaryColor5
                }}
              >
                {job.jobType || 'Full-time'}
              </span>
            </div>
            
            <p className="mt-4" style={{ color: styles.primaryColor5 }}>
              {job.description}
            </p>
            
            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="font-medium" style={{ color: styles.primaryColor5 }}>
                  {job.salaryRange || 'Negotiable'}
                </p>
                <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                  Posted {new Date(job.postedAt).toLocaleDateString()}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedJob(job);
                  setShowApplication(true);
                }}
                className="px-4 py-2 rounded-md transition"
                style={{ 
                  backgroundColor: styles.primaryColor1,
                  color: 'white',
                  hoverBg: styles.primaryColor5
                }}
              >
                Apply Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
)}

        </div>
      </main>

   

      {/* Application Modal */}
      <AnimatePresence>
        {showApplication && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-lg shadow-xl w-full max-w-md"
              style={{ backgroundColor: styles.primaryColor3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                    Apply for {selectedJob.title}
                  </h3>
                  <button
                    onClick={() => setShowApplication(false)}
                    style={{ color: styles.primaryColor5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="mb-2" style={{ color: styles.primaryColor5 }}>
                    <span className="font-medium">Department:</span> {selectedJob.department}
                  </p>
                  <p className="mb-2" style={{ color: styles.primaryColor5 }}>
                    <span className="font-medium">Type:</span> {selectedJob.type || 'Full-time'}
                  </p>
                  <p style={{ color: styles.primaryColor5 }}>
                    <span className="font-medium">Salary:</span> {selectedJob.salary || 'Negotiable'}
                  </p>
                </div>
                
                <form onSubmit={handleApply}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Full Name*
                      </label>
                      <input
  type="text"
  required
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
  style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
/>

                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Email*
                      </label>
                      <input
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
  style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
/>

                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Phone Number*
                      </label>
                     <input
  type="tel"
  required
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
  style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
/>

                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Resume Url or LinkedIn*
                      </label>
                     <input
  type="tel"
  required
  value={resume}
  onChange={(e) => setResume(e.target.value)}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
  style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
/>

                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Cover Letter (optional)
                      </label>
                      <textarea
  rows="4"
  value={coverLetter}
  onChange={(e) => setCoverLetter(e.target.value)}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
  style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
></textarea>

                    </div>
                    
                    
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowApplication(false)}
                      className="px-4 py-2 border rounded-md"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        color: styles.primaryColor5,
                        hoverBg: styles.primaryColor2
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md"
                      style={{ 
                        backgroundColor: styles.primaryColor1,
                        color: 'white',
                        hoverBg: styles.primaryColor5
                      }}
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HUREHire;