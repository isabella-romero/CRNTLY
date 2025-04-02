// components/Notifications.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/notifications');
        setNotifications(data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    
    fetchNotifications();
    // Consider adding WebSocket or polling for real-time updates
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div className="notifications-container">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="notifications-btn"
      >
        🔔 {notifications.filter(n => !n.read).length > 0 && (
          <span className="badge">{notifications.filter(n => !n.read).length}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notifications-dropdown">
          <h3>Notifications</h3>
          {notifications.length === 0 ? (
            <p>No notifications yet</p>
          ) : (
            <ul>
              {notifications.map(notification => (
                <li 
                  key={notification._id} 
                  className={notification.read ? 'read' : 'unread'}
                  onClick={() => markAsRead(notification._id)}
                >
                  <Link to={notification.post ? `/post/${notification.post}` : `/profile/${notification.sender._id}`}>
                    {notification.type === 'like' && (
                      <>{notification.sender.name} liked your post</>
                    )}
                    {notification.type === 'comment' && (
                      <>{notification.sender.name} commented on your post</>
                    )}
                    {notification.type === 'follow' && (
                      <>{notification.sender.name} started following you</>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}