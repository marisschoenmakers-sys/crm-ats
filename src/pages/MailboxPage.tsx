import React, { useState } from 'react';
import type { Email } from '../types';

const mockEmails: Email[] = [
  {
    id: 1,
    sender: 'Jan Jansen',
    senderEmail: 'jan.jansen@email.com',
    subject: 'Sollicitatie Senior Frontend Developer',
    preview: 'Geachte heer/mevrouw, Graag solliciteer ik naar de functie van Senior Frontend Developer...',
    time: '10:30',
    isRead: false,
    isStarred: true,
    category: 'inbox'
  },
  {
    id: 2,
    sender: 'Maria de Vries',
    senderEmail: 'maria.devries@email.com',
    subject: 'Vraag over vacature Marketing Manager',
    preview: 'Beste team, Ik heb een vraag over de vacature voor Marketing Manager...',
    time: '09:15',
    isRead: true,
    isStarred: false,
    category: 'inbox'
  },
  {
    id: 3,
    sender: 'Pieter Bakker',
    senderEmail: 'pieter.bakker@email.com',
    subject: 'Beschikbaarheid voor gesprek',
    preview: 'Goedemorgen, Ik wil graag mijn beschikbaarheid doorgeven voor een gesprek...',
    time: 'Gisteren',
    isRead: true,
    isStarred: false,
    category: 'inbox'
  },
  {
    id: 4,
    sender: 'Lisa Visser',
    senderEmail: 'lisa.visser@email.com',
    subject: 'Bedankt voor het gesprek',
    preview: 'Beste recruiter, Hartelijk dank voor het gesprek van vanochtend...',
    time: 'Gisteren',
    isRead: false,
    isStarred: true,
    category: 'inbox'
  },
  {
    id: 5,
    sender: 'Mark van Dijk',
    senderEmail: 'mark.vandijk@email.com',
    subject: 'CV bijgevoegd',
    preview: 'Geachte heer/mevrouw, In de bijlage vindt u mijn CV voor de positie van HR Business Partner...',
    time: '2 dagen geleden',
    isRead: true,
    isStarred: false,
    category: 'inbox'
  }
];

const categories = [
  { id: 'inbox', name: 'Inbox', count: 5, icon: '📥' },
  { id: 'sent', name: 'Verzonden', count: 3, icon: '📤' },
  { id: 'draft', name: 'Concepten', count: 2, icon: '📝' },
  { id: 'spam', name: 'Spam', count: 1, icon: '🚫' },
];

export const MailboxPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('inbox');
  const [emails, setEmails] = useState(mockEmails);

  const filteredEmails = emails.filter(email => email.category === selectedCategory);

  const toggleStar = (emailId: number) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const markAsRead = (emailId: number) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', padding: '16px' }}>
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
                backgroundColor: selectedCategory === category.id ? '#dbeafe' : 'transparent',
                color: selectedCategory === category.id ? '#2563eb' : '#374151',
                fontWeight: selectedCategory === category.id ? '500' : 'normal',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
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
                backgroundColor: '#f3f4f6', 
                padding: '2px 8px', 
                borderRadius: '12px',
                color: '#374151'
              }}>
                {category.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Email List */}
      <div style={{ flex: 1, backgroundColor: 'white' }}>
        <div style={{ borderBottom: '1px solid #e5e7eb', padding: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
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
                borderBottom: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                backgroundColor: !email.isRead ? '#dbeafe' : 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = !email.isRead ? '#dbeafe' : '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = !email.isRead ? '#dbeafe' : 'transparent';
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
                          color: !email.isRead ? '#111827' : '#374151' 
                        }}>
                          {email.sender}
                        </span>
                        {!email.isRead && (
                          <span style={{ 
                            backgroundColor: '#2563eb', 
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
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{email.time}</span>
                    </div>
                    
                    <div style={{ 
                      marginBottom: '4px',
                      fontWeight: !email.isRead ? '600' : 'normal',
                      color: '#111827',
                      fontSize: '14px'
                    }}>
                      {email.subject}
                    </div>
                    
                    <div style={{ fontSize: '14px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
