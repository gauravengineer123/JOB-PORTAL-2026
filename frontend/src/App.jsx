import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import JobsList from './components/JobsList';
import JobDetail from './components/JobDetail';
import JobCreate from './components/JobCreate';
import ApplicationsList from './components/ApplicationsList';
import IdeasList from './components/IdeasList';
import IdeaDetail from './components/IdeaDetail';
import IdeaCreate from './components/IdeaCreate';
import Dashboard from './components/Dashboard';
import About from './components/About';
import CompanyProfile from './components/CompanyProfile';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ResumeBuilder from './components/ResumeBuilder';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<JobsList />} />
              <Route path="/home" element={<JobsList />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/jobs/create" element={<JobCreate />} />
              <Route path="/companies/:id" element={<CompanyProfile />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/applications" element={<ApplicationsList />} />
              <Route path="/ideas" element={<IdeasList />} />
              <Route path="/ideas/:id" element={<IdeaDetail />} />
              <Route path="/ideas/create" element={<IdeaCreate />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
