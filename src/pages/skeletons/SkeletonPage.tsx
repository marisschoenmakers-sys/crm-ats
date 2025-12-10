import React from 'react';

interface SkeletonPageProps {
  title: string;
  description?: string;
}

export const SkeletonPage: React.FC<SkeletonPageProps> = ({ title, description }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center',
      padding: '40px',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        fontSize: '32px',
      }}>
        🚧
      </div>
      <h1 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '8px',
      }}>
        {title}
      </h1>
      {description && (
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          maxWidth: '400px',
        }}>
          {description}
        </p>
      )}
      <div style={{
        marginTop: '24px',
        padding: '12px 24px',
        backgroundColor: 'var(--color-warning-bg)',
        color: 'var(--color-warning)',
        borderRadius: '8px',
        fontSize: '14px',
      }}>
        Deze pagina is nog in ontwikkeling
      </div>
    </div>
  );
};
