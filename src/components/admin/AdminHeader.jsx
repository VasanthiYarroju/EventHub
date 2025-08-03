import React from 'react';

const AdminHeader = ({ onLogout }) => {
  return (
    <header className="admin-header">
      <div className="header-brand">
        <h1>EventHub Admin</h1>
      </div>
      <nav className="header-nav">
        <button onClick={onLogout} className="logout-button">Logout</button>
      </nav>
    </header>
  );
};

export default AdminHeader;