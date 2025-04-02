import { useState } from 'react';
import api from '../services/api';

const EMOJIS = ['😀', '😎', '🥺', '😡', '🥶', '😍', '🤔', '😴'];

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const maxLength = 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0) return;
    
    try {
      await api.post('/posts', { content, emoji: selectedEmoji });
      setContent('');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="emoji-picker">
        {EMOJIS.map(emoji => (
          <button
            key={emoji}
            type="button"
            className={`emoji-option ${emoji === selectedEmoji ? 'selected' : ''}`}
            onClick={() => setSelectedEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={maxLength}
        placeholder="How are you feeling today?"
      />
      <div className="post-actions">
        <span>{maxLength - content.length}</span>
        <button type="submit">Post</button>
      </div>
    </form>
  );
}