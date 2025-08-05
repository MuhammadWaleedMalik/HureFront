import React, { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';

const ContentManagement = () => {
  const [sections, setSections] = useState({
    Hero: '',
    AboutUs: '',
    coreDescription: '',
    hiredescription: '',
    namedescription: '',
    conectdescription: ''
  });
  const [editingSection, setEditingSection] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch initial content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/dashboard/get-main-components');
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        setSections(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchContent();
  }, []);

  const handleEdit = (sectionId) => {
    setEditingSection(sectionId);
    setEditedContent(sections[sectionId]);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditedContent('');
  };

  const handleSave = async () => {
    if (!editedContent.trim()) {
      setError('Content cannot be empty');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/dashboard/upsert-main-components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [editingSection]: editedContent
        })
      });

      if (!response.ok) throw new Error('Failed to save content');

      const result = await response.json();
      setSections(prev => ({
        ...prev,
        [editingSection]: editedContent
      }));
      setSuccess('Content saved successfully!');
      setEditingSection(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sectionTitles = {
    Hero: 'Hero Section',
    AboutUs: 'About Us',
    coreDescription: 'Core Description',
    hiredescription: 'Hire Description',
    namedescription: 'Name Description',
    conectdescription: 'Connect Description'
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
        Content Management
      </h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}

      {Object.keys(sections).map((sectionId) => (
        <div key={sectionId} className="glass-effect rounded-xl shadow-xl border border-white/20 hover-lift">
          <div className="px-6 py-4 border-b border-white/20 flex justify-between items-center">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              {sectionTitles[sectionId]}
            </h2>
            <div className="flex space-x-2">
              {editingSection !== sectionId ? (
                <button
                  onClick={() => handleEdit(sectionId)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="animate-spin">↻</span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="p-6">
            {editingSection === sectionId ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${sectionTitles[sectionId]} content...`}
              />
            ) : (
              <div className="prose max-w-none">
                {sections[sectionId] || <p className="text-gray-500 italic">No content provided yet</p>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentManagement;