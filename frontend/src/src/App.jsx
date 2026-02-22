import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import BackendStatus from './components/BackendStatus';
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
import HomePage from './components/HomePage';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <BackendStatus />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
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
    </ErrorBoundary>
  );
}

export default App;
