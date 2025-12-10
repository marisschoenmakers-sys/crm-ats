import React, { useRef, useCallback } from 'react';
import type { CandidateFile } from '../types/candidate';

interface CandidateFilesProps {
  files: CandidateFile[];
  onUpload: (file: CandidateFile) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

let fileIdCounter = 0;
const generateFileId = () => {
  fileIdCounter += 1;
  return `file-${fileIdCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

export const CandidateFiles: React.FC<CandidateFilesProps> = ({ files, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Create mock file object
      const mockFile: CandidateFile = {
        id: generateFileId(),
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size),
        uploadedAt: 'Zojuist'
      };
      
      onUpload(mockFile);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onUpload]);

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📋';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📎';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: 0
        }}>
          Bestanden ({files.length})
        </h3>
        
        <button
          onClick={handleUploadClick}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-sidebar-text)',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>+</span>
          Bestand uploaden
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Files List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {files.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--color-text-muted)',
            fontSize: '14px'
          }}>
            Nog geen bestanden geüpload
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
              }}
            >
              {/* File Icon */}
              <div style={{
                fontSize: '24px',
                flexShrink: 0
              }}>
                {getFileIcon(file.fileName)}
              </div>

              {/* File Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                  marginBottom: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.fileName}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)'
                }}>
                  {file.fileSize} • {file.uploadedAt}
                </div>
              </div>

              {/* Download Button */}
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
                }}
              >
                Download
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {files.length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: 'var(--color-success-bg)',
          borderRadius: '6px',
          border: '1px solid var(--color-success)'
        }}>
          <div style={{
            fontSize: '13px',
            color: 'var(--color-success)'
          }}>
            ● {files.length} bestand{files.length === 1 ? '' : 'en'} geüpload
          </div>
        </div>
      )}
    </div>
  );
};
