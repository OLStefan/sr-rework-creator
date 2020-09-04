import { useSelector } from 'react-redux';

// UI
export const useDisplayMenu = () => useSelector((state) => state.ui.displayMenu);
export const useDarkMode = () => useSelector((state) => state.ui.darkMode);
export const useExpandedCards = () => useSelector((state) => state.ui.expandedCards);

// Character
export const useCharacterLoaded = () => useSelector((state) => !!state.character);
export const useCharacterName = () => useSelector((state) => state.character?.name || null);
export const useCharacter = () => useSelector((state) => state.character?.attributes || null);
