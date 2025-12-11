import React, { useState, useEffect, useCallback } from 'react';
import { CandidateFilterBar } from '../components/CandidateFilterBar';
import { CandidateList } from '../components/CandidateList';
import { getCandidates } from '../api/candidates';
import CreateCandidateForm from '../components/CreateCandidateForm';
import { CandidateDetailModal } from '../components/CandidateDetailModal';

interface CandidatesPageProps {
  onChangePage?: (page: 'candidates' | 'candidateDetail') => void;
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({ onChangePage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Load candidates from Supabase
  useEffect(() => {
    async function loadCandidates() {
      const { data, error } = await getCandidates();
      if (error) {
        console.error('Error loading candidates:', error);
      } else {
        setCandidates(data || []);
      }
      setLoading(false);
    }
    loadCandidates();
  }, []);

  // Refresh candidates after creating new one
  const refreshCandidates = async () => {
    const { data, error } = await getCandidates();
    if (!error) {
      setCandidates(data || []);
    }
  };

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate =>
    `${candidate.first_name} ${candidate.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCandidateClick = (candidateId?: string) => {
    setSelectedCandidateId(candidateId || null);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedCandidateId(null);
  }, []);

  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'var(--color-text)',
        marginBottom: '8px'
      }}>
        Kandidaten
      </h1>

      {/* Page Description */}
      <p style={{
        fontSize: '14px',
        color: 'var(--color-text-muted)',
        marginBottom: '24px'
      }}>
        Beheer en volg alle kandidaten door het recruitment proces. Gebruik de zoekbalk om snel specifieke kandidaten te vinden.
      </p>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <CandidateFilterBar onSearchChange={handleSearchChange} />
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          + Nieuwe kandidaat
        </button>
      </div>

      {/* Candidate List */}
      {loading ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: 'var(--color-text-muted)'
        }}>
          Laden...
        </div>
      ) : (
        <CandidateList 
          candidates={filteredCandidates.map(c => ({
            id: c.id,
            firstName: c.first_name,
            lastName: c.last_name,
            fullName: `${c.first_name} ${c.last_name}`,
            role: c.job_title || 'Geen functie',
            location: c.location || '',
            stage: 'Gesolliciteerd' as const,
            vacancy: 'Geen vacature',
            addedAt: new Date(c.created_at).toLocaleDateString('nl-NL'),
            tags: c.tags || [],
            avatarUrl: c.avatar_url
          }))} 
          onCandidateClick={handleCandidateClick} 
        />
      )}

      {/* Results Summary */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)'
        }}>
          {searchTerm ? (
            <>
              <span style={{ fontWeight: '500' }}>{filteredCandidates.length}</span> kandidaten gevonden voor "{searchTerm}"
            </>
          ) : (
            <>
              <span style={{ fontWeight: '500' }}>{candidates.length}</span> totaal kandidaten
            </>
          )}
        </div>
      </div>

      {/* Create Candidate Form Modal */}
      {showCreateForm && (
        <CreateCandidateForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={refreshCandidates}
        />
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidateId && (
        <CandidateDetailModal
          candidateId={selectedCandidateId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
