import { useSelector } from 'react-redux';
import { SectionName, TOOLTIP_BULLET_POINT, TOOLTIP_LINE_BREAK } from '../constants';
import { State } from './rootReducer';

/*
 * Getter
 */
export const isMenuDisplayed = ({ ui }: State) => ui.displayMenu;
export const isSelectingCharacter = ({ ui }: State) => ui.loadingCharacter;
export const getDarkMode = ({ ui }: State) => ui.darkMode;
export const getAllowLocalStorage = ({ ui }: State) => ui.allowLocalStorage;

export const hasPast = ({ editor: { past } }: State) => past.length >= 1;
export const hasFuture = ({ editor: { future } }: State) => future.length >= 1;
export const isDirty = ({
	editor: {
		present: { currentCharacter },
	},
	storage,
}: State) =>
	!!currentCharacter &&
	(!storage[currentCharacter.uuid] || currentCharacter.increment !== storage[currentCharacter.uuid].increment);
export const getExpandedCard = (
	cardName: SectionName,
	{
		editor: {
			present: { expandedCards },
		},
	}: State,
) => expandedCards[cardName];

export const isCharacterLoaded = ({
	editor: {
		present: { currentCharacter },
	},
}: State) => !!currentCharacter;
export const getCharacterName = ({
	editor: {
		present: { currentCharacter },
	},
}: State) => currentCharacter?.name || null;
export const getCurrentCharacter = ({
	editor: {
		present: { currentCharacter },
	},
}: State) => currentCharacter || null;
export const getAttributes = ({
	editor: {
		present: { currentCharacter },
	},
}: State) => currentCharacter?.attributes || null;

export const getErrorMessage = (
	sectionName: SectionName,
	{
		editor: {
			present: { messages },
		},
	}: State,
) => {
	const errorMessages = messages.errors[sectionName];
	if (!errorMessages) {
		return '';
	}
	return errorMessages.length === 1
		? errorMessages[0]
		: errorMessages
				.sort()
				.reduce((prev, current) => `${prev}${TOOLTIP_BULLET_POINT} ${current}${TOOLTIP_LINE_BREAK}`, '');
};
export const getHintMessage = (
	sectionName: SectionName,
	{
		editor: {
			present: { messages },
		},
	}: State,
) => {
	const hintMessages = messages.hints[sectionName];
	if (!hintMessages) {
		return '';
	}
	return hintMessages.length === 1
		? hintMessages[0]
		: hintMessages
				.sort()
				.reduce((prev, current) => `${prev}${TOOLTIP_BULLET_POINT} ${current}${TOOLTIP_LINE_BREAK}`, '');
};

/*
 * Selectors
 */

// UI
export const useIsMenuDisplayed = () => useSelector(isMenuDisplayed);
export const useIsSelectingCharacter = () => useSelector(isSelectingCharacter);
export const useDarkMode = () => useSelector(getDarkMode);
export const useAllowLocalStorage = () => useSelector(getAllowLocalStorage);

// Editor
export const useHasPast = () => useSelector(hasPast);
export const useHasFuture = () => useSelector(hasFuture);
export const useIsDirty = () => useSelector(isDirty);
export const useExpandedCard = (cardName: SectionName) =>
	useSelector((state: State) => getExpandedCard(cardName, state));

// Character
export const useCharacterLoaded = () => useSelector(isCharacterLoaded);
export const useCharacterName = () => useSelector(getCharacterName);
export const useCurrentCharacter = () => useSelector(getCurrentCharacter);
export const useCharacterAttributes = () => useSelector(getAttributes);

// Errors
export const useErrorMessage = (sectionName: SectionName) =>
	useSelector((state: State) => getErrorMessage(sectionName, state));
export const useHintMessage = (sectionName: SectionName) =>
	useSelector((state: State) => getHintMessage(sectionName, state));
