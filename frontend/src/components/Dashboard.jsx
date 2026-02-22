import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [pendingIdeas, setPendingIdeas] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const [jobsRes, ideasRes, usersRes] = await Promise.all([
        fetch('http://localhost:8000/api/jobs/?approval_status=pending', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:8000/api/ideas/?approval_status=pending', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:8000/api/accounts/users/', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setPendingJobs(await jobsRes.json());
      setPendingIdeas(await ideasRes.json());
      setUsers(await usersRes.json());
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  const handleApprove = async (type, id) => {
    const token = localStorage.getItem('token');
    try {
      const endpoint = type === 'job' ? `http://localhost:8000/api/jobs/${id}/approve/` : `http://localhost:8000/api/ideas/${id}/approve/`;
      await fetch(endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Approval failed');
    }
  };

  const handleReject = async (type, id) => {
    const token = localStorage.getItem('token');
    try {
      const endpoint = type === 'job' ? `http://localhost:8000/api/jobs/${id}/reject/` : `http://localhost:8000/api/ideas/${id}/reject/`;
      await fetch(endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Rejection failed');
    }
  };

  const handleBlockUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8000/api/accounts/users/${userId}/block/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Block failed');
    }
  };

  const handleUnblockUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8000/api/accounts/users/${userId}/unblock/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('Unblock failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      
      <h2>Pending Jobs</h2>
      {pendingJobs.map(job => (
        <div key={job.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <button onClick={() => handleApprove('job', job.id)}>Approve</button>
          <button onClick={() => handleReject('job', job.id)}>Reject</button>
        </div>
      ))}
      
      <h2>Pending Ideas</h2>
      {pendingIdeas.map(idea => (
        <div key={idea.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{idea.title}</h3>
          <p>{idea.problem_statement}</p>
          <button onClick={() => handleApprove('idea', idea.id)}>Approve</button>
          <button onClick={() => handleReject('idea', idea.id)}>Reject</button>
        </div>
      ))}
      
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p>{user.user.username} ({user.role}) - {user.is_blocked ? 'Blocked' : 'Active'}</p>
          {user.profile.is_blocked ? (
            <button onClick={() => handleUnblockUser(user.id)}>Unblock</button>
          ) : (
            <button onClick={() => handleBlockUser(user.id)}>Block</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
