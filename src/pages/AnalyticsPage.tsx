import React from 'react';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const mockStats: StatCard[] = [
  {
    title: 'Actieve Vacatures',
    value: 24,
    change: 12.5,
    changeType: 'increase',
    icon: '📋',
    color: 'blue'
  },
  {
    title: 'Nieuwe Kandidaten',
    value: 156,
    change: 8.2,
    changeType: 'increase',
    icon: '👥',
    color: 'green'
  },
  {
    title: 'Gesprekken Deze Week',
    value: 18,
    change: -5.3,
    changeType: 'decrease',
    icon: '📅',
    color: 'purple'
  },
  {
    title: 'Plaatsingsratio',
    value: '68%',
    change: 3.1,
    changeType: 'increase',
    icon: '📈',
    color: 'orange'
  },
  {
    title: 'Gem. Tijd per Plaatsing',
    value: '21 dagen',
    change: -15.2,
    changeType: 'decrease',
    icon: '⏱️',
    color: 'red'
  },
  {
    title: 'Tevredenheid Kandidaten',
    value: '4.6/5',
    change: 0.2,
    changeType: 'increase',
    icon: '⭐',
    color: 'yellow'
  }
];

const pipelineData: ChartData[] = [
  { label: 'Gesolliciteerd', value: 45, color: '#3b82f6' },
  { label: 'Telefonisch interview', value: 28, color: '#8b5cf6' },
  { label: 'In afwachting CV', value: 15, color: '#eab308' },
  { label: 'Voorgesteld', value: 12, color: '#10b981' },
  { label: 'Afgewezen', value: 8, color: '#ef4444' }
];

const departmentData: ChartData[] = [
  { label: 'IT', value: 38, color: '#3b82f6' },
  { label: 'Marketing', value: 24, color: '#10b981' },
  { label: 'Sales', value: 19, color: '#8b5cf6' },
  { label: 'HR', value: 12, color: '#f97316' },
  { label: 'Finance', value: 7, color: '#ef4444' }
];

const getStatCardColor = (color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow') => {
  const colors = {
    blue: { bg: '#dbeafe', border: '#93c5fd' },
    green: { bg: '#dcfce7', border: '#86efac' },
    purple: { bg: '#ede9fe', border: '#c4b5fd' },
    orange: { bg: '#fed7aa', border: '#fdba74' },
    red: { bg: '#fee2e2', border: '#fca5a5' },
    yellow: { bg: '#fef3c7', border: '#fde68a' }
  };
  return colors[color] || { bg: '#f3f4f6', border: '#d1d5db' };
};

const getChangeColor = (changeType: 'increase' | 'decrease') => {
  return changeType === 'increase' ? '#059669' : '#dc2626';
};

const getChangeIcon = (changeType: 'increase' | 'decrease') => {
  return changeType === 'increase' ? '↑' : '↓';
};

export const AnalyticsPage: React.FC = () => {
  const maxValue = Math.max(...pipelineData.map(d => d.value));
  const maxDeptValue = Math.max(...departmentData.map(d => d.value));

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Analytics</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '32px' }}>
        {mockStats.map((stat, index) => {
          const colors = getStatCardColor(stat.color);
          return (
            <div key={index} className="card" style={{ 
              backgroundColor: colors.bg, 
              borderColor: colors.border,
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ fontSize: '24px' }}>{stat.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: getChangeColor(stat.changeType) }}>
                  <span style={{ marginRight: '4px' }}>{getChangeIcon(stat.changeType)}</span>
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '4px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text)' }}>{stat.value}</div>
              </div>
              
              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                {stat.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pipeline Chart */}
        <div className="card p-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '16px' }}>
            Pipeline Distributie
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pipelineData.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '128px', fontSize: '14px', color: 'var(--color-text-muted)' }}>{item.label}</div>
                <div style={{ flex: 1, margin: '0 16px' }}>
                  <div style={{ backgroundColor: 'var(--color-border)', borderRadius: '12px', height: '24px', position: 'relative' }}>
                    <div 
                      style={{
                        backgroundColor: item.color,
                        height: '24px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        width: `${(item.value / maxValue) * 100}%`,
                        transition: 'width 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: 'white', fontWeight: '500' }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Chart */}
        <div className="card p-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '16px' }}>
            Vacatures per Afdeling
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {departmentData.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '128px', fontSize: '14px', color: 'var(--color-text-muted)' }}>{item.label}</div>
                <div style={{ flex: 1, margin: '0 16px' }}>
                  <div style={{ backgroundColor: 'var(--color-border)', borderRadius: '12px', height: '24px', position: 'relative' }}>
                    <div 
                      style={{
                        backgroundColor: item.color,
                        height: '24px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                        width: `${(item.value / maxDeptValue) * 100}%`,
                        transition: 'width 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: 'white', fontWeight: '500' }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-6" style={{ marginTop: '24px' }}>
        <div className="card p-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '16px' }}>
            Top Functies
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Frontend Developer</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>12</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Backend Engineer</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>8</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Marketing Manager</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>6</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Data Analyst</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>5</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '16px' }}>
            Snelste Plaatsingen
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Sales Executive</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>14 dagen</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>HR Business Partner</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>18 dagen</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Marketing Manager</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>20 dagen</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Frontend Developer</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>25 dagen</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '16px' }}>
            Bronnen
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>LinkedIn</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>45%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Website</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>28%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Referral</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>18%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Andere</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
