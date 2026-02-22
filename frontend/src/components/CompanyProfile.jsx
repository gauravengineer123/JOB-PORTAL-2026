import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Mock company data - in real app, fetch from API
    setCompany({
      id: 1,
      name: 'TechCorp Solutions',
      logo: 'TC',
      description: 'Leading technology solutions provider specializing in web development, mobile apps, and cloud services.',
      location: 'San Francisco, CA',
      website: 'https://techcorp.com',
      employees: '500-1000',
      founded: '2015',
      industry: 'Technology',
      benefits: ['Health Insurance', 'Remote Work', 'Professional Development', 'Flexible Hours'],
      culture: ['Innovation', 'Collaboration', 'Work-Life Balance', 'Diversity & Inclusion']
    });

    // Mock jobs data
    setJobs([
      { id: 1, title: 'Senior React Developer', type: 'Full-time', location: 'Remote' },
      { id: 2, title: 'Product Manager', type: 'Full-time', location: 'San Francisco' },
      { id: 3, title: 'DevOps Engineer', type: 'Contract', location: 'Remote' }
    ]);
  }, [id]);

  if (!company) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-accent-300 to-accent-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-success-300 to-success-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-warning-300 to-warning-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <div className="card p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Logo */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
              <span className="text-3xl font-black text-white">{company.logo}</span>
            </div>

            {/* Company Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-gray-900 mb-2 animate-fade-in">{company.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{company.tagline}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{company.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <a href={company.website} className="text-primary-600 hover:text-primary-700 transition-colors duration-200">{company.website}</a>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>{company.employees} employees</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button className="btn-primary px-8 py-3 hover:scale-105 transition-transform duration-200">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Follow Company</span>
                </span>
              </button>
              <button className="btn-secondary px-8 py-3 hover:scale-105 transition-transform duration-200">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="card p-6 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {company.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{company.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg">
                  <div className="text-sm text-primary-600 font-semibold mb-1">Founded</div>
                  <div className="text-lg font-bold text-primary-700">{company.founded}</div>
                </div>
                <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-4 rounded-lg">
                  <div className="text-sm text-secondary-600 font-semibold mb-1">Industry</div>
                  <div className="text-lg font-bold text-secondary-700">{company.industry}</div>
                </div>
              </div>

              {/* Culture */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Company Culture</h3>
              <div className="flex flex-wrap gap-2">
                {company.culture.map((value, index) => (
                  <span key={index} className="bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 px-3 py-1 rounded-full text-sm font-medium animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="card p-6 mt-6 animate-slide-up">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-success-50 to-success-100 rounded-lg animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-success-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="card p-6 animate-slide-up">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Open Positions</h3>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-200">{job.title}</h4>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full">{job.type}</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn-secondary py-2">
              View All Jobs
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="card p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Our Employees Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'Senior Developer', quote: 'Amazing work environment with great growth opportunities!' },
              { name: 'Mike Chen', role: 'Product Manager', quote: 'The company culture here is truly exceptional.' },
              { name: 'Emma Davis', role: 'Designer', quote: 'Love the creative freedom and supportive team.' }
            ].map((testimonial, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                </div>
                <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
