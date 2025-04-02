import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Post from '../components/Post';
import FollowButton from '../components/FollowButton';

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get(`/users/${userId}`);
        const postsResponse = await api.get(`/posts/user/${userId}`);
        setProfileUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };
    
    if (userId) fetchData();
  }, [userId]);

  if (!profileUser) return <div>Loading...</div>;

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>{profileUser.name}'s Profile</h2>
        <FollowButton userId={profileUser._id} />
      </div>
      
      <div className="user-stats">
        <div>
          <strong>{profileUser.followers.length}</strong>
          <span>Followers</span>
        </div>
        <div>
          <strong>{profileUser.following.length}</strong>
          <span>Following</span>
        </div>
        <div>
          <strong>{posts.length}</strong>
          <span>Posts</span>
        </div>
      </div>
      
      <div className="posts-list">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}