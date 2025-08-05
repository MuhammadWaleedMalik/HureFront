import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Eye, Loader2 } from 'lucide-react';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    data: ''
  });

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/get`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to add blog');
      const newBlog = await response.json();
      setBlogs(prev => [...prev, newBlog]);
      setShowAddModal(false);
      setFormData({ name: '', data: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/update/${editingBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update blog');
      const updatedBlog = await response.json();
      setBlogs(prev => prev.map(blog => 
        blog._id === updatedBlog._id ? updatedBlog : blog
      ));
      setEditingBlog(null);
      setFormData({ name: '', data: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/delete/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete blog');
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      name: blog.name,
      data: blog.data
    });
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
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
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Blog Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage your blog posts
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Blog</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-effect p-6 rounded-xl shadow-xl border border-white/20 hover-lift">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{blogs.length}</h3>
              <p className="text-sm text-gray-600">Total Blogs</p>
            </div>
          </div>
        </div>
        
        <div className="glass-effect p-6 rounded-xl shadow-xl border border-white/20 hover-lift">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString()}
              </h3>
              <p className="text-sm text-gray-600">Last Updated</p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl shadow-xl border border-white/20 hover-lift">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <Edit2 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {blogs.filter(b => b.updatedAt).length}
              </h3>
              <p className="text-sm text-gray-600">Recently Edited</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="glass-effect rounded-xl shadow-xl border border-white/20">
        <div className="px-6 py-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {blogs.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No blogs found</h3>
                <p className="mt-1 text-gray-500">Get started by creating a new blog post</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Blog</span>
                </button>
              </div>
            </div>
          ) : (
            blogs.map(blog => (
              <div key={blog._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {blog.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {blog.data}
                    </p>
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(blog.updatedAt || blog.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingBlog) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-effect rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingBlog ? 'Edit Blog' : 'New Blog'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  placeholder="Blog title..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={10}
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  placeholder="Blog content..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingBlog(null);
                  setFormData({ name: '', data: '' });
                }}
                className="px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-slate-100 hover:from-gray-200 hover:to-slate-200 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={editingBlog ? handleUpdateBlog : handleAddBlog}
                disabled={loading || !formData.name || !formData.data}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : editingBlog ? (
                  'Update Blog'
                ) : (
                  'Create Blog'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;