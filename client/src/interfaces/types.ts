interface IUser {
    _id: string;
    name: string;
    email: string;
    followers: string[];
    following: string[];
  }
  
  interface IPost {
    _id: string;
    content: string;
    emoji: string;
    author: IUser;
    likes: string[]; // array of user IDs
    comments: IComment[];
    createdAt: string;
  }
  
  interface IComment {
    _id: string;
    content: string;
    author: IUser;
    createdAt: string;
  }
  
  interface INotification {
    _id: string;
    type: 'like' | 'comment' | 'follow';
    sender: IUser;
    post?: string; // post ID for post-related notifications
    read: boolean;
    createdAt: string;
  }