import { useEffect, useState } from 'react';
import api from '../services/api';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';

interface IPost {
  _id: string;
  content: string;
  emoji: string;
  author: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <CreatePost />
      <div className="posts-list">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}