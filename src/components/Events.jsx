import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/colors.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, selectEvents } from '../Slicers/EventSlice';

const HUREvents = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
 
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [loading, setLoading] = useState(true);
  
 const APIURL=import.meta.env.VITE_API_URL



useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${APIURL}/api/event/get`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        dispatch(setEvents(data.data));
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, [dispatch]);
 useEffect(() => {
  let results = [...events]; // 🔑 Create a shallow copy to avoid mutating original array

  // Apply all filters
  if (categoryFilter) {
    results = results.filter(event => event.category === categoryFilter);
  }

  if (dateFilter) {
    results = results.filter(event => new Date(event.date) >= new Date(dateFilter));
  }

  if (searchQuery) {
    results = results.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (regionFilter) {
    results = results.filter(event => {
      if (regionFilter === 'Online') {
        return event.location === 'Online';
      } else {
        return event.location.includes(regionFilter.split(',')[0]);
      }
    });
  }

  // Sort safely
  results.sort((a, b) => new Date(a.date) - new Date(b.date));

  setFilteredEvents(results);
  setLoading(false);
}, [events, categoryFilter, dateFilter, searchQuery, regionFilter]);

  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  

  return (
    <div className="min-h-screen mt-24" style={{ backgroundColor: styles.primaryColor3 }}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg shadow-md sticky top-8"
              style={{ backgroundColor: styles.primaryColor3, fontFamily: styles.subheadingFont }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold" style={{ color: styles.primaryColor5 }}>
                  Find Events
                </h2>
                
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Search Events
                  </label>
                  <input
                    type="text"
                    placeholder="Keywords, speaker, etc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  >
                    <option value="">All Categories</option>
                    <option value="CPD">CPD / CME</option>
                    <option value="Licensing Exam Prep">Licensing Exam Prep</option>
                    <option value="Community Health">Community Health</option>
                    <option value="NHIF/Nursing Council Briefings">NHIF/Nursing Council Briefings</option>
                    <option value="Public Health Workshops">Public Health Workshops</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Upcoming After
                  </label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Region
                  </label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  >
                    <option value="">All Regions</option>
                    <option value="Nairobi, Kenya">Kenya</option>
                    <option value="Kampala, Uganda">Uganda</option>
                    <option value="Dar es Salaam, Tanzania">Tanzania</option>
                    <option value="Kigali, Rwanda">Rwanda</option>
                    <option value="Online">Online Only</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    setCategoryFilter('');
                    setDateFilter('');
                    setSearchQuery('');
                    setRegionFilter('');
                  }}
                  className="w-full py-2 rounded-md transition"
                  style={{ backgroundColor: styles.primaryColor4, color: 'white', hoverBg: styles.primaryColor5 }}
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          </aside>

          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: styles.primaryColor5, fontFamily: styles.headingFont }}>
                Upcoming Events
              </h2>
              <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                {filteredEvents.length} events found
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                <p style={{ color: styles.primaryColor5 }}>No events match your filters. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
  {filteredEvents.map((event) => (
    <motion.div
      key={event._id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-lg shadow-md overflow-hidden"
      style={{ backgroundColor: styles.primaryColor3, borderLeft: `4px solid ${styles.primaryColor1}` }}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-shrink-0 w-full md:w-32 text-center md:text-left">
            <div className="bg-white rounded-lg p-2 shadow-inner">
              <div className="text-sm font-bold" style={{ color: styles.primaryColor1 }}>
                {new Date(event.date).toLocaleString('en-GB', { month: 'short' }).toUpperCase()}
              </div>
              <div className="text-2xl font-bold" style={{ color: styles.primaryColor5 }}>
                {new Date(event.date).getDate()}
              </div>
              <div className="text-xs" style={{ color: styles.primaryColor4 }}>
                {new Date(event.date).toLocaleString('en-GB', { weekday: 'short' })}
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                  {event.title}
                </h3>
                <p className="mt-1" style={{ color: styles.primaryColor4 }}>
                  {event.time} • {event.location || 'Online'}
                </p>
              </div>
              <span
                className="text-xs px-3 py-1 rounded-full self-start"
                style={{ backgroundColor: styles.primaryColor2, color: styles.primaryColor5 }}
              >
                {event.category}
              </span>
            </div>

            <p className="mt-3" style={{ color: styles.primaryColor5 }}>
              {event.description}
            </p>

            {event.speaker && (
              <p className="mt-2 text-sm" style={{ color: styles.primaryColor4 }}>
                <span className="font-medium">Speaker/Trainer:</span> {event.speaker.name}, {event.speaker.designation}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {event.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: styles.primaryColor2, color: styles.primaryColor5 }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ✅ Join Zoom Button */}
            {event.zoomLink && (
              <div className="mt-4">
                <a
                  href={event.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-md text-white font-semibold"
                  style={{ backgroundColor: styles.primaryColor1 }}
                >
                  Join Zoom
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</AnimatePresence>

              </div>
            )}
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default HUREvents;