import React from 'react';

export type CreateType = 'candidate' | 'vacancy' | 'company' | 'talentpool' | 'evaluation';

interface CreateMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: CreateType) => void;
}

const menuItems: { type: CreateType; label: string; icon: string }[] = [
  { type: 'candidate', label: 'Nieuwe kandidaat', icon: '◆' },
  { type: 'vacancy', label: 'Nieuwe vacature', icon: '◆' },
  { type: 'company', label: 'Nieuw bedrijf', icon: '◆' },
  { type: 'talentpool', label: 'Nieuwe talentpool', icon: '◆' },
  { type: 'evaluation', label: 'Nieuw evaluatieformulier', icon: '◆' },
];

export const CreateMenu: React.FC<CreateMenuProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998,
        }}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid var(--color-border)',
          minWidth: '240px',
          zIndex: 999,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '8px' }}>
          {menuItems.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                onSelect(item.type);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--color-text)',
                textAlign: 'left',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ fontSize: '18px', color: 'var(--color-primary)' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
