import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Database,
  TrendingUp,
  Palette,
  DollarSign,
  Heart,
  MapPin,
  Briefcase,
  Clock,
  Search,
  Building2,
  Users,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Plus,
  Star,
  ExternalLink
} from 'lucide-react';

const API_KEY = "fedff6a129mshd1c491450d93231p1965a1jsnb8f6a68f928d";
const HOST = "google-jobs-api.p.rapidapi.com";
const PROXY = "https://corsproxy.io/?";

const JobCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const title = item.job_title || item.title || item.jobTitle || "No Title";
  const company = item.employer_name || item.company || item.companyName || "Unknown Company";
  const loc = item.job_city ? (item.job_city + (item.job_country ? ', ' + item.job_country : '')) : (item.location || item.jobLocation || "Location not specified");

  let link = item.job_apply_link || item.url || item.jobUrl || item.link;
  if (!link && item.apply_options && Array.isArray(item.apply_options)) {
    const bestOption = item.apply_options.find(opt => opt.is_direct) || item.apply_options[0];
    link = bestOption ? (bestOption.apply_link || bestOption.link) : null;
  }
  link = link || "#";
  const hasLink = link !== "#";

  const highlights = item.job_highlights || {};
  const requirements = Array.isArray(highlights.Qualifications) ? highlights.Qualifications.join('\n') : (highlights.requirements || "No specific requirements listed.");
  const overview = Array.isArray(highlights.Responsibilities) ? highlights.Responsibilities.join('\n') : (item.job_description || item.description || "No overview available.");

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 group animate-slide-up">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className="text-xl font-black text-gray-900 leading-tight">
              {title}
            </h3>
            {hasLink && (
              <span className="text-[10px] uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
                ✔ Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-600 font-bold mb-2">
            <Building2 className="w-4 h-4 text-blue-500" />
            {company}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <MapPin className="w-4 h-4 text-pink-500" />
            {loc}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-black mb-3 text-lg uppercase tracking-tight">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              Overview
            </div>
            <div className="text-gray-600 text-[15px] leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100 whitespace-pre-line">
              {overview}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-black mb-3 text-lg uppercase tracking-tight">
              <div className="w-1.5 h-6 bg-pink-600 rounded-full"></div>
              Requirements
            </div>
            <div className="text-gray-600 text-[15px] leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100 whitespace-pre-line">
              {requirements}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-2xl text-sm font-black uppercase tracking-wider hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${hasLink
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
          onClick={(e) => !hasLink && e.preventDefault()}
        >
          {hasLink ? (
            <>
              Apply Now <ExternalLink className="w-4 h-4" />
            </>
          ) : 'Closed'}
        </a>
      </div>
    </div>
  );
};

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState({ text: '', color: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/api/accounts/me/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => response.json()).then(data => {
        setUser(data);
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Please enter a job title/keyword");
      return;
    }

    const locVal = location || "USA";
    setIsLoading(true);
    setStatus({ text: `Searching in ${locVal}...`, color: 'text-blue-600' });
    setJobs([]);

    try {
      const rawUrl = `https://${HOST}/google-jobs?include=${encodeURIComponent(search)}&location=${encodeURIComponent(locVal)}`;
      const finalUrl = PROXY + encodeURIComponent(rawUrl);

      const res = await fetch(finalUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": HOST
        }
      });

      if (!res.ok) throw new Error("API Request Failed with status: " + res.status);

      const data = await res.json();

      let jobsArray = [];
      if (Array.isArray(data)) jobsArray = data;
      else if (data.data && Array.isArray(data.data)) jobsArray = data.data;
      else if (data.results && Array.isArray(data.results)) jobsArray = data.results;
      else if (data.jobs && Array.isArray(data.jobs)) jobsArray = data.jobs;

      if (jobsArray.length === 0) {
        setStatus({ text: `No jobs found for '${search}' in '${locVal}'.`, color: 'text-gray-500' });
      } else {
        setStatus({ text: "Found results ✔", color: 'text-green-600' });
        setJobs(jobsArray);
      }
    } catch (e) {
      console.error(e);
      setStatus({ text: "Error ❌", color: 'text-red-600' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-pink-300 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-70 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-indigo-300 rounded-full opacity-90 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section */}
        <div className="hero-section text-center mb-12 rounded-3xl shadow-2xl relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 py-28">
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-lg rotate-40 animate-bounce"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
              Discover amazing opportunities and connect with top companies worldwide
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm opacity-80">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-80">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-80">Success Stories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Filters */}
        <div className="card p-8 mb-8 animate-slide-up bg-white/80 backdrop-blur-xl border-white/50 shadow-2xl rounded-[2rem]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-[2]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job Title (e.g. Developer)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="input-field pl-12 h-14 w-full rounded-2xl border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location (e.g. India)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="input-field pl-12 h-14 w-full rounded-2xl border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="btn-primary px-10 h-14 rounded-2xl text-lg font-black uppercase tracking-wider shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                'Search Jobs'
              )}
            </button>
          </div>
          {status.text && (
            <p className={`mt-6 text-center font-black uppercase tracking-widest text-sm ${status.color} animate-fade-in`}>
              {status.text}
            </p>
          )}
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {jobs.length > 0 ? jobs.map((job, index) => (
            <JobCard key={index} item={job} />
          )) : !isLoading && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-xl flex items-center justify-center">
                <Search className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">No jobs found</h3>
              <p className="text-xl text-gray-500 font-medium">Try searching for a job title and location above</p>
            </div>
          )}
        </div>

        {/* Featured Companies Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 animate-fade-in">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Companies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing opportunities with top companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'TechCorp', logo: 'TC', color: 'from-blue-500 to-blue-600' },
              { name: 'InnovateLab', logo: 'IL', color: 'from-purple-500 to-purple-600' },
              { name: 'DataFlow', logo: 'DF', color: 'from-green-500 to-green-600' },
              { name: 'CloudTech', logo: 'CT', color: 'from-orange-500 to-orange-600' },
              { name: 'WebSolutions', logo: 'WS', color: 'from-pink-500 to-pink-600' },
              { name: 'DevStudio', logo: 'DS', color: 'from-indigo-500 to-indigo-600' }
            ].map((company, index) => (
              <div
                key={company.name}
                className="group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-full aspect-square bg-gradient-to-br ${company.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                  <span className="text-white font-black text-2xl relative z-10">{company.logo}</span>
                </div>
                <p className="text-center text-sm font-medium text-gray-700 mt-3">{company.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Success <span className="text-green-600">Stories</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah J.', role: 'Senior Developer', quote: 'Found my dream job here!', avatar: 'SJ' },
              { name: 'Mike C.', role: 'Product Manager', quote: 'The best platform for job seekers.', avatar: 'MC' },
              { name: 'Emma D.', role: 'UX Designer', quote: 'Smoth process, great results.', avatar: 'ED' }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100">
                <p className="text-gray-700 mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{t.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card p-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 animate-slide-up rounded-[3rem]">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Have a <span className="text-blue-600">Brilliant Idea</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your innovative ideas with the community and get feedback from experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ideas" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-blue-700 transition-all">
              Explore Ideas
            </Link>
            <Link to="/ideas/create" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-blue-50 transition-all">
              Submit Your Idea
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsList;
