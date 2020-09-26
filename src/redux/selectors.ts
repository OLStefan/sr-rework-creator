import { useSelector } from 'react-redux';
import { SectionName, TOOLTIP_BULLET_POINT, TOOLTIP_LINE_BREAK } from '../constants';
import { UndoableState } from './rootReducer';

// Histoy
export const useHasPast = () => useSelector(({ past }: UndoableState) => past.length >= 1);
export const useHasFuture = () => useSelector(({ future }: UndoableState) => future.length >= 1);

// UI
export const useIsDirty = () => useSelector(({ present: { ui, character } }: UndoableState) => false);
export const useDisplayMenu = () => useSelector(({ present: { ui } }: UndoableState) => ui.displayMenu);
export const useDarkMode = () => useSelector(({ present: { ui } }: UndoableState) => ui.darkMode);
export const useExpandedCard = (cardName: SectionName) =>
	useSelector(({ present: { ui } }: UndoableState) => ui.expandedCards[cardName]);

// Character
export const useCharacterLoaded = () => useSelector(({ present: { character } }: UndoableState) => !!character);
export const useCharacterName = () =>
	useSelector(({ present: { character } }: UndoableState) => character?.name || null);
export const useCharacter = () => useSelector(({ present: { character } }: UndoableState) => character || null);
export const useCharacterAttributes = () =>
	useSelector(({ present: { character } }: UndoableState) => character?.attributes || null);

// Errors
export const useErrorMessage = (sectionName: SectionName) =>
	useSelector(({ present: { messages } }: UndoableState) => {
		const errorMessages = messages.errors[sectionName];
		if (!errorMessages) {
			return '';
		}
		return errorMessages.length === 1
			? errorMessages[0]
			: errorMessages
					.sort()
					.reduce((prev, current) => `${prev}${TOOLTIP_BULLET_POINT} ${current}${TOOLTIP_LINE_BREAK}`, '');
	});
export const useHintMessage = (sectionName: SectionName) =>
	useSelector(({ present: { messages } }: UndoableState) => {
		const hintMessages = messages.hints[sectionName];
		if (!hintMessages) {
			return '';
		}
		return hintMessages.length === 1
			? hintMessages[0]
			: hintMessages
					.sort()
					.reduce((prev, current) => `${prev}${TOOLTIP_BULLET_POINT} ${current}${TOOLTIP_LINE_BREAK}`, '');
	});
