import { useSelector } from 'react-redux';
import { State } from './rootReducer';

// UI
export const useDisplayMenu = () => useSelector((state: State) => state.ui.displayMenu);
export const useDarkMode = () => useSelector((state: State) => state.ui.darkMode);
export const useExpandedCard = (cardName: string) => useSelector((state: State) => state.ui.expandedCards[cardName]);

// Character
export const useCharacterLoaded = () => useSelector((state: State) => !!state.character);
export const useCharacterName = () => useSelector((state: State) => state.character?.name || null);
export const useCharacter = () => useSelector((state: State) => state.character || null);
export const useCharacterAttributes = () => useSelector((state: State) => state.character?.attributes || null);

// Errors
export const useHints = () => useSelector((state: State) => state.messages.hints);
export const useErrorMessage = (sectionName: string) =>
	useSelector((state: State) => state.messages.errors[sectionName]);
export const useHintMessage = (sectionName: string) => useSelector((state: State) => state.messages.hints[sectionName]);
