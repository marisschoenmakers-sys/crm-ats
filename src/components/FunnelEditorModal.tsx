import React, { useState } from 'react';

interface FunnelStage {
  id: string;
  name: string;
  color: string;
}

interface FunnelEditorModalProps {
  stages: FunnelStage[];
  onClose: () => void;
  onSave: (stages: FunnelStage[]) => void;
}

const defaultColors = [
  '#6B7280', // Gray
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#F59E0B', // Orange
  '#EC4899', // Pink
  '#10B981', // Green
  '#EF4444', // Red
  '#06B6D4', // Cyan
];

export const FunnelEditorModal: React.FC<FunnelEditorModalProps> = ({ stages: initialStages, onClose, onSave }) => {
  const [stages, setStages] = useState<FunnelStage[]>(initialStages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddStage = () => {
    const newStage: FunnelStage = {
      id: `stage-${Date.now()}`,
      name: 'Nieuwe fase',
      color: defaultColors[stages.length % defaultColors.length],
    };
    setStages([...stages, newStage]);
    setEditingId(newStage.id);
    setEditingName(newStage.name);
  };

  const handleDeleteStage = (id: string) => {
    if (stages.length <= 2) {
      alert('Je moet minimaal 2 fases hebben');
      return;
    }
    setStages(stages.filter(s => s.id !== id));
  };

  const handleStartEdit = (stage: FunnelStage) => {
    setEditingId(stage.id);
    setEditingName(stage.name);
  };

  const handleSaveEdit = () => {
    if (editingId && editingName.trim()) {
      setStages(stages.map(s => 
        s.id === editingId ? { ...s, name: editingName.trim() } : s
      ));
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleColorChange = (id: string, color: string) => {
    setStages(stages.map(s => s.id === id ? { ...s, color } : s));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newStages = [...stages];
    [newStages[index - 1], newStages[index]] = [newStages[index], newStages[index - 1]];
    setStages(newStages);
  };

  const handleMoveDown = (index: number) => {
    if (index === stages.length - 1) return;
    const newStages = [...stages];
    [newStages[index], newStages[index + 1]] = [newStages[index + 1], newStages[index]];
    setStages(newStages);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--color-border)',
        zIndex: 9999,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
            Funnel fases bewerken
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>

        {/* Stages List */}
        <div style={{
          padding: '16px 24px',
          overflowY: 'auto',
          flex: 1,
        }}>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Sleep fases om de volgorde te wijzigen, of klik om te bewerken.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Order buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    style={{
                      padding: '2px 6px',
                      fontSize: '10px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                      opacity: index === 0 ? 0.3 : 1,
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === stages.length - 1}
                    style={{
                      padding: '2px 6px',
                      fontSize: '10px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      cursor: index === stages.length - 1 ? 'not-allowed' : 'pointer',
                      opacity: index === stages.length - 1 ? 0.3 : 1,
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    ▼
                  </button>
                </div>

                {/* Color picker */}
                <input
                  type="color"
                  value={stage.color}
                  onChange={(e) => handleColorChange(stage.id, e.target.value)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />

                {/* Name */}
                {editingId === stage.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      border: '1px solid var(--color-primary)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-text)',
                    }}
                  />
                ) : (
                  <span
                    onClick={() => handleStartEdit(stage)}
                    style={{
                      flex: 1,
                      fontSize: '14px',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                    }}
                  >
                    {stage.name}
                  </span>
                )}

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteStage(stage.id)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-danger)',
                    border: '1px solid var(--color-danger)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Verwijderen
                </button>
              </div>
            ))}
          </div>

          {/* Add Stage Button */}
          <button
            onClick={handleAddStage}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '12px',
              backgroundColor: 'transparent',
              color: 'var(--color-primary)',
              border: '2px dashed var(--color-border)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            + Fase toevoegen
          </button>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Annuleren
          </button>
          <button
            onClick={() => onSave(stages)}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Opslaan
          </button>
        </div>
      </div>
    </>
  );
};
