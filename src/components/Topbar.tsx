import React, { useState } from 'react';

interface TopbarProps {
  onSearch?: (query: string) => void;
  onNewClick?: () => void;
  onNotificationClick?: () => void;
  userName?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onSearch,
  onNewClick,
  onNotificationClick,
  userName = 'Maris'
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="topbar">
      {/* Search Field */}
      <div style={{ flex: 1, maxWidth: '600px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Zoek in kandidaten, vacatures, bedrijven..."
          className="search-input"
        />
      </div>

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* New Button */}
        <button
          onClick={onNewClick}
          className="btn btn-secondary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '20px'
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nieuw
        </button>

        {/* Notification Icon */}
        <button
          onClick={onNotificationClick}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Notificaties"
        >
          <span style={{ fontSize: '20px' }}>🔔</span>
          {/* Notification dot */}
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%'
          }}></span>
        </button>

        {/* Settings Icon */}
        <button
          onClick={() => console.log('Settings clicked')}
          style={{
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Instellingen"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#6b7280" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24"></path>
          </svg>
        </button>

        {/* User Avatar */}
        <div className="avatar" style={{ fontSize: '14px' }}>
          {getInitials(userName)}
        </div>
      </div>
    </div>
  );
};
