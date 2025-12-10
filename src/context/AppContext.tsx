import React, { createContext, useContext, useState, useCallback } from 'react';
import type { CreateType } from '../components/CreateMenu';

interface AppContextType {
  // Create Menu/Modal state
  isCreateMenuOpen: boolean;
  isCreateModalOpen: boolean;
  createModalType: CreateType | null;
  openCreateMenu: () => void;
  closeCreateMenu: () => void;
  openCreateModal: (type: CreateType) => void;
  closeCreateModal: () => void;
  
  // Mock data handlers
  addMockItem: (type: CreateType, data: Record<string, unknown>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<CreateType | null>(null);

  const openCreateMenu = useCallback(() => setIsCreateMenuOpen(true), []);
  const closeCreateMenu = useCallback(() => setIsCreateMenuOpen(false), []);
  
  const openCreateModal = useCallback((type: CreateType) => {
    setCreateModalType(type);
    setIsCreateModalOpen(true);
    setIsCreateMenuOpen(false);
  }, []);
  
  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setCreateModalType(null);
  }, []);

  const addMockItem = useCallback((type: CreateType, data: Record<string, unknown>) => {
    // In a real app, this would add to a global store or make an API call
    console.log(`Created new ${type}:`, data);
    // For now, just log - the data would be added to mock arrays
  }, []);

  return (
    <AppContext.Provider value={{
      isCreateMenuOpen,
      isCreateModalOpen,
      createModalType,
      openCreateMenu,
      closeCreateMenu,
      openCreateModal,
      closeCreateModal,
      addMockItem,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
