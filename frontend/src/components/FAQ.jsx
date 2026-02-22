import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: 'How do I create an account on JobPortal?',
      answer: 'Click the "Sign Up" button in the navigation bar and fill out the registration form. Choose whether you\'re a job seeker or recruiter, then verify your email to get started.'
    },
    {
      question: 'Is job searching free?',
      answer: 'Yes! Basic job searching, profile creation, and application submission are completely free for all users. Premium features are available for recruiters who want advanced analytics and priority posting.'
    },
    {
      question: 'How do I post a job as a recruiter?',
      answer: 'After creating a recruiter account, navigate to your dashboard and click "Post Job". Fill in the job details, requirements, and salary information. Your job will be live within 24 hours after review.'
    },
    {
      question: 'Can I edit my job applications?',
      answer: 'Once submitted, job applications cannot be edited to ensure fairness. However, you can withdraw an application if the position hasn\'t been filled yet and reapply to other positions.'
    },
    {
      question: 'How does the matching algorithm work?',
      answer: 'Our AI-powered matching system considers your skills, experience, location preferences, and job requirements to suggest the most relevant opportunities. You can also save searches and get email notifications for new matches.'
    },
    {
      question: 'What should I include in my profile?',
      answer: 'A complete profile includes your professional summary, work experience, education, skills, and portfolio links. The more detailed your profile, the better our matching algorithm can work for you.'
    },
    {
      question: 'How do I contact a company directly?',
      answer: 'You can message companies directly through our platform once you\'ve applied to their job or been shortlisted. Recruiters can also initiate contact with candidates they\'re interested in.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your explicit consent.'
    },
    {
      question: 'Can I change my account type?',
      answer: 'Yes, you can switch between job seeker and recruiter accounts. Contact our support team, and they\'ll help you migrate your account and data.'
    },
    {
      question: 'What if I forget my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a secure link to reset your password. Make sure to check your spam folder if you don\'t see the email.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Use the "Report" button on any job posting, profile, or message. Our moderation team reviews reports within 24 hours and takes appropriate action to maintain a professional environment.'
    },
    {
      question: 'Are there mobile apps available?',
      answer: 'We\'re currently developing mobile apps for iOS and Android. In the meantime, our responsive website works perfectly on all mobile devices for a seamless experience.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-accent-300 to-accent-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-gradient-to-r from-success-300 to-success-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-gradient-to-r from-warning-300 to-warning-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 animate-fade-in">
            Frequently Asked <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using JobPortal. Can't find what you're looking for?
            Feel free to contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="input-field pl-12"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 animate-slide-up">
          {faqData.map((faq, index) => (
            <div key={index} className="card overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-200 pr-4">
                  {faq.question}
                </h3>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 ${
                  openItems.has(index)
                    ? 'bg-primary-100 text-primary-600 rotate-180'
                    : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'
                }`}>
                  <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-16 card p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Getting Started', count: 3, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { name: 'Account & Profile', count: 4, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { name: 'Jobs & Applications', count: 3, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4' },
              { name: 'Technical Support', count: 2, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
            ].map((category, index) => (
              <button
                key={category.name}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:from-primary-50 hover:to-primary-100 transition-all duration-300 hover:scale-105 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors duration-200">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.count} questions</p>
              </button>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 card p-8 text-center animate-slide-up bg-gradient-to-r from-primary-50 to-secondary-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-3 hover:scale-105 transition-transform duration-200">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact Support</span>
              </span>
            </button>
            <button className="btn-secondary px-8 py-3 hover:scale-105 transition-transform duration-200">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Live Chat</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
