// src/components/admin/NotificationBell.js
import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react'; // Icons

const NotificationBell = ({ count, notifications, onMarkAllAsRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    // Mark all as read when the dropdown is opened
    if (isOpen && count > 0 && onMarkAllAsRead) {
      onMarkAllAsRead();
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, count, onMarkAllAsRead]);

  return (
    <div className="notification-bell" ref={bellRef} onClick={toggleDropdown}>
      <Bell size={24} />
      {count > 0 && <span className="badge">{count}</span>}

      {isOpen && (
        <div className="notification-dropdown" ref={dropdownRef}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
             <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)'}}>Notifications</h3>
             <button className="modal-close-btn" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} title="Close Notifications">
                <X size={20} />
             </button>
          </div>
          {notifications && notifications.length > 0 ? (
            <ul>
              {notifications.map((notif, index) => (
                <li key={index} className={notif.read ? '' : 'unread'}>
                  <strong>{notif.message}</strong>
                  <span>{new Date(notif.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;