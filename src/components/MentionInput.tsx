import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCandidates } from '../api/candidates';

export interface Mention {
  id: string;
  type: 'user' | 'candidate';
  name: string;
  startIndex: number;
  endIndex: number;
}

interface MentionOption {
  id: string;
  type: 'user' | 'candidate';
  name: string;
  subtitle?: string;
}

// Mock users - in production this would come from auth/users table
const mockUsers: MentionOption[] = [
  { id: 'user-1', type: 'user', name: 'Maris Schoenmakers', subtitle: 'Admin' },
  { id: 'user-2', type: 'user', name: 'Jan de Vries', subtitle: 'Recruiter' },
  { id: 'user-3', type: 'user', name: 'Lisa Bakker', subtitle: 'HR Manager' },
  { id: 'user-4', type: 'user', name: 'Peter Jansen', subtitle: 'Recruiter' },
];

interface MentionInputProps {
  value: string;
  onChange: (value: string, mentions: Mention[]) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  onMentionUser?: (userId: string, userName: string) => void;
  style?: React.CSSProperties;
}

export const MentionInput: React.FC<MentionInputProps> = ({
  value,
  onChange,
  placeholder = 'Typ @ om iemand te taggen...',
  multiline = false,
  rows = 3,
  onMentionUser,
  style
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState<MentionOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Load candidates when dropdown opens
  useEffect(() => {
    if (showDropdown) {
      loadOptions();
    }
  }, [showDropdown, searchQuery]);

  const loadOptions = async () => {
    // Filter users
    const filteredUsers = mockUsers.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Load and filter candidates
    const { data: candidatesData } = await getCandidates();
    const filteredCandidates: MentionOption[] = (candidatesData || [])
      .filter((c: any) => 
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map((c: any) => ({
        id: c.id,
        type: 'candidate' as const,
        name: `${c.first_name} ${c.last_name}`,
        subtitle: c.current_function || 'Kandidaat'
      }));

    setOptions([
      ...filteredUsers.slice(0, 3),
      ...filteredCandidates
    ]);
    setSelectedIndex(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    
    // Check if user just typed @
    const lastAtIndex = newValue.lastIndexOf('@', cursorPos - 1);
    
    if (lastAtIndex !== -1) {
      const textAfterAt = newValue.substring(lastAtIndex + 1, cursorPos);
      // Only show dropdown if @ is at start or after whitespace, and no space in query
      const charBeforeAt = lastAtIndex > 0 ? newValue[lastAtIndex - 1] : ' ';
      
      if ((charBeforeAt === ' ' || charBeforeAt === '\n' || lastAtIndex === 0) && !textAfterAt.includes(' ')) {
        setShowDropdown(true);
        setSearchQuery(textAfterAt);
        setMentionStartIndex(lastAtIndex);
        
        // Calculate dropdown position
        if (inputRef.current) {
          const rect = inputRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: rect.height + 4,
            left: 0
          });
        }
      } else {
        setShowDropdown(false);
      }
    } else {
      setShowDropdown(false);
    }
    
    onChange(newValue, mentions);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (options[selectedIndex]) {
          selectOption(options[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
      case 'Tab':
        if (options[selectedIndex]) {
          e.preventDefault();
          selectOption(options[selectedIndex]);
        }
        break;
    }
  };

  const selectOption = (option: MentionOption) => {
    const beforeMention = value.substring(0, mentionStartIndex);
    const afterMention = value.substring(mentionStartIndex + searchQuery.length + 1);
    const mentionText = `@${option.name}`;
    const newValue = beforeMention + mentionText + ' ' + afterMention;
    
    const newMention: Mention = {
      id: option.id,
      type: option.type,
      name: option.name,
      startIndex: mentionStartIndex,
      endIndex: mentionStartIndex + mentionText.length
    };
    
    const updatedMentions = [...mentions, newMention];
    setMentions(updatedMentions);
    
    // Notify about user mention for notifications
    if (option.type === 'user' && onMentionUser) {
      onMentionUser(option.id, option.name);
    }
    
    onChange(newValue, updatedMentions);
    setShowDropdown(false);
    setSearchQuery('');
    
    // Focus back on input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newCursorPos = mentionStartIndex + mentionText.length + 1;
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // Render text with highlighted mentions
  const renderHighlightedText = () => {
    if (!value) return null;
    
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Find all @mentions in the text
    const mentionRegex = /@([A-Za-zÀ-ÿ\s]+?)(?=\s|$|@)/g;
    let match;
    
    while ((match = mentionRegex.exec(value)) !== null) {
      // Add text before mention
      if (match.index > lastIndex) {
        parts.push(value.substring(lastIndex, match.index));
      }
      
      // Find if this mention matches a known mention
      const mentionName = match[1].trim();
      const knownMention = mentions.find(m => m.name === mentionName);
      
      if (knownMention) {
        parts.push(
          <span
            key={match.index}
            onClick={() => handleMentionClick(knownMention)}
            style={{
              backgroundColor: knownMention.type === 'candidate' ? 'var(--color-primary-bg)' : 'var(--color-warning-bg)',
              color: knownMention.type === 'candidate' ? 'var(--color-primary)' : 'var(--color-warning)',
              padding: '2px 4px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            @{mentionName}
          </span>
        );
      } else {
        parts.push(match[0]);
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < value.length) {
      parts.push(value.substring(lastIndex));
    }
    
    return parts;
  };

  const handleMentionClick = (mention: Mention) => {
    if (mention.type === 'candidate') {
      navigate(`/candidates/${mention.id}`);
    }
    // For users, could open profile or do nothing
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'var(--color-card-bg)',
    color: 'var(--color-text)',
    resize: multiline ? 'vertical' : 'none',
    fontFamily: 'inherit',
    ...style
  };

  return (
    <div style={{ position: 'relative' }}>
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={rows}
          style={inputStyle}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}

      {/* Dropdown */}
      {showDropdown && options.length > 0 && (
        <div style={{
          position: 'absolute',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: '100%',
          maxWidth: '300px',
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxHeight: '250px',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)', fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Gebruikers & Kandidaten
          </div>
          {options.map((option, index) => (
            <div
              key={`${option.type}-${option.id}`}
              onClick={() => selectOption(option)}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                backgroundColor: index === selectedIndex ? 'var(--color-bg-secondary)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderBottom: index < options.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: option.type === 'candidate' ? 'var(--color-primary-bg)' : 'var(--color-warning-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: option.type === 'candidate' ? 'var(--color-primary)' : 'var(--color-warning)',
                fontWeight: '600'
              }}>
                {option.type === 'candidate' ? '👤' : '🧑‍💼'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text)' }}>
                  {option.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {option.subtitle}
                </div>
              </div>
              <div style={{
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: option.type === 'candidate' ? 'var(--color-primary-bg)' : 'var(--color-warning-bg)',
                color: option.type === 'candidate' ? 'var(--color-primary)' : 'var(--color-warning)',
                fontWeight: '500'
              }}>
                {option.type === 'candidate' ? 'Kandidaat' : 'Gebruiker'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {showDropdown && options.length === 0 && (
        <div style={{
          position: 'absolute',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: '100%',
          maxWidth: '300px',
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          padding: '16px',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '13px'
        }}>
          Geen resultaten voor "{searchQuery}"
        </div>
      )}
    </div>
  );
};

// Helper component to render text with clickable mentions
interface MentionTextProps {
  text: string;
  mentions: Mention[];
}

export const MentionText: React.FC<MentionTextProps> = ({ text, mentions }) => {
  const navigate = useNavigate();

  const handleClick = (mention: Mention) => {
    if (mention.type === 'candidate') {
      navigate(`/candidates/${mention.id}`);
    }
  };

  // Simple rendering - find @Name patterns and make them clickable
  const parts: React.ReactNode[] = [];
  const mentionRegex = /@([A-Za-zÀ-ÿ\s]+?)(?=\s|$|@|,|\.)/g;
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
    }

    const mentionName = match[1].trim();
    const knownMention = mentions.find(m => m.name === mentionName);

    parts.push(
      <span
        key={`mention-${match.index}`}
        onClick={() => knownMention && handleClick(knownMention)}
        style={{
          backgroundColor: knownMention?.type === 'candidate' ? 'var(--color-primary-bg)' : 'var(--color-warning-bg)',
          color: knownMention?.type === 'candidate' ? 'var(--color-primary)' : 'var(--color-warning)',
          padding: '2px 4px',
          borderRadius: '4px',
          cursor: knownMention ? 'pointer' : 'default',
          fontWeight: '500'
        }}
      >
        @{mentionName}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={`text-end`}>{text.substring(lastIndex)}</span>);
  }

  return <>{parts}</>;
};

export default MentionInput;
