// Centralized API service with proper error handling and fallbacks

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Mock data for when backend is unavailable
const MOCK_DATA = {
  currentUser: {
    id: 1,
    user: {
      username: 'demo_user',
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@example.com'
    },
    role: 'user',
    is_blocked: false
  },
  jobs: [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Join our team as a Frontend Developer. We are looking for talented individuals with experience in frontend development.',
      location: 'New York',
      salary_min: 60000,
      salary_max: 80000,
      job_type: 'full-time',
      category: 'Software Development',
      skills: ['React', 'JavaScript', 'CSS'],
      created_at: new Date().toISOString()
    }
  ],
  ideas: [
    {
      id: 1,
      title: 'AI Job Matching',
      problem_statement: 'Job seekers struggle to find relevant positions.',
      solution: 'Use AI to match candidates with suitable jobs.',
      category: 'Technology',
      created_at: new Date().toISOString()
    }
  ],
  applications: [],
  users: [
    {
      id: 1,
      user: {
        username: 'demo_user',
        first_name: 'Demo',
        last_name: 'User'
      },
      role: 'user',
      is_blocked: false
    }
  ]
};

// Custom error class for API errors
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Helper function to check if backend is available
async function checkBackendStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/health/`, { 
      method: 'GET',
      timeout: 3000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Helper function to handle fetch responses
async function handleResponse(response) {
  // Check if response is ok (status 200-299)
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}`;
    let errorData = null;
    
    try {
      errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
    } catch (e) {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    throw new APIError(errorMessage, response.status, errorData);
  }
  
  // Parse JSON response
  try {
    return await response.json();
  } catch (e) {
    // If response is not JSON, return null
    return null;
  }
}

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Generic API request function with retry logic
async function apiRequest(endpoint, options = {}, retryCount = 2) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Add timeout
    signal: AbortSignal.timeout(10000),
  };
  
  for (let i = 0; i <= retryCount; i++) {
    try {
      const response = await fetch(url, config);
      return await handleResponse(response);
    } catch (error) {
      // Handle network errors
      if (error instanceof APIError) {
        throw error;
      }
      
      // If this is the last retry, throw the error
      if (i === retryCount) {
        console.error('Network error after retries:', error);
        throw new APIError(
          'Unable to connect to the server. Please check your internet connection or try again later.',
          0,
          null
        );
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

// API methods with fallbacks
const api = {
  // Authentication
  login: async (credentials) => {
    try {
      return await apiRequest('/accounts/token/', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.warn('Login failed, using mock data:', error.message);
      // For login, we can't really provide mock data as it requires real authentication
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      return await apiRequest('/accounts/register/', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.warn('Registration failed:', error.message);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      return await apiRequest('/accounts/me/');
    } catch (error) {
      console.warn('Failed to fetch user, using mock data:', error.message);
      // Return mock user data when backend is unavailable
      return MOCK_DATA.currentUser;
    }
  },
  
  // Jobs
  getJobs: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/jobs/?${queryString}` : '/jobs/';
      return await apiRequest(endpoint);
    } catch (error) {
      console.warn('Failed to fetch jobs, using mock data:', error.message);
      return MOCK_DATA.jobs;
    }
  },
  
  getJob: async (id) => {
    try {
      return await apiRequest(`/jobs/${id}/`);
    } catch (error) {
      console.warn('Failed to fetch job, using mock data:', error.message);
      return MOCK_DATA.jobs.find(job => job.id === parseInt(id)) || MOCK_DATA.jobs[0];
    }
  },
  
  createJob: async (jobData) => {
    try {
      return await apiRequest('/jobs/', {
        method: 'POST',
        body: JSON.stringify(jobData),
      });
    } catch (error) {
      console.warn('Failed to create job:', error.message);
      throw error;
    }
  },
  
  approveJob: async (id) => {
    try {
      return await apiRequest(`/jobs/${id}/approve/`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Failed to approve job:', error.message);
      throw error;
    }
  },
  
  rejectJob: async (id) => {
    try {
      return await apiRequest(`/jobs/${id}/reject/`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Failed to reject job:', error.message);
      throw error;
    }
  },
  
  // Applications
  getApplications: async () => {
    try {
      return await apiRequest('/applications/');
    } catch (error) {
      console.warn('Failed to fetch applications, using mock data:', error.message);
      return MOCK_DATA.applications;
    }
  },
  
  createApplication: async (applicationData) => {
    try {
      return await apiRequest('/applications/', {
        method: 'POST',
        body: JSON.stringify(applicationData),
      });
    } catch (error) {
      console.warn('Failed to create application:', error.message);
      throw error;
    }
  },
  
  // Ideas
  getIdeas: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/ideas/?${queryString}` : '/ideas/';
      return await apiRequest(endpoint);
    } catch (error) {
      console.warn('Failed to fetch ideas, using mock data:', error.message);
      return MOCK_DATA.ideas;
    }
  },
  
  getIdea: async (id) => {
    try {
      return await apiRequest(`/ideas/${id}/`);
    } catch (error) {
      console.warn('Failed to fetch idea, using mock data:', error.message);
      return MOCK_DATA.ideas.find(idea => idea.id === parseInt(id)) || MOCK_DATA.ideas[0];
    }
  },
  
  createIdea: async (ideaData) => {
    try {
      return await apiRequest('/ideas/', {
        method: 'POST',
        body: JSON.stringify(ideaData),
      });
    } catch (error) {
      console.warn('Failed to create idea:', error.message);
      throw error;
    }
  },
  
  approveIdea: async (id) => {
    try {
      return await apiRequest(`/ideas/${id}/approve/`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Failed to approve idea:', error.message);
      throw error;
    }
  },
  
  rejectIdea: async (id) => {
    try {
      return await apiRequest(`/ideas/${id}/reject/`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Failed to reject idea:', error.message);
      throw error;
    }
  },
  
  // Users (Admin)
  getUsers: async () => {
    try {
      return await apiRequest('/accounts/users/');
    } catch (error) {
      console.warn('Failed to fetch users, using mock data:', error.message);
      return MOCK_DATA.users;
    }
  },
  
  blockUser: async (userId) => {
    try {
      return await apiRequest(`/accounts/users/${userId}/block/`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Failed to block user:', error.message);
      throw error;
    }
  },
  
  unblockUser: async (userId) => {
    try {
      return await apiRequest(`/accounts/users/${userId}/unblock/`, {
        method: 'POST',
      });
    } catch (error) {
      console.warn('Failed to unblock user:', error.message);
      throw error;
    }
  },
  
  // Comments
  getComments: async (ideaId) => {
    try {
      return await apiRequest(`/ideas/${ideaId}/comments/`);
    } catch (error) {
      console.warn('Failed to fetch comments, returning empty array:', error.message);
      return [];
    }
  },
  
  createComment: async (ideaId, commentData) => {
    try {
      return await apiRequest(`/ideas/${ideaId}/comments/`, {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
    } catch (error) {
      console.warn('Failed to create comment:', error.message);
      throw error;
    }
  },
  
  // Votes
  voteIdea: async (ideaId, voteType) => {
    try {
      return await apiRequest(`/ideas/${ideaId}/vote/`, {
        method: 'POST',
        body: JSON.stringify({ vote_type: voteType }),
      });
    } catch (error) {
      console.warn('Failed to vote on idea:', error.message);
      throw error;
    }
  },
};

export default api;
export { APIError };
