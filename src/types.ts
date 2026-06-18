export type Gender = 'niña' | 'niño';

export interface Vote {
  id: string;
  name: string;
  surname: string;
  prediction: Gender;
  message: string;
  timestamp: number;
  photoUrl?: string;
}

export interface AppState {
  votes: Vote[];
  votingOpen: boolean;
  revealed: boolean;
  revealedGender: Gender | null;
  messages: Message[];
}

export interface Message {
  id: string;
  name: string;
  text: string;
  gender: Gender;
  timestamp: number;
}

export const COLORS = {
  niña: {
    primary: '#E8A598',
    name: 'Terracotta Old Rose',
    hex: '#E8A598'
  },
  niño: {
    primary: '#8FA5B5',
    name: 'Slate Blue',
    hex: '#8FA5B5'
  },
  gold: '#B79B5B',
  goldLight: '#C4A35A',
  background: '#F8F5EE',
  backgroundAlt: '#FAF8F2',
  text: '#2C2A27',
  beige: '#CBBBA5'
};
