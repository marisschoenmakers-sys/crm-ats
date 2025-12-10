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
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px'
        }}>
          Contactpersonen ({contacts.length})
        </h3>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          Geen contactpersonen gevonden
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
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
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
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
                backgroundColor: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                flexShrink: 0
              }}>
                {getInitials(contact.fullName)}
              </div>

              {/* Name and Role */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '2px'
                }}>
                  {contact.fullName}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280'
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
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#6b7280' }}>📧</span>
                <a
                  href={`mailto:${contact.email}`}
                  style={{
                    color: '#2563eb',
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
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#6b7280' }}>📱</span>
                  <a
                    href={`tel:${contact.phone}`}
                    style={{
                      color: '#2563eb',
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
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        border: '1px solid #dbeafe'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#1e40af'
        }}>
          👥 {contacts.length} contactpersoon{contacts.length === 1 ? '' : 'en'} beschikbaar
        </div>
      </div>
    </div>
  );
};
