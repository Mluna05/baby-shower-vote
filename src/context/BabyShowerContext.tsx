import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Vote, Gender, AppState, Message } from '../types';

interface BabyShowerContextType {
  votes: Vote[];
  votingOpen: boolean;
  revealed: boolean;
  revealedGender: Gender | null;
  messages: Message[];
  addVote: (vote: Omit<Vote, 'id' | 'timestamp'>) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  closeVoting: () => void;
  openVoting: () => void;
  resetVoting: () => void;
  revealGender: (gender: Gender) => void;
  exportVotes: () => void;
  exportWinners: () => void;
  editVote: (id: string, updates: Partial<Vote>) => void;
  deleteVote: (id: string) => void;
}

const BabyShowerContext = createContext<BabyShowerContextType | undefined>(undefined);

const STORAGE_KEY = 'baby-shower-data';

const initialState: AppState = {
  votes: [],
  votingOpen: true,
  revealed: false,
  revealedGender: null,
  messages: []
};

export function BabyShowerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addVote = (vote: Omit<Vote, 'id' | 'timestamp'>) => {
    const newVote: Vote = {
      ...vote,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    setState(prev => ({ ...prev, votes: [...prev.votes, newVote] }));
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    setState(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
  };

  const closeVoting = () => {
    setState(prev => ({ ...prev, votingOpen: false }));
  };

  const openVoting = () => {
    setState(prev => ({ ...prev, votingOpen: true, revealed: false }));
  };

  const resetVoting = () => {
    setState(initialState);
  };

  const revealGender = (gender: Gender) => {
    setState(prev => ({ 
      ...prev, 
      revealed: true, 
      revealedGender: gender,
      votingOpen: false
    }));
  };

  const editVote = (id: string, updates: Partial<Vote>) => {
    setState(prev => ({
      ...prev,
      votes: prev.votes.map(vote => 
        vote.id === id ? { ...vote, ...updates } : vote
      )
    }));
  };

  const deleteVote = (id: string) => {
    setState(prev => ({
      ...prev,
      votes: prev.votes.filter(vote => vote.id !== id)
    }));
  };

  const exportVotes = () => {
    const csv = [
      ['Nombre', 'Apellido', 'Predicción', 'Mensaje', 'Fecha/Hora'].join(','),
      ...state.votes.map(vote => [
        vote.name,
        vote.surname,
        vote.prediction.toUpperCase(),
        `"${vote.message}"`,
        new Date(vote.timestamp).toLocaleString('es-ES')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `votos-baby-aldana-${Date.now()}.csv`;
    a.click();
  };

  const exportWinners = () => {
    if (!state.revealedGender) return;
    
    const winners = state.votes.filter(vote => vote.prediction === state.revealedGender);
    const csv = [
      ['Nombre', 'Apellido', 'Mensaje', 'Fecha/Hora'].join(','),
      ...winners.map(vote => [
        vote.name,
        vote.surname,
        `"${vote.message}"`,
        new Date(vote.timestamp).toLocaleString('es-ES')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ganadores-baby-aldana-${Date.now()}.csv`;
    a.click();
  };

  return (
    <BabyShowerContext.Provider value={{
      votes: state.votes,
      votingOpen: state.votingOpen,
      revealed: state.revealed,
      revealedGender: state.revealedGender,
      messages: state.messages,
      addVote,
      addMessage,
      closeVoting,
      openVoting,
      resetVoting,
      revealGender,
      exportVotes,
      exportWinners,
      editVote,
      deleteVote
    }}>
      {children}
    </BabyShowerContext.Provider>
  );
}

export function useBabyShower() {
  const context = useContext(BabyShowerContext);
  if (!context) {
    throw new Error('useBabyShower must be used within BabyShowerProvider');
  }
  return context;
}
