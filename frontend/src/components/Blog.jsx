import React, { useState } from 'react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Writing a Standout Resume',
      excerpt: 'Learn how to create a resume that catches recruiters\' attention and showcases your best qualities.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'career-advice',
      image: '📄',
      tags: ['Resume', 'Job Search', 'Career Tips']
    },
    {
      id: 2,
      title: 'The Future of Remote Work in 2024',
      excerpt: 'Explore the latest trends and technologies shaping the remote work landscape.',
      author: 'Mike Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      category: 'industry-trends',
      image: '🏠',
      tags: ['Remote Work', 'Future of Work', 'Technology']
    },
    {
      id: 3,
      title: 'How to Ace Your Technical Interview',
      excerpt: 'Prepare for technical interviews with these proven strategies and practice tips.',
      author: 'Emma Davis',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'interview-tips',
      image: '💻',
      tags: ['Interviews', 'Technical Skills', 'Preparation']
    },
    {
      id: 4,
      title: 'Building a Personal Brand on LinkedIn',
      excerpt: 'Discover how to leverage LinkedIn to build a strong professional presence.',
      author: 'Alex Rodriguez',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'career-advice',
      image: '👔',
      tags: ['LinkedIn', 'Personal Branding', 'Networking']
    },
    {
      id: 5,
      title: 'Salary Negotiation Strategies That Work',
      excerpt: 'Master the art of salary negotiation with these effective techniques.',
      author: 'Lisa Wang',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'career-advice',
      image: '💰',
      tags: ['Salary', 'Negotiation', 'Career Growth']
    },
    {
      id: 6,
      title: 'The Rise of AI in Recruitment',
      excerpt: 'How artificial intelligence is transforming the hiring process.',
      author: 'David Kim',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'industry-trends',
      image: '🤖',
      tags: ['AI', 'Recruitment', 'Technology']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'career-advice', name: 'Career Advice', count: blogPosts.filter(p => p.category === 'career-advice').length },
    { id: 'interview-tips', name: 'Interview Tips', count: blogPosts.filter(p => p.category === 'interview-tips').length },
    { id: 'industry-trends', name: 'Industry Trends', count: blogPosts.filter(p => p.category === 'industry-trends').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-accent-300 to-accent-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-success-300 to-success-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-gradient-to-r from-warning-300 to-warning-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 animate-fade-in">
            JobPortal <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, tips, and trends to help you navigate your career journey and stay ahead in the job market.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="card p-6 animate-slide-up group hover:shadow-2xl transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image/Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{post.image}</span>
              </div>

              {/* Category */}
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-sm font-medium rounded-full mb-3">
                {categories.find(cat => cat.id === post.category)?.name}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{post.author.charAt(0)}</span>
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>{post.readTime}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Read More */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 group-hover:translate-x-1 transform transition-transform duration-200">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="card p-8 text-center animate-slide-up bg-gradient-to-r from-primary-50 via-white to-secondary-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get the latest career advice, industry insights, and job market trends delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 input-field"
              />
              <button className="btn-primary px-8 py-3 whitespace-nowrap hover:scale-105 transition-transform duration-200">
                Subscribe
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-16 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Career Growth', 'Interview Preparation', 'Resume Tips', 'Salary Negotiation', 'Remote Work', 'Job Search', 'Networking', 'Skill Development', 'Workplace Culture', 'Industry Trends'].map((tag, index) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-primary-100 hover:to-primary-200 text-gray-700 hover:text-primary-800 rounded-full font-medium transition-all duration-200 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
