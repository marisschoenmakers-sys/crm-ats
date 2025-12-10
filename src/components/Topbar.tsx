import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMenu, type CreateType } from './CreateMenu';
import { CreateModal } from './CreateModal';
import { useTheme } from '../theme/ThemeProvider';
import { candidates } from '../utils/mockCandidates';
import { vacancies } from '../utils/mockVacancies';

interface SearchResult {
  id: string;
  type: 'candidate' | 'vacancy' | 'talentpool';
  title: string;
  subtitle: string;
  url: string;
}

interface TopbarProps {
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  userName?: string;
  onMobileMenuToggle?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onSearch,
  onNotificationClick,
  userName = 'Maris',
  onMobileMenuToggle
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<CreateType | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  const performSearch = (query: string): SearchResult[] => {
    if (!query.trim() || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Check if searching matches a company name
    const matchingCompanies = [...new Set(vacancies.map(v => v.company))]
      .filter(company => company.toLowerCase().includes(lowerQuery));

    // If matching a company, show ALL vacancies from that company
    if (matchingCompanies.length > 0) {
      matchingCompanies.forEach(company => {
        vacancies
          .filter(v => v.company === company)
          .forEach(vacancy => {
            results.push({
              id: `vacancy-${vacancy.id}`,
              type: 'vacancy',
              title: vacancy.title,
              subtitle: vacancy.company,
              url: `/vacancies/${vacancy.id}`
            });
          });
      });
    }

    // Search vacancies by title or location (if not already added)
    vacancies.forEach(vacancy => {
      const alreadyAdded = results.some(r => r.id === `vacancy-${vacancy.id}`);
      if (!alreadyAdded && (
        vacancy.title.toLowerCase().includes(lowerQuery) ||
        vacancy.location.toLowerCase().includes(lowerQuery)
      )) {
        results.push({
          id: `vacancy-${vacancy.id}`,
          type: 'vacancy',
          title: vacancy.title,
          subtitle: vacancy.company,
          url: `/vacancies/${vacancy.id}`
        });
      }
    });

    // Search candidates - ONLY by name
    candidates.forEach(candidate => {
      if (candidate.fullName.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: `candidate-${candidate.id}`,
          type: 'candidate',
          title: candidate.fullName,
          subtitle: candidate.vacancy,
          url: `/candidates/${candidate.id}`
        });
      }
    });

    // Sort by relevance (exact matches first, then by type priority: vacancy > candidate)
    return results.sort((a, b) => {
      // Exact title matches first
      const aExact = a.title.toLowerCase().startsWith(lowerQuery) ? 0 : 1;
      const bExact = b.title.toLowerCase().startsWith(lowerQuery) ? 0 : 1;
      if (aExact !== bExact) return aExact - bExact;
      
      // Then by type (vacancies first when searching company)
      const typePriority = { vacancy: 0, candidate: 1, talentpool: 2 };
      return typePriority[a.type] - typePriority[b.type];
    }).slice(0, 10); // Limit to 10 results
  };

  const handleCreateSelect = (type: CreateType) => {
    setCreateModalType(type);
    setIsCreateModalOpen(true);
  };

  const handleCreateSave = (type: CreateType, data: Record<string, unknown>) => {
    console.log(`Created new ${type}:`, data);
    // In a real app, this would add to state/API
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
    
    const results = performSearch(value);
    setSearchResults(results);
    setShowSearchResults(results.length > 0 || value.length >= 2);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const getTypeIcon = (type: 'candidate' | 'vacancy' | 'talentpool') => {
    switch (type) {
      case 'candidate': return '👤';
      case 'vacancy': return '💼';
      case 'talentpool': return '🎯';
    }
  };

  const getTypeLabel = (type: 'candidate' | 'vacancy' | 'talentpool') => {
    switch (type) {
      case 'candidate': return 'Kandidaat';
      case 'vacancy': return 'Vacature';
      case 'talentpool': return 'Talentpool';
    }
  };

  
  return (
    <div className="topbar">
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuToggle}
        style={{
          display: 'none',
          padding: '8px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        className="mobile-menu-button"
        aria-label="Menu"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--color-text)" 
          strokeWidth="2"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Search Field with Results Dropdown */}
      <div ref={searchRef} style={{ flex: 1, maxWidth: '600px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
          placeholder="Zoek in kandidaten, vacatures, talentpools..."
          className="search-input"
        />
        
        {/* Search Results Dropdown */}
        {showSearchResults && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {searchResults.length === 0 ? (
              <div style={{
                padding: '16px',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '14px'
              }}>
                Geen resultaten gevonden voor "{searchQuery}"
              </div>
            ) : (
              <div>
                {searchResults.map(result => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--color-border)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: result.type === 'vacancy' ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      flexShrink: 0
                    }}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'var(--color-text)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {result.title}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {result.subtitle}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: result.type === 'vacancy' ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)',
                      color: result.type === 'vacancy' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      flexShrink: 0
                    }}>
                      {getTypeLabel(result.type)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* New Button with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '20px',
              padding: '8px',
              width: '36px',
              height: '36px'
            }}
            aria-label="Nieuw"
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
          </button>
          
          <CreateMenu
            isOpen={isCreateMenuOpen}
            onClose={() => setIsCreateMenuOpen(false)}
            onSelect={handleCreateSelect}
          />
        </div>
        
        {/* Create Modal */}
        <CreateModal
          isOpen={isCreateModalOpen}
          type={createModalType}
          onClose={() => {
            setIsCreateModalOpen(false);
            setCreateModalType(null);
          }}
          onSave={handleCreateSave}
        />

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
            e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Notificaties"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {/* Notification dot */}
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--color-danger)',
            borderRadius: '50%'
          }}></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: 'var(--color-button-bg)',
            color: 'var(--color-button-text)',
            border: '1px solid var(--color-border)',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Settings Icon */}
        <button
          onClick={() => navigate('/settings')}
          style={{
            padding: '8px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'transparent',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
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
            stroke="var(--color-text)" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>

        {/* User Avatar with Dropdown */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ 
              padding: '8px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Profiel menu"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--color-text)" 
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              minWidth: '180px',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--color-border)',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)'
              }}>
                {userName}
              </div>
              
              <button
                onClick={() => {
                  navigate('/settings');
                  setShowProfileMenu(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
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
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24"></path>
                </svg>
                Instellingen
              </button>
              
              <button
                onClick={() => {
                  localStorage.removeItem('ats_logged_in');
                  window.location.reload();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: 'var(--color-danger)',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-danger-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Uitloggen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
