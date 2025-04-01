import { useState } from "react";
import styles from "./Home.module.css";

interface Post {
  id: number;
  emoji: string;
  text: string;
}

const Home = () => {
  const [emoji, setEmoji] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emoji && text) {
      const newPost: Post = { id: Date.now(), emoji, text };
      setPosts([newPost, ...posts]); // Add new post to the list
      setEmoji("");
      setText(""); // Clear input fields
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How Are You Feeling?</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Choose an emoji (😊, 😢, 😡, etc.)"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className={styles.input}
          maxLength={2}
        />
        <textarea
          placeholder="Describe your feeling..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>
          Share
        </button>
      </form>
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <span className={styles.emoji}>{post.emoji}</span>
            <p className={styles.text}>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
