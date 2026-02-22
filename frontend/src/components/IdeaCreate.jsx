import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IdeaCreate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    problem_statement: '',
    proposed_solution: '',
    target_audience: '',
    business_model: '',
    category: 'tech',
    tags: [],
    estimated_cost: '',
    timeline: '',
    team_size: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Basic Info', icon: '1' },
    { id: 2, title: 'Problem & Solution', icon: '2' },
    { id: 3, title: 'Market & Business', icon: '3' },
    { id: 4, title: 'Details & Review', icon: '4' }
  ];

  const categories = [
    { value: 'tech', label: 'Technology', icon: '💻', description: 'AI, SaaS, Mobile Apps, Web Development' },
    { value: 'health', label: 'Healthcare', icon: '🏥', description: 'Medical, Fitness, Wellness, Telehealth' },
    { value: 'finance', label: 'Finance', icon: '💰', description: 'FinTech, Banking, Investment, Crypto' },
    { value: 'education', label: 'Education', icon: '🎓', description: 'EdTech, Learning, Online Courses' },
    { value: 'ecommerce', label: 'E-commerce', icon: '🛒', description: 'Retail, Marketplace, Shopping' },
    { value: 'other', label: 'Other', icon: '🚀', description: 'Innovation, Startup, Business Solutions' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (tag) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleTagRemove = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title.trim() && formData.category;
      case 2:
        return formData.problem_statement.trim() && formData.proposed_solution.trim();
      case 3:
        return formData.target_audience.trim() && formData.business_model.trim();
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/ideas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/ideas'), 2000);
      } else {
        setError('Failed to submit idea. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-success-50 to-success-100">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-success-600 mb-4">Idea Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your innovative idea has been shared with the community.</p>
          <p className="text-sm text-gray-500">Redirecting to ideas page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-accent-300 to-accent-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-r from-success-300 to-success-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 animate-fade-in">
            Submit Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Innovation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your groundbreaking idea with the community and get valuable feedback from industry experts.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all duration-300 ${
                  step.id <= currentStep
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.id < currentStep ? '✓' : step.icon}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${step.id <= currentStep ? 'text-primary-600' : 'text-gray-400'}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                    step.id < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="card p-8 animate-slide-up">
          {error && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg animate-shake">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-danger-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-danger-700">{error}</span>
              </div>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">1</span>
                Tell us about your idea
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Idea Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Give your idea a catchy, memorable name"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Keep it under 100 characters for maximum impact</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Category *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`p-4 border-2 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                          formData.category === category.value
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <span className="font-semibold text-gray-900">{category.label}</span>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Problem & Solution */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">2</span>
                Define the problem and your solution
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    The Problem *
                  </label>
                  <textarea
                    name="problem_statement"
                    value={formData.problem_statement}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="What problem are you solving? Be specific about the pain points and challenges."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Describe the problem clearly and concisely</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Solution *
                  </label>
                  <textarea
                    name="proposed_solution"
                    value={formData.proposed_solution}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="How does your idea solve this problem? What makes your approach unique?"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Explain your innovative solution and what sets it apart</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Market & Business */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">3</span>
                Market opportunity and business model
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Audience *
                  </label>
                  <textarea
                    name="target_audience"
                    value={formData.target_audience}
                    onChange={handleChange}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Who will use your product/service? Describe their demographics, behaviors, and needs."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Define your ideal customer profile</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Model *
                  </label>
                  <textarea
                    name="business_model"
                    value={formData.business_model}
                    onChange={handleChange}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="How will you make money? Subscription, freemium, advertising, marketplace fees, etc."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Describe your revenue strategy and monetization plan</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estimated Cost
                    </label>
                    <input
                      type="text"
                      name="estimated_cost"
                      value={formData.estimated_cost}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="$50K - $200K"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Timeline
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="6-12 months"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Team Size
                    </label>
                    <input
                      type="text"
                      name="team_size"
                      value={formData.team_size}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="3-5 people"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tags & Review */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">4</span>
                Final touches and review
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Add relevant tags (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const tag = e.target.value.trim();
                        if (tag) {
                          handleTagAdd(tag);
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">Add up to 5 relevant tags to help others discover your idea</p>
                </div>

                {/* Review Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Submission</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Title:</span>
                      <p className="text-gray-900 mt-1">{formData.title}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <p className="text-gray-900 mt-1">{categories.find(c => c.value === formData.category)?.label}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-700">Problem:</span>
                      <p className="text-gray-900 mt-1 line-clamp-2">{formData.problem_statement}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-700">Solution:</span>
                      <p className="text-gray-900 mt-1 line-clamp-2">{formData.proposed_solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`btn-secondary px-6 py-2 ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </span>
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className={`btn-primary px-6 py-2 ${
                  !validateStep(currentStep) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`btn-primary px-8 py-3 text-lg font-semibold ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 animate-glow'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Submit Idea</span>
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 card p-6 bg-gradient-to-r from-accent-50 to-primary-50 animate-slide-up">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pro Tips for a Great Submission</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>" Be specific about the problem you're solving</li>
                <li>" Explain what makes your solution unique and innovative</li>
                <li>" Include realistic market size and business potential</li>
                <li>" Add relevant tags to increase visibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCreate;
