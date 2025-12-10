import React from 'react';

interface CandidateFilterBarProps {
  onSearchChange: (value: string) => void;
}

export const CandidateFilterBar: React.FC<CandidateFilterBarProps> = ({ onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Search Field */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Zoek kandidaten..."
          onChange={handleSearchChange}
          style={{
            width: '280px',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#2563eb';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
          }}
        />
      </div>

      {/* Filter Dropdowns */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {/* Stage Filter */}
        <select
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer',
            outline: 'none'
          }}
          disabled
        >
          <option>Filter op stage</option>
          <option>Gesolliciteerd</option>
          <option>Geen gehoor</option>
          <option>Telefonisch interview</option>
          <option>In afwachting CV</option>
          <option>Twijfel kandidaat</option>
          <option>Afwijzen</option>
          <option>Voorgesteld</option>
        </select>

        {/* Location Filter */}
        <select
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer',
            outline: 'none'
          }}
          disabled
        >
          <option>Filter op locatie</option>
          <option>Amsterdam</option>
          <option>Utrecht</option>
          <option>Rotterdam</option>
          <option>Den Haag</option>
          <option>Eindhoven</option>
        </select>
      </div>
    </div>
  );
};
