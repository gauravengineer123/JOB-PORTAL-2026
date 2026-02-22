import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const IdeaDetail = () => {
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIdea();
    fetchComments();
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/api/accounts/me/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => response.json()).then(data => {
        setUser(data);
      });
    }
  }, [id]);

  const fetchIdea = async () => {
    const response = await fetch(`http://localhost:8000/api/ideas/${id}/`);
    const data = await response.json();
    setIdea(data);
  };

  const fetchComments = async () => {
    const response = await fetch(`http://localhost:8000/api/ideas/comments/?idea=${id}`);
    const data = await response.json();
    setComments(data);
  };

  const handleVote = async (voteType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/ideas/${id}/vote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ vote: voteType === 'upvote' ? 'up' : 'down' })
      });
      if (response.ok) {
        fetchIdea(); // Refresh idea to update vote count
      }
    } catch (err) {
      console.error('Vote failed');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/ideas/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ idea: id, comment: newComment })
      });
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (err) {
      console.error('Comment failed');
    }
  };

  if (!idea) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{idea.title}</h1>
      <p><strong>Problem:</strong> {idea.problem_statement}</p>
      <p><strong>Solution:</strong> {idea.proposed_solution}</p>
      <p><strong>Target Audience:</strong> {idea.target_audience}</p>
      <p><strong>Business Model:</strong> {idea.business_model}</p>
      <p><strong>Category:</strong> {idea.category}</p>
      <p>Votes: {idea.vote_count}</p>
      {user && (
        <div>
          <button onClick={() => handleVote('upvote')}>Upvote</button>
          <button onClick={() => handleVote('downvote')}>Downvote</button>
        </div>
      )}
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <p>{comment.comment}</p>
          <small>By {comment.user} on {new Date(comment.created_at).toLocaleDateString()}</small>
        </div>
      ))}
      {user && (
        <form onSubmit={handleComment} style={{ marginTop: '1rem' }}>
          <textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            style={{ width: '100%', height: '100px' }}
          />
          <button type="submit">Comment</button>
        </form>
      )}
    </div>
  );
};

export default IdeaDetail;
