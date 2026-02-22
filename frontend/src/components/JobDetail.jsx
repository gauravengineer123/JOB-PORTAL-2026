import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState({ cover_letter: '' });
  const [applied, setApplied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchJob = useCallback(async () => {
    // Mock data for development - replace with actual API call
    const mockJobs = [
      {
        id: 1,
        title: 'React Frontend Developer 1',
        description: 'Join our team as a React Frontend Developer. We are looking for talented individuals with experience in frontend technologies. This is an exciting opportunity to work on cutting-edge web development projects and contribute to our growing company in Mumbai.',
        location: 'Mumbai',
        salary_min: 600000,
        salary_max: 900000,
        job_type: 'full-time',
        category: 'Frontend Developer',
        skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Redux', 'Git'],
        created_by_username: 'TechCorp',
        created_at: '2024-01-15T10:00:00Z',
        experience: '2-4 years of experience in React development',
        work: 'Develop and maintain responsive web applications, collaborate with design team, implement UI/UX designs',
        syllabus: 'React fundamentals, Hooks, Context API, Redux, React Router, Testing with Jest',
        languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
        shift: '9 AM - 6 PM (Monday to Friday)',
        interview: '3 rounds: Technical screening, coding assessment, final interview with team lead',
        requirements: [
          '2-4 years of experience in React development',
          'Strong knowledge of JavaScript, HTML, and CSS',
          'Experience with modern frontend tools and frameworks',
          'Familiarity with version control systems like Git',
          'Excellent problem-solving skills and attention to detail'
        ],
        benefits: [
          'Competitive salary in INR',
          'Health insurance and provident fund',
          'Flexible working hours and work from home options',
          'Professional development budget and learning opportunities',
          'Modern office with great amenities in Mumbai'
        ]
      },
      {
        id: 2,
        title: 'Node.js Backend Developer 1',
        description: 'Join our team as a Node.js Backend Developer. We are looking for talented individuals with experience in backend technologies. This is an exciting opportunity to work on cutting-edge web development projects and contribute to our growing company in Delhi.',
        location: 'Delhi',
        salary_min: 70000,
        salary_max: 100000,
        job_type: 'full-time',
        category: 'Backend Developer',
        skills: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'REST APIs'],
        created_by_username: 'InnovateLab',
        created_at: '2024-01-15T10:00:00Z',
        experience: '3-5 years of experience in Node.js development',
        work: 'Design and develop scalable backend services, implement RESTful APIs, manage databases',
        syllabus: 'Node.js fundamentals, Express framework, MongoDB, REST APIs, Authentication',
        languages: ['JavaScript', 'TypeScript', 'SQL'],
        shift: '10 AM - 7 PM (Monday to Saturday)',
        interview: '4 rounds: HR screening, technical assessment, coding challenge, managerial interview',
        requirements: [
          '3-5 years of experience in Node.js development',
          'Strong knowledge of JavaScript and backend frameworks',
          'Experience with database management and API development',
          'Familiarity with cloud services and deployment',
          'Excellent problem-solving skills and attention to detail'
        ],
        benefits: [
          'Competitive salary package',
          'Comprehensive health benefits',
          'Remote work flexibility',
          'Learning and development programs',
          'Modern workspace in Delhi tech hub'
        ]
      }
    ];

    const mockJob = mockJobs.find(job => job.id === parseInt(id)) || mockJobs[0];
    setJob(mockJob);
  }, [id]);

  useEffect(() => {
    fetchJob();
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/api/accounts/me/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => response.json()).then(data => {
        setUser(data);
      });
    }
  }, [id, fetchJob]);

  const handleApply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/applications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ job: id, ...application })
      });
      if (response.ok) {
        setApplied(true);
      }
    } catch (err) {
      console.error('Application failed');
    }
  };

  // Full Stack Development Technologies by Level
  const fullStackTechnologies = {
    interview: {
      title: 'Interview Level',
      description: 'Basic concepts and fundamental knowledge required for entry-level positions',
      frontend: [
        { name: 'HTML', level: 'Basic structure and semantic elements', icon: '' },
        { name: 'CSS', level: 'Basic styling and layouts', icon: '' },
        { name: 'JavaScript', level: 'Variables, functions, basic DOM manipulation', icon: '' },
        { name: 'Git', level: 'Basic version control commands', icon: '' }
      ],
      backend: [
        { name: 'Node.js', level: 'Basic server setup and file operations', icon: '' },
        { name: 'Express.js', level: 'Basic routing and middleware', icon: '' },
        { name: 'REST APIs', level: 'Understanding HTTP methods and status codes', icon: '' }
      ],
      database: [
        { name: 'SQL', level: 'Basic queries (SELECT, INSERT, UPDATE, DELETE)', icon: '' },
        { name: 'MongoDB', level: 'Basic CRUD operations', icon: '' }
      ]
    },
    beginner: {
      title: 'Beginner Level',
      description: '6-12 months of experience, building simple applications',
      frontend: [
        { name: 'React/Vue/Angular', level: 'Component-based development, state management', icon: '' },
        { name: 'CSS Frameworks', level: 'Bootstrap, Tailwind CSS, or similar', icon: '' },
        { name: 'ES6+ Features', level: 'Arrow functions, destructuring, async/await', icon: ''},
        { name: 'Responsive Design', level: 'Media queries, flexbox, grid', icon: '' }
      ],
      backend: [
        { name: 'Authentication', level: 'JWT, sessions, basic security', icon: '' },
        { name: 'API Development', level: 'RESTful API design and implementation', icon: '' },
        { name: 'Error Handling', level: 'Try-catch, middleware for errors', icon: '' }
      ],
      database: [
        { name: 'Database Design', level: 'Normalization, relationships', icon: '' },
        { name: 'ORM/ODM', level: 'Mongoose, Sequelize, or similar', icon: '' }
      ]
    },
    intermediate: {
      title: 'Intermediate Level',
      description: '1-3 years of experience, building complex applications',
      frontend: [
        { name: 'Advanced React', level: 'Hooks, Context API, custom hooks', icon: '' },
        { name: 'State Management', level: 'Redux, Zustand, or similar', icon: '' },
        { name: 'Testing', level: 'Jest, React Testing Library, Cypress', icon: '' },
        { name: 'TypeScript', level: 'Type safety, interfaces, generics', icon: '' },
        { name: 'Performance', level: 'Code splitting, lazy loading, optimization', icon: '' }
      ],
      backend: [
        { name: 'Microservices', level: 'Service architecture, API gateways', icon: '' },
        { name: 'Caching', level: 'Redis, in-memory caching', icon: '' },
        { name: 'Security', level: 'OWASP, input validation, CORS', icon: '' },
        { name: 'GraphQL', level: 'Schema design, resolvers, Apollo', icon: '' }
      ],
      database: [
        { name: 'Advanced SQL', level: 'Complex queries, indexing, optimization', icon: '' },
        { name: 'Database Scaling', level: 'Sharding, replication, connection pooling', icon: '' }
      ]
    },
    advanced: {
      title: 'Advanced Level',
      description: '3+ years of experience, architect-level knowledge',
      frontend: [
        { name: 'Architecture', level: 'Micro-frontends, module federation', icon: '' },
        { name: 'Advanced Patterns', level: 'Render props, compound components, HOCs', icon: '' },
        { name: 'Performance Monitoring', level: 'Lighthouse, Web Vitals, RUM', icon: '' },
        { name: 'PWA & Offline', level: 'Service workers, caching strategies', icon: '' },
        { name: 'Build Tools', level: 'Webpack, Vite, Rollup configuration', icon: '' }
      ],
      backend: [
        { name: 'System Design', level: 'Scalability, load balancing, CDNs', icon: '' },
        { name: 'DevOps', level: 'CI/CD pipelines, containerization (Docker)', icon: '' },
        { name: 'Cloud Platforms', level: 'AWS, Azure, GCP services', icon: '' },
        { name: 'Monitoring', level: 'Logging, metrics, alerting (ELK stack)', icon: '' }
      ],
      database: [
        { name: 'NoSQL at Scale', level: 'Distributed databases, consistency models', icon: '' },
        { name: 'Data Warehousing', level: 'ETL processes, analytics databases', icon: '' },
        { name: 'Real-time Data', level: 'Stream processing, event-driven architecture', icon: '' }
      ]
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  const isFullStackJob = job.title.toLowerCase().includes('full stack') || job.category === 'Software Development';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/jobs" className="text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="text-white/80">Back to Jobs</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">{job.title.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-white/80">
                    <span className="flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}</span>
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {job.job_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              {user && user.role === 'seeker' && !applied ? (
                <button
                  onClick={() => setActiveTab('apply')}
                  className="w-full lg:w-auto bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Apply Now
                </button>
              ) : applied ? (
                <div className="w-full lg:w-auto bg-green-500 text-white px-8 py-3 rounded-lg font-semibold text-center">
                   Applied
                </div>
              ) : (
                <Link
                  to="/login"
                  className="w-full lg:w-auto bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg text-center block"
                >
                  Login to Apply
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '' },
              { id: 'requirements', label: 'Requirements', icon: '' },
              ...(isFullStackJob ? [{ id: 'technologies', label: 'Technologies', icon: '' }] : []),
              { id: 'company', label: 'Company', icon: '' },
              { id: 'apply', label: 'Apply', icon: '' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{job.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type</span>
                    <span className="font-medium capitalize">{job.job_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Range</span>
                    <span className="font-medium">�{job.salary_min?.toLocaleString()} - �{job.salary_max?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{job.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience Required</span>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Work Shift</span>
                    <span className="font-medium">{job.shift}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Skills & Technologies</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Programming Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Work Responsibilities</h3>
                <p className="text-gray-700 leading-relaxed">{job.work}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Interview Process</h3>
                <p className="text-gray-700 leading-relaxed">{job.interview}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Learning Syllabus</h3>
              <p className="text-gray-700 leading-relaxed">{job.syllabus}</p>
            </div>

            {job.benefits && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Benefits & Perks</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Must Have</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nice to Have</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Experience with cloud platforms (AWS, Azure, GCP)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Knowledge of DevOps practices and CI/CD</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Agile/Scrum methodology experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technologies' && isFullStackJob && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Full Stack Development Technologies</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete roadmap of technologies and skills needed for full stack web development,
                from interview preparation to advanced professional level.
              </p>
            </div>

            {Object.entries(fullStackTechnologies).map(([level, data]) => (
              <div key={level} className="bg-white rounded-xl shadow-sm p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h3>
                  <p className="text-gray-600">{data.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                      <span className="mr-2"></span> Frontend Technologies
                    </h4>
                    <div className="space-y-4">
                      {data.frontend.map((tech, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <div>
                              <h5 className="font-semibold text-gray-900">{tech.name}</h5>
                              <p className="text-sm text-gray-600">{tech.level}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <span className="mr-2"></span> Backend Technologies
                    </h4>
                    <div className="space-y-4">
                      {data.backend.map((tech, index) => (
                        <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <div>
                              <h5 className="font-semibold text-gray-900">{tech.name}</h5>
                              <p className="text-sm text-gray-600">{tech.level}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-purple-600 mb-4 flex items-center">
                      <span className="mr-2"></span> Database Technologies
                    </h4>
                    <div className="space-y-4">
                      {data.database.map((tech, index) => (
                        <div key={index} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <div>
                              <h5 className="font-semibold text-gray-900">{tech.name}</h5>
                              <p className="text-sm text-gray-600">{tech.level}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'company' && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">{job.created_by_username.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{job.created_by_username}</h2>
                <p className="text-gray-700 mb-6">
                  {job.created_by_username} is a leading technology company focused on delivering innovative solutions
                  to businesses worldwide. We believe in fostering a collaborative environment where talented individuals
                  can grow and contribute to meaningful projects.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">500+</div>
                    <div className="text-gray-600">Employees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">10+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">50+</div>
                    <div className="text-gray-600">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this position</h2>

              {applied ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">
                    Thank you for your application. We'll review your submission and get back to you soon.
                  </p>
                </div>
              ) : user && user.role === 'seeker' ? (
                <form onSubmit={handleApply} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      value={application.cover_letter}
                      onChange={(e) => setApplication({ cover_letter: e.target.value })}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      required
                      rows={8}
                      className="input-field resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-lg font-semibold"
                  >
                    Submit Application
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Required</h3>
                  <p className="text-gray-600 mb-6">
                    You need to be logged in as a job seeker to apply for this position.
                  </p>
                  <div className="space-x-4">
                    <Link to="/login" className="btn-primary px-6 py-2">
                      Login
                    </Link>
                    <Link to="/register" className="btn-secondary px-6 py-2">
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
