// components/FollowButton.tsx
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface FollowButtonProps {
  userId: string;
}

export default function FollowButton({ userId }: FollowButtonProps) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFollowing(user.following.includes(userId));
    }
  }, [user, userId]);

  const handleFollow = async () => {
    if (!user || isLoading) return;
    setIsLoading(true);
    
    try {
      await api.post(`/users/${userId}/follow`);
      setIsFollowing(!isFollowing);
      // Update user context if needed
    } catch (err) {
      console.error('Error following user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (user?._id === userId) return null;

  return (
    <button 
      onClick={handleFollow} 
      disabled={isLoading}
      className={`follow-btn ${isFollowing ? 'following' : ''}`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}