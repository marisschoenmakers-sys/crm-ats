import React from 'react';
import type { CompanyContact } from '../types/company';

interface CompanyContactsProps {
  contacts: CompanyContact[];
}

export const CompanyContacts: React.FC<CompanyContactsProps> = ({ contacts }) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (contacts.length === 0) {
    return (
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          Contactpersonen ({contacts.length})
        </h3>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--color-text-muted)',
          fontSize: '14px'
        }}>
          Geen contactpersonen gevonden
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '20px'
      }}>
        Contactpersonen ({contacts.length})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)'
            }}
          >
            {/* Contact Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              {/* Avatar */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-text)',
                flexShrink: 0
              }}>
                {getInitials(contact.fullName)}
              </div>

              {/* Name and Role */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  marginBottom: '2px'
                }}>
                  {contact.fullName}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--color-text-muted)'
                }}>
                  {contact.role}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {/* Email */}
              <div style={{
                fontSize: '14px',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: 'var(--color-text-muted)' }}>◆</span>
                <a
                  href={`mailto:${contact.email}`}
                  style={{
                    color: 'var(--color-primary)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {contact.email}
                </a>
              </div>

              {/* Phone */}
              {contact.phone && (
                <div style={{
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>◇</span>
                  <a
                    href={`tel:${contact.phone}`}
                    style={{
                      color: 'var(--color-primary)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: 'var(--color-primary-bg)',
        borderRadius: '6px',
        border: '1px solid var(--color-primary)'
      }}>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-primary)'
        }}>
          ● {contacts.length} contactpersoon{contacts.length === 1 ? '' : 'en'} beschikbaar
        </div>
      </div>
    </div>
  );
};
