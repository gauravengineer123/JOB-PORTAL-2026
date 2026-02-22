import React, { useState, useEffect } from 'react'

// Mock data for ideas
const mockIdeas = [
  {
    id: 1,
    title: 'AI-Powered Job Matching Platform',
    description: 'Use machine learning to match candidates with perfect job opportunities based on skills, experience, and cultural fit.',
    category: 'tech',
    image: '💻',
    author: 'Alex Chen',
    authorAvatar: 'AC',
    trending: true,
    featured: true,
    likes: 342,
    comments: 28,
    tags: ['AI', 'HR Tech', 'Machine Learning'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 2,
    title: 'Telehealth Mental Wellness App',
    description: 'On-demand mental health support with licensed therapists, mood tracking, and meditation guides.',
    category: 'health',
    image: '🏥',
    author: 'Sarah Johnson',
    authorAvatar: 'SJ',
    trending: true,
    featured: false,
    likes: 256,
    comments: 42,
    tags: ['Healthcare', 'Mental Health', 'Telemedicine'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 3,
    title: 'Decentralized Freelance Marketplace',
    description: 'Blockchain-based platform connecting freelancers with clients using smart contracts for secure payments.',
    category: 'finance',
    image: '💰',
    author: 'Mike Rodriguez',
    authorAvatar: 'MR',
    trending: false,
    featured: false,
    likes: 189,
    comments: 15,
    tags: ['Blockchain', 'FinTech', 'Smart Contracts'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 4,
    title: 'Interactive Coding Bootcamp Platform',
    description: 'Gamified learning platform with real-time coding challenges, peer reviews, and mentor matching.',
    category: 'education',
    image: '📚',
    author: 'Emily Davis',
    authorAvatar: 'ED',
    trending: true,
    featured: true,
    likes: 421,
    comments: 56,
    tags: ['EdTech', 'Gamification', 'Programming'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 5,
    title: 'Sustainable E-commerce Aggregator',
    description: 'Platform aggregating eco-friendly products with carbon footprint tracking and sustainability scores.',
    category: 'ecommerce',
    image: '🛒',
    author: 'David Kim',
    authorAvatar: 'DK',
    trending: false,
    featured: false,
    likes: 178,
    comments: 23,
    tags: ['Sustainability', 'E-commerce', 'Green Tech'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 6,
    title: 'Smart City Parking Solution',
    description: 'IoT-based parking management system with real-time availability tracking and automated payments.',
    category: 'other',
    image: '🚗',
    author: 'Lisa Wang',
    authorAvatar: 'LW',
    trending: true,
    featured: false,
    likes: 298,
    comments: 31,
    tags: ['IoT', 'Smart City', 'Mobility'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
  }
]

// Helper function to get category image
const getCategoryImage = (category) => {
  const images = {
    tech: '💻',
    health: '🏥',
    finance: '💰',
    education: '📚',
    ecommerce: '🛒',
    other: '🚀'
  }
  return images[category] || '💡'
}

const IdeasList = () => {
  const [ideas, setIdeas] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadIdeas = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 300))

      let filteredIdeas = [...mockIdeas]

      if (search) {
        filteredIdeas = filteredIdeas.filter(idea =>
          idea.title.toLowerCase().includes(search.toLowerCase()) ||
          idea.description.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (category && category !== 'all') {
        filteredIdeas = filteredIdeas.filter(idea => idea.category === category)
      }

      if (isMounted) {
        setIdeas(filteredIdeas)
        setIsLoading(false)
      }
    }

    loadIdeas()

    return () => {
      isMounted = false
    }
  }, [search, category])

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📋' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'health', name: 'Healthcare', icon: '🏥' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'other', name: 'Other', icon: '🚀' }
  ]

  const sortedIdeas = [...ideas].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.likes - a.likes
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'popular':
        return b.comments - a.comments
      default:
        return 0
    }
  })

  const handleViewIdea = (ideaId) => {
    alert(`Viewing idea #${ideaId}`)
  }

  const handleSubmitIdea = () => {
    alert('Submit Your Idea')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-slate-100 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-grey-600 to-blue-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Job Portal System is Innovative{' '}
                <span className="text-orange-600">Ideas</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl leading-relaxed mb-8 mx-auto lg:mx-0">
                Discover groundbreaking startup ideas, innovative solutions, and entrepreneurial opportunities.
                From tech innovations to business breakthroughs, find inspiration for your next venture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleSubmitIdea}
                  className="bg-white text-purple-600 hover:bg-orange-300 hover:text-purple-700 px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-200 hover:scale-105 rounded-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Submit Your Idea
                </button>
                <button
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-200 hover:scale-105 rounded-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Inspired
                </button>
              </div>
            </div>

            {/* Right Side - Girl Image */}
            <div className="flex-0">
              <img src="/jobi.png"
                alt="Innovative Ideas"
                className="w-[460px] h-[450px] md:w-[550px] md:h-[550px] lg:w-[580px] lg:h-[580px] object-cover rounded-8xl shadow-1xl transform hover:scale-10 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
                  {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search innovative ideas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
              />
              <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 border ${category === cat.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-600 outline-none cursor-pointer"
              >
                <option value="trending">🔥 Trending</option>
                <option value="newest">✨ Newest</option>
                <option value="popular">💬 Most Discussed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Ideas Grid */}
        {!isLoading && sortedIdeas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sortedIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="p-6 relative flex-1 flex flex-col">
                  {/* Featured Badge */}
                  {idea.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                      FEATURED
                    </div>
                  )}

                  {/* Trending Badge */}
                  {idea.trending && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                      <span>🔥</span>
                      <span>TRENDING</span>
                    </div>
                  )}

                  {/* Image/Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-4 mt-8 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{getCategoryImage(idea.category)}</span>
                  </div>

                  {/* Category */}
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium rounded-full mb-3 self-start">
                    {categories.find(cat => cat.id === idea.category)?.name}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-200 line-clamp-2">
                    {idea.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">
                    {idea.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {idea.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-red-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 font-medium">{idea.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-gray-600 font-medium">{idea.comments}</span>
                      </div>
                    </div>
                    <span className="text-xs">{idea.createdAt}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        {idea.authorAvatar}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{idea.author}</span>
                    </div>

                    <button
                      onClick={() => handleViewIdea(idea.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 shadow-sm"
                    >
                      View Idea →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sortedIdeas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No ideas found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{ideas.length}+</h3>
            <p className="text-gray-600">Innovative Ideas</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Community Members</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">2.5K+</h3>
            <p className="text-gray-600">Ideas Launched</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center group hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl p-12 text-center shadow-inner">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Share Your <span className="text-purple-600">Big Idea</span>?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of innovators who have turned their ideas into successful ventures.
            Your breakthrough idea could be the next big thing!
          </p>

          <button
            onClick={handleSubmitIdea}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-200 hover:scale-105 rounded-lg flex items-center justify-center gap-2 mx-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Submit Your Innovation
          </button>
        </div>
      </div>
    </div>
  )
}

export default IdeasList