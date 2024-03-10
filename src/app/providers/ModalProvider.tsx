import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  modalName: string;
  isModalOpen: boolean;
  doOpenModal: (name: string) => void;
  doCloseModals: () => void;
  resetHash: string;
  doSetResetHash: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [resetHash, setResetHash] = useState('');

  const doOpenModal = (name: string) => {
    setIsModalOpen(true);
    setModalName(name);
    // Todo: скрыть модалки
  };
  const doCloseModals = () => {
    setIsModalOpen(false);
    setModalName('');
    // Todo: скрыть модалки
  };

  const doSetResetHash = (hash: string) => {
    setResetHash(hash);
  };

  return (
    <ModalContext.Provider
      value={{ modalName, isModalOpen, doOpenModal, doCloseModals, resetHash, doSetResetHash }}
    >
      {children}
    </ModalContext.Provider>
  );
};
