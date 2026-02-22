import React, { useState, useEffect } from 'react';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' }
  ];

  // Floating elements animation
  const [floatingElements, setFloatingElements] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setFloatingElements(elements);
  }, []);

  const generateResumeHTML = () => {
    const { personal, experience, education, skills, projects } = resumeData;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin: 0; font-size: 32px;">${personal.firstName} ${personal.lastName}</h1>
          <div style="color: #6b7280; margin-top: 10px;">
            <p style="margin: 5px 0;">${personal.email} | ${personal.phone}</p>
            <p style="margin: 5px 0;">${personal.address}</p>
          </div>
        </div>

        <!-- Summary -->
        ${personal.summary ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Professional Summary</h2>
            <p style="color: #4b5563; line-height: 1.6;">${personal.summary}</p>
          </div>
        ` : ''}

        <!-- Experience -->
        ${experience.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Work Experience</h2>
            ${experience.map(exp => `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #1f2937; margin: 0;">${exp.position}</h3>
                <p style="color: #3b82f6; margin: 5px 0; font-weight: bold;">${exp.company}</p>
                <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">
                  ${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''} - 
                  ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Present'}
                </p>
                <p style="color: #4b5563; line-height: 1.6;">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Education -->
        ${education.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Education</h2>
            ${education.map(edu => `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #1f2937; margin: 0;">${edu.degree} in ${edu.field}</h3>
                <p style="color: #3b82f6; margin: 5px 0; font-weight: bold;">${edu.school}</p>
                <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">
                  Graduated: ${edu.graduationDate ? new Date(edu.graduationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''}
                  ${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Skills -->
        ${skills.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Skills</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
              ${skills.map(skill => `
                <div style="background: #f3f4f6; padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 500;">${skill.name}</span>
                  <span style="color: #6b7280; font-size: 12px;">${skill.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Projects -->
        ${projects.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Projects</h2>
            ${projects.map(project => `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #1f2937; margin: 0;">${project.name}</h3>
                ${project.link ? `<p style="color: #3b82f6; margin: 5px 0;"><a href="${project.link}" style="color: #3b82f6;">${project.link}</a></p>` : ''}
                <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">
                  ${project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''} - 
                  ${project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Present'}
                </p>
                ${project.technologies ? `<p style="color: #6b7280; font-weight: 500; margin: 5px 0;"><strong>Technologies:</strong> ${project.technologies}</p>` : ''}
                <p style="color: #4b5563; line-height: 1.6;">${project.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    // For now, we'll use a simple approach. In a real app, you'd use jsPDF or similar
    const htmlContent = generateResumeHTML();
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Resume - ${resumeData.personal.firstName} ${resumeData.personal.lastName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px;">
            <button onclick="window.print()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
              Print/Save as PDF
            </button>
            <button onclick="window.close()" style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-left: 10px;">
              Close
            </button>
          </div>
          ${htmlContent}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        graduationDate: '',
        gpa: ''
      }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        id: Date.now(),
        name: '',
        level: 'Beginner'
      }]
    }));
  };

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: ''
      }]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute pointer-events-none animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.id * 0.5}s`,
            animationDuration: `${element.speed * 3}s`
          }}
        >
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-20"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
          />
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600 text-lg">Create your professional resume with ease</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resume Sections</h2>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{section.icon}</span>
                      <span className="font-medium">{section.label}</span>
                      <div className={`ml-auto w-2 h-2 rounded-full ${
                        activeSection === section.id ? 'bg-white' : 'bg-gray-300'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((Object.values(resumeData).filter(section =>
                    Array.isArray(section) ? section.length > 0 : Object.values(section).some(v => v !== '')
                  ).length / sections.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(Object.values(resumeData).filter(section =>
                        Array.isArray(section) ? section.length > 0 : Object.values(section).some(v => v !== '')
                      ).length / sections.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Personal Information */}
              {activeSection === 'personal' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3">👤</span> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        value={resumeData.personal.firstName}
                        onChange={(e) => updatePersonal('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        value={resumeData.personal.lastName}
                        onChange={(e) => updatePersonal('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) => updatePersonal('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={resumeData.personal.phone}
                        onChange={(e) => updatePersonal('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={resumeData.personal.address}
                      onChange={(e) => updatePersonal('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                      placeholder="City, State, Country"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                    <textarea
                      value={resumeData.personal.summary}
                      onChange={(e) => updatePersonal('summary', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 resize-none"
                      placeholder="Write a brief summary about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <span className="mr-3">💼</span> Work Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Experience</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Position"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="date"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="date"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <textarea
                          placeholder="Job Description"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    ))}
                    {resumeData.experience.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">💼</div>
                        <p className="text-lg">No work experience added yet</p>
                        <p className="text-sm">Click "Add Experience" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <span className="mr-3">🎓</span> Education
                    </h3>
                    <button
                      onClick={addEducation}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Education</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="School/University Name"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Degree (e.g. Bachelor of Science)"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Field of Study"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="date"
                            placeholder="Graduation Date"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="GPA (optional)"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                    {resumeData.education.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">🎓</div>
                        <p className="text-lg">No education added yet</p>
                        <p className="text-sm">Click "Add Education" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <span className="mr-3">⚡</span> Skills
                    </h3>
                    <button
                      onClick={addSkill}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Skill</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resumeData.skills.map((skill, index) => (
                      <div key={skill.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Skill Name (e.g. JavaScript, Python, React)"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Proficiency Level</span>
                            <span className="text-sm text-gray-500">{skill.level}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                skill.level === 'Beginner' ? 'bg-red-400 w-1/4' :
                                skill.level === 'Intermediate' ? 'bg-yellow-400 w-2/4' :
                                skill.level === 'Advanced' ? 'bg-blue-400 w-3/4' :
                                'bg-green-400 w-full'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {resumeData.skills.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">⚡</div>
                        <p className="text-lg">No skills added yet</p>
                        <p className="text-sm">Click "Add Skill" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <span className="mr-3">🚀</span> Projects
                    </h3>
                    <button
                      onClick={addProject}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Project</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={project.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
                        <button
                          onClick={() => removeProject(project.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Project Name"
                            value={project.name}
                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="url"
                            placeholder="Project Link (optional)"
                            value={project.link}
                            onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="date"
                            placeholder="Start Date"
                            value={project.startDate}
                            onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="date"
                            placeholder="End Date (optional)"
                            value={project.endDate}
                            onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="Technologies Used (e.g. React, Node.js, MongoDB)"
                            value={project.technologies}
                            onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    ))}
                    {resumeData.projects.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">🚀</div>
                        <p className="text-lg">No projects added yet</p>
                        <p className="text-sm">Click "Add Project" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadPDF}
                disabled={!resumeData.personal.firstName && !resumeData.personal.lastName}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                  (!resumeData.personal.firstName && !resumeData.personal.lastName)
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </button>
              <button
                onClick={handlePreview}
                disabled={!resumeData.personal.firstName && !resumeData.personal.lastName}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                  (!resumeData.personal.firstName && !resumeData.personal.lastName)
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Preview Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Resume Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: generateResumeHTML() }}
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownloadPDF();
                  setShowPreview(false);
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
