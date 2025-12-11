import React, { useState, useEffect } from 'react';
import { getEmails, updateEmail, toggleStar as apiToggleStar } from '../api/emails';

interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  category: string;
}

const categories = [
  { id: 'inbox', name: 'Inbox', count: 0, icon: '📥' },
  { id: 'sent', name: 'Verzonden', count: 0, icon: '📤' },
  { id: 'drafts', name: 'Concepten', count: 0, icon: '📝' },
  { id: 'trash', name: 'Prullenbak', count: 0, icon: '🗑️' },
];

export const MailboxPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('inbox');
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  // Load emails from Supabase
  useEffect(() => {
    async function loadEmails() {
      const { data, error } = await getEmails();
      if (error) {
        console.error('Error loading emails:', error);
        return;
      }
      if (data) {
        const formattedEmails: EmailItem[] = data.map((e: any) => ({
          id: e.id,
          sender: e.from_name,
          senderEmail: e.from_email,
          subject: e.subject,
          preview: e.body?.substring(0, 100) + '...' || '',
          time: formatEmailTime(e.received_at),
          isRead: e.is_read,
          isStarred: e.is_starred,
          category: e.folder
        }));
        setEmails(formattedEmails);
        
        // Calculate counts per category
        const counts: Record<string, number> = {};
        formattedEmails.forEach(e => {
          counts[e.category] = (counts[e.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      }
    }
    loadEmails();
  }, []);

  const formatEmailTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Gisteren';
    } else if (diffDays < 7) {
      return `${diffDays} dagen geleden`;
    } else {
      return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
    }
  };

  const filteredEmails = emails.filter(email => email.category === selectedCategory);

  const toggleStar = async (emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;
    
    await apiToggleStar(emailId, !email.isStarred);
    setEmails(emails.map(e => 
      e.id === emailId ? { ...e, isStarred: !e.isStarred } : e
    ));
  };

  const markAsRead = async (emailId: string) => {
    await updateEmail(emailId, { is_read: true });
    setEmails(emails.map(e => 
      e.id === emailId ? { ...e, isRead: true } : e
    ));
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: 'var(--color-card-bg)', borderRight: '1px solid var(--color-border)', padding: '16px' }}>
        <button className="btn btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
          Nieuwe e-mail
        </button>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedCategory === category.id ? 'var(--color-primary-bg)' : 'transparent',
                color: selectedCategory === category.id ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: selectedCategory === category.id ? '500' : 'normal',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <span style={{ 
                fontSize: '12px', 
                backgroundColor: 'var(--color-bg-secondary)', 
                padding: '2px 8px', 
                borderRadius: '12px',
                color: 'var(--color-text)'
              }}>
                {categoryCounts[category.id] || 0}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Email List */}
      <div style={{ flex: 1, backgroundColor: 'var(--color-card-bg)' }}>
        <div style={{ borderBottom: '1px solid var(--color-border)', padding: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
        </div>
        
        <div>
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => markAsRead(email.id)}
              style={{
                padding: '16px',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                backgroundColor: !email.isRead ? 'var(--color-primary-bg)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = !email.isRead ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = !email.isRead ? 'var(--color-primary-bg)' : 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(email.id);
                    }}
                    style={{
                      padding: '4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      marginTop: '4px'
                    }}
                  >
                    {email.isStarred ? '⭐' : '☆'}
                  </button>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          fontWeight: '500', 
                          color: !email.isRead ? 'var(--color-text)' : 'var(--color-text-muted)' 
                        }}>
                          {email.sender}
                        </span>
                        {!email.isRead && (
                          <span style={{ 
                            backgroundColor: 'var(--color-primary)', 
                            color: 'white', 
                            fontSize: '12px', 
                            padding: '2px 8px', 
                            borderRadius: '12px',
                            fontWeight: '500'
                          }}>
                            Nieuw
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{email.time}</span>
                    </div>
                    
                    <div style={{ 
                      marginBottom: '4px',
                      fontWeight: !email.isRead ? '600' : 'normal',
                      color: 'var(--color-text)',
                      fontSize: '14px'
                    }}>
                      {email.subject}
                    </div>
                    
                    <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {email.preview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
