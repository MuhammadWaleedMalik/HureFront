import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/colors.module.scss';

const HUREConnect = () => {
  // State for professionals data
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  
  // Filter states
  const [roleFilter, setRoleFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Discussion board states
  const [discussions, setDiscussions] = useState([]);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'General',
    visibility: 'Role-Based'
  });
  const APIURL=import.meta.env.VITE_API_URL

  // Get user from local storage
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // East Africa specific data
  const eastAfricaCountries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan'];
  const eastAfricaSpecialties = [
    'Maternal Health', 
    'Community Health', 
    'NHIF Knowledge', 
    'Infection Prevention',
    'HIV/AIDS Care',
    'Malaria Treatment',
    'TB Management',
    'Pediatric Care'
  ];
  const discussionCategories = [
    'General',
    'Clinical',
    'NHIF & Compliance',
    'Task Shifting in Rural Clinics',
    'Mobile Clinics & Outreach',
    'Medical Supply Chain',
    'Administrative',
    'Research'
  ];

  // Fetch professionals data
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(`${APIURL}/api/user/get`);
        const data = await response.json();
        
        if (data.success) {
          // Filter only Clinic professionals
          const clinicProfessionals = data.users.filter(
            user => user.role === 'Clinic'
          );
          setProfessionals(clinicProfessionals);
          setFilteredProfessionals(clinicProfessionals); // Initialize filtered list
        } else {
          setError('Failed to fetch professionals');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  // Fetch discussions data
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch(`${APIURL}/api/dicussion/get`);
        const data = await response.json();
        
        if (data.success) {
          // Map the API data to match your existing discussion structure
          const formattedDiscussions = data.data.map(discussion => ({
            id: discussion._id,
            title: discussion.title,
            content: discussion.content,
            category: discussion.category,
            visibility: discussion.visible[0],
            author: discussion.createdBy?.name || 'Anonymous',
            role: discussion.createdBy?.role || 'User',
            facility: discussion.createdBy?.facility || 'Unknown Facility',
            country: discussion.createdBy?.country || 'Unknown Country',
            date: new Date(discussion.createdAt).toISOString().split('T')[0],
            replies: discussion.replies?.length || 0
          }));
          setDiscussions(formattedDiscussions);
        } else {
          console.error('Failed to fetch discussions');
        }
      } catch (err) {
        console.error('Network error occurred while fetching discussions');
      }
    };

    fetchDiscussions();
  }, []);

  // Filter professionals based on criteria
  useEffect(() => {
    let results = professionals;
    
    if (roleFilter) {
      results = results.filter(professional => 
        professional.role === roleFilter
      );
    }
    
    if (facilityFilter) {
      results = results.filter(professional => 
        professional.facility === facilityFilter
      );
    }
    
    if (locationFilter) {
      results = results.filter(professional => 
        professional.location && professional.location.includes(locationFilter)
      );
    }
    
    if (countryFilter) {
      results = results.filter(professional => 
        professional.country === countryFilter
      );
    }
    
    if (searchQuery) {
      results = results.filter(professional => 
        professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (professional.description && professional.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (professional.skills && professional.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
    }
    
    setFilteredProfessionals(results);
  }, [roleFilter, facilityFilter, locationFilter, countryFilter, searchQuery, professionals]);

  // Handle discussion posting
const handlePostDiscussion = async (e) => {
  e.preventDefault();
  
  if (!currentUser) {
    console.error('User not logged in');
    alert('Please log in to post a discussion');
    return;
  }

  try {
    // Map frontend display values to backend values
    const visibilityBackendValues = {
      'Public to all Hure users': 'Public to all Hure users',
      'Clinic Internal(private)': 'Clinic Internal(private)',
      'Role-Based': 'Role-Based'
    };

    // Prepare the discussion data for API
    const discussionData = {
      title: newDiscussion.title,
      content: newDiscussion.content,
      category: newDiscussion.category,
      visible: visibilityBackendValues[newDiscussion.visibility],
      createdBy: currentUser._id || currentUser.id
    };

    const token = localStorage.getItem('token');

    const response = await fetch(`${APIURL}/api/dicussion/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(discussionData)
    });

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Unknown error occurred');
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to post discussion');
    }

    // Add the new discussion to the state
    const newDiscussionWithId = {
      id: data.data._id,
      title: newDiscussion.title,
      content: newDiscussion.content,
      category: newDiscussion.category,
      visibility: newDiscussion.visibility, // Keep frontend display value
      author: currentUser.name || 'You',
      role: currentUser.role || 'User',
      facility: currentUser.facility || 'Your Facility',
      country: currentUser.country || 'Your Country',
      date: new Date().toISOString().split('T')[0],
      replies: 0
    };
    
    setDiscussions([newDiscussionWithId, ...discussions]);
    setNewDiscussion({
      title: '',
      content: '',
      category: 'General',
      visibility: 'Public to all Hure users' // Reset to default
    });
    setShowDiscussionForm(false);

  } catch (err) {
    console.error('Error posting discussion:', err.message);
    alert(`Error: ${err.message}`);
  }
};
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


const handleConnect = async (clientEmail) => {
    try {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (!userData) {
            alert('Please login first');
            return;
        }
        
        const { name, email } = userData;
      
        
        
        
        if (!clientEmail || !clientEmail.includes('@')) {
            alert('Invalid professional email');
            return;
        }

        // Prepare the request data
        const requestData = {
            userName:name,
            userEmail:email,
            clientEmail
        };
        
        console.log('Sending request:', requestData); // Debug log
        
        // Call your API endpoint
        const response = await fetch(`${APIURL}/api/connect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any required headers (like authorization)
            },
            body: JSON.stringify(requestData),
            credentials: 'include' // If using cookies/sessions
        });
        
        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to send connection request');
        }
        
        const result = await response.json();
        alert('Connection request sent successfully!');
        
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
};
  return (
    <div className="min-h-screen mt-24" style={{ backgroundColor: styles.primaryColor3 }}>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold" style={{ color: styles.primaryColor5, fontFamily: styles.headingFont }}>
              HURE Connect 
            </h1>
            <p className="mt-2" style={{ color: styles.primaryColor4 }}>
              Connect with healthcare professionals across the region
            </p>
          </div>
          
          {/* Two Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Professionals Directory Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold" style={{ color: styles.primaryColor5 }}>
                  Find Professionals
                </h2>
                <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                  {filteredProfessionals.length} professionals found
                </p>
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Name, specialty, etc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Roles</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Facility
                  </label>
                  <select
                    value={facilityFilter}
                    onChange={(e) => setFacilityFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Facilities</option>
                    {[...new Set(professionals.map(p => p.facility))].filter(Boolean).map(facility => (
                      <option key={facility} value={facility}>{facility}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Location
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Locations</option>
                    {[...new Set(professionals.map(p => p.address?.split(',')[0]))].filter(Boolean).map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Country
                  </label>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Countries</option>
                    {eastAfricaCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Professionals Grid */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
                </div>
              ) : error ? (
                <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                  <p style={{ color: styles.primaryColor5 }}>{error}</p>
                </div>
              ) : filteredProfessionals.length === 0 ? (
                <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                  <p style={{ color: styles.primaryColor5 }}>No professionals match your filters. Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatePresence>
    {filteredProfessionals.map((professional) => (
        <motion.div
            key={professional.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-lg shadow-md overflow-hidden"
            style={{ backgroundColor: styles.primaryColor3 }}
        >
            <div className="p-4">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                            {professional.photo ? (
                                <img 
                                    src={professional.photo} 
                                    alt={professional.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div 
                                    className="h-full w-full flex items-center justify-center" 
                                    style={{ backgroundColor: styles.primaryColor2 }}
                                >
                                    <span 
                                        className="text-xl font-medium" 
                                        style={{ color: styles.primaryColor5 }}
                                    >
                                        {professional.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 
                            className="font-bold" 
                            style={{ color: styles.primaryColor5 }}
                        >
                            {professional.name}
                        </h3>
                        <p 
                            className="text-sm" 
                            style={{ color: styles.primaryColor4 }}
                        >
                            {professional.designation}
                        </p>
                        <p 
                            className="text-xs" 
                            style={{ color: styles.primaryColor4 }}
                        >
                            {professional.address?.split(',')[0]}
                        </p>
                    </div>
                </div>
                
                <div className="mt-4">
                    <p 
                        className="text-sm" 
                        style={{ color: styles.primaryColor5 }}
                    >
                        {professional.description?.substring(0, 100)}
                        {professional.description?.length > 100 ? '...' : ''}
                    </p>
                </div>
                
                {professional.skills && professional.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {professional.skills.map((skill, index) => (
                            <span 
                                key={index}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{ 
                                    backgroundColor: styles.primaryColor2,
                                    color: styles.primaryColor5
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
                
                <div 
                    className="mt-4 pt-3 border-t flex justify-between items-center" 
                    style={{ borderColor: styles.primaryColor4 }}
                >
                    <div>
                        <p 
                            className="text-xs" 
                            style={{ color: styles.primaryColor4 }}
                        >
                            {professional.phone}
                        </p>
                        <p 
                            className="text-xs" 
                            style={{ color: styles.primaryColor4 }}
                        >
                            {professional.email}
                        </p>
                    </div>
                    <button
                        onClick={() => handleConnect(professional.email)}
                        className="text-xs px-3 py-1 rounded-full transition hover:opacity-80"
                        style={{ 
                            backgroundColor: styles.primaryColor1,
                            color: 'white'
                        }}
                    >
                        Connect
                    </button>
                </div>
            </div>
        </motion.div>
    ))}
</AnimatePresence>
                </div>
              )}
            </section>
            
            {/* Discussion Board Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold" style={{ color: styles.primaryColor5 }}>
                  Community Discussions
                </h2>
                <button
                  onClick={() => setShowDiscussionForm(true)}
                  className="px-3 py-1 text-sm rounded-md transition"
                  style={{ 
                    backgroundColor: styles.primaryColor1,
                    color: 'white'
                  }}
                >
                  + New Message
                </button>
              </div>
              
              {/* Discussion Categories */}
              <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                {discussionCategories.map(category => (
                  <button 
                    key={category}
                    className="px-3 py-1 text-sm rounded-full whitespace-nowrap"
                    style={{ backgroundColor: styles.primaryColor2 }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Discussions List */}
              {discussions.length === 0 ? (
                <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                  <p style={{ color: styles.primaryColor5 }}>No discussions yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {discussions.map((discussion) => (
                      <motion.div
                        key={discussion.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                        className="rounded-lg shadow-sm p-4 cursor-pointer"
                        style={{ 
                          backgroundColor: styles.primaryColor3,
                          borderLeft: `3px solid ${styles.primaryColor1}`
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold" style={{ color: styles.primaryColor5 }}>
                              {discussion.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <p className="text-sm mr-2" style={{ color: styles.primaryColor4 }}>
                                {discussion.author}
                              </p>
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: styles.primaryColor2 }}>
                                {discussion.category}
                              </span>
                              {discussion.visibility !== 'Public' && (
                                <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ backgroundColor: styles.primaryColor2 }}>
                                  {discussion.visibility}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                              {formatDate(discussion.date)}
                            </p>
                            {discussion.country && (
                              <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                                {discussion.country}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm" style={{ color: styles.primaryColor5 }}>
                          {discussion.content.substring(0, 150)}{discussion.content.length > 150 ? '...' : ''}
                        </p>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex items-center">
                           
                            
                          </div>
                          
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* New Discussion Modal */}
      <AnimatePresence>
        {showDiscussionForm && (
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
              className="rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: styles.primaryColor3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                    Start a New Discussion
                  </h3>
                  <button
                    onClick={() => setShowDiscussionForm(false)}
                    style={{ color: styles.primaryColor5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handlePostDiscussion}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Title*
                      </label>
                      <input
                        type="text"
                        required
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                          Category*
                        </label>
                        <select
                          required
                          value={newDiscussion.category}
                          onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: styles.primaryColor4,
                            focusRing: styles.primaryColor1
                          }}
                        >
                          {discussionCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                          Visibility*
                        </label>
                       <select
  value={newDiscussion.visibility}
  onChange={(e) => setNewDiscussion({...newDiscussion, visibility: e.target.value})}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
>
  <option value="Public to all Hure users">Public to all Hure users</option>
  <option value="Clinic Internal(private)">Clinic-Internal (private)</option>
  <option value="Role-Based">Role-Based (e.g., HR-only)</option>
</select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Content*
                      </label>
                      <textarea
                        required
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                        rows="6"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowDiscussionForm(false)}
                      className="px-4 py-2 border rounded-md"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        color: styles.primaryColor5
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md"
                      style={{ 
                        whileHover:'red',
                        backgroundColor: styles.primaryColor1,
                        color: 'white'
                      }}
                    >
                      Post Discussion
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

export default HUREConnect;