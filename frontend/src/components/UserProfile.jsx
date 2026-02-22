import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock user data
    setUser({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      role: 'developer',
      location: 'New York, NY',
      bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications.',
      skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
      experience: [
        { company: 'TechCorp', role: 'Senior Developer', duration: '2020 - Present', description: 'Led development of multiple client projects' },
        { company: 'StartupXYZ', role: 'Full Stack Developer', duration: '2018 - 2020', description: 'Built MVPs and maintained legacy systems' }
      ],
      education: [
        { degree: 'BS Computer Science', school: 'University of Tech', year: '2018' }
      ],
      achievements: ['Employee of the Month', 'Hackathon Winner', 'Open Source Contributor']
    });

    // Mock applications data
    setApplications([
      { id: 1, job_title: 'Senior React Developer', company: 'TechCorp', status: 'pending', applied_date: '2024-01-15' },
      { id: 2, job_title: 'Full Stack Developer', company: 'StartupXYZ', status: 'interview', applied_date: '2024-01-10' }
    ]);
  }, [id]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-accent-300 to-accent-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-success-300 to-success-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="card p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-2xl animate-glow">
              <span className="text-5xl font-black text-white">{user.first_name.charAt(0)}{user.last_name.charAt(0)}</span>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-gray-900 mb-2 animate-fade-in">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-xl text-gray-600 mb-4 capitalize">{user.role}</p>
              <p className="text-gray-700 leading-relaxed mb-4">{user.bio}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{user.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{user.location}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button className="btn-primary px-8 py-3 hover:scale-105 transition-transform duration-200">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Message</span>
                </span>
              </button>
              <button className="btn-secondary px-8 py-3 hover:scale-105 transition-transform duration-200">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>Connect</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'experience', label: 'Experience', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { id: 'applications', label: 'Applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Skills */}
              <div className="lg:col-span-2">
                <div className="card p-6 animate-slide-up">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 px-3 py-1 rounded-full text-sm font-medium animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="card p-6 mt-6 animate-slide-up">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h3>
                  <div className="space-y-3">
                    {user.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-warning-50 to-warning-100 rounded-lg animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="w-8 h-8 bg-warning-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <span className="text-warning-800 font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="card p-6 animate-slide-up">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-4">
                  {user.education.map((edu, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <h4 className="font-semibold text-secondary-800">{edu.degree}</h4>
                      <p className="text-secondary-600 text-sm">{edu.school}</p>
                      <p className="text-secondary-500 text-sm">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              {user.experience.map((exp, index) => (
                <div key={index} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-lg text-primary-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600 mb-3">{exp.duration}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="card p-6 animate-slide-up">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Job Applications</h3>
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{app.job_title}</h4>
                      <p className="text-gray-600">{app.company}</p>
                      <p className="text-sm text-gray-500">Applied on {new Date(app.applied_date).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                      app.status === 'interview' ? 'bg-success-100 text-success-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
