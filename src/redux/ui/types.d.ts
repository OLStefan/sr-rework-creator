export interface UiState {
	currentIncrement: number;
	savedIncrement: number;
	displayMenu: boolean;
	darkMode: boolean;
	expandedCards: { [x in SectionName]: boolean };
}
