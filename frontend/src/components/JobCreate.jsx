import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    salary_min: '',
    salary_max: '',
    job_type: 'full-time'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const data = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        salary_min: parseInt(formData.salary_min) || null,
        salary_max: parseInt(formData.salary_max) || null
      };
      const response = await fetch('http://localhost:8000/api/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        navigate('/jobs');
      } else {
        setError('Failed to create job posting. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobTypes = [
    { value: 'full-time', label: 'Full Time', icon: '=�' },
    { value: 'part-time', label: 'Part Time', icon: '�' },
    { value: 'contract', label: 'Contract', icon: '=�' },
    { value: 'internship', label: 'Internship', icon: '<�' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Post a New Job
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect candidate for your team. Create an attractive job posting that highlights your company's culture and opportunities.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <div className="space-y-2">
              <label className="block-text-sm font-semibold text-gray-700 flex items-center">
                <span className="mr-2">=�</span>
                Job Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Senior Full Stack Developer"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="block-text-sm font-semibold text-gray-700 flex items-center">
                <span className="mr-2">=�</span>
                Job Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500 resize-none"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="block- text-sm font-semibold text-gray-700 flex items-center">
                <span className="mr-2">�</span>
                Required Skills
                <span className="text-gray-500 text-xs ml-2">(comma separated)</span>
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. JavaScript, React, Node.js, Python, Django"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block- text-sm font-semibold text-gray-700 flex items-center">
                <span className="mr-2">=�</span>
                Location
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. New York, NY or Remote"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block- text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">=�</span>
                  Minimum Salary
                  <span className="text-gray-500 text-xs ml-2">(optional)</span>
                </label>
                <input
                  type="number"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="e.g. 75000"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block- text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">=�</span>
                  Maximum Salary
                  <span className="text-gray-500 text-xs ml-2">(optional)</span>
                </label>
                <input
                  type="number"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="e.g. 120000"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-4">
              <label className="block- text-sm font-semibold text-gray-700 flex items-center">
                <span className="mr-2">�</span>
                Job Type
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {jobTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, job_type: type.value })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      formData.job_type === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Posting Job...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Post Job</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">=�</span>
            Tips for a Great Job Posting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">"</span>
              <span>Be specific about requirements and responsibilities</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">"</span>
              <span>Highlight your company culture and benefits</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">"</span>
              <span>Use clear, inclusive language</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCreate;
