import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/3 rounded-full blur-lg animate-bounce"></div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group hover:text-black opacity-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-black-600 font-black text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">J</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl tracking-wide group-hover:text-blue-100 transition-colors duration-300">JobPortal</span>
                <div className="w-0 group-hover:w-full h-0.5 bg-white/60 transition-all duration-500"></div>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex space-x-8">
              <Link to="/ideas" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-3 h-3 opacity-0.5 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </span>
              </Link>
              <Link to="/about" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-3 h-3 opacity-0.5 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>About</span>
                </span>
              </Link>
              <Link to="/blog" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-3 h-3 opacity-0.5 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Blog</span>
                </span>
              </Link>
              <Link to="/contact" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-3 h-3 opacity-0.6 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact</span>
                </span>
              </Link>
              <Link to="/faq" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-3 h-3 opacity-0.6 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>FAQ</span>
                </span>
              </Link>
              <Link to="/jobs" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 opacity-0.5 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                  </svg>
                  <span>Jobs</span>
                </span>
              </Link>
              <Link to="/ideas/create" className="nav-link text-white relative group hover:text-black opacity-100">
                <span className="flex items-center space-x-2">
                  <svg className="w-3 h-3 opacity-0.5 group-hover:text-black opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Submit Idea</span>
                </span>
              </Link>
              {user && (
                <Link to="/applications" className="nav-link text-white relative group hover:text-black opacity-100">
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Applications</span>
                  </span>
                </Link>
              )}
              {user?.role === 'recruiter' && (
                <Link to="/jobs/create" className="nav-link text-white relative group hover:text-black opacity-100">
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Post Job</span>
                  </span>
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/dashboard" className="nav-link text-white relative group hover:text-black opacity-100">
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Dashboard</span>
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-3 text-white">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300 cursor-pointer group/avatar">
                      <span className="text-sm font-semibold group-hover/avatar:scale-110 transition-transform duration-300">
                        {user.user.first_name.charAt(0).toUpperCase()}
                      </span>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Welcome, {user.user.first_name}</span>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-6 py-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 font-medium transition-all duration-300 hover:scale-105 relative group"
                >
                  <span>Login</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary text-sm px-6 py-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Sign Up</span>
                  </span>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="text-white hover:text-blue-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
