import { useSelector } from 'react-redux';
import { State } from './rootReducer';

// UI
export const useDisplayMenu = () => useSelector((state: State) => state.ui.displayMenu);
export const useDarkMode = () => useSelector((state: State) => state.ui.darkMode);
export const useExpandedCards = () => useSelector((state: State) => state.ui.expandedCards);

// Character
export const useCharacterLoaded = () => useSelector((state: State) => !!state.character);
export const useCharacterName = () => useSelector((state: State) => state.character?.name || null);
export const useCharacter = () => useSelector((state: State) => state.character || null);

// Errors
export const useHints = () => useSelector((state: State) => state.messages.hints);
export const useErrors = () => useSelector((state: State) => state.messages.errors);
