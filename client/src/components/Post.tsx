// components/Post.tsx
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface PostProps {
  post: IPost;
  onCommentAdded?: () => void;
}

export default function Post({ post, onCommentAdded }: PostProps) {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id || ''));
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLike = async () => {
    try {
      await api.post(`/posts/${post._id}/like`);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      await api.post(`/posts/${post._id}/comments`, { content: comment });
      setComment('');
      onCommentAdded?.();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div className="post">
      <div className="post-emoji">{post.emoji}</div>
      <p className="post-content">{post.content}</p>
      
      <div className="post-actions">
        <button onClick={handleLike} className="like-btn">
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
          <span>{likeCount}</span>
        </button>
        
        <button onClick={() => setShowComments(!showComments)}>
          <FaComment />
          <span>{post.comments.length}</span>
        </button>
      </div>
      
      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Post</button>
          </form>
          
          <div className="comments-list">
            {post.comments.map(comment => (
              <div key={comment._id} className="comment">
                <strong>@{comment.author.name}</strong>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="post-footer">
        <span>@{post.author.name}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}