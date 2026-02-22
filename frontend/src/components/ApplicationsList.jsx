import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/applications/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      console.error('Failed to fetch applications');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Applications</h1>
      <div>
        {applications.map(app => (
          <div key={app.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{app.job_title}</h3>
            <p>Status: {app.status}</p>
            <p>Applied on: {new Date(app.applied_at).toLocaleDateString()}</p>
            <p>Cover Letter: {app.cover_letter}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;
