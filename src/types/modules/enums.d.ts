import enums = require('../enums');
export = enums;
export as namespace enums;

declare global {
	type AttributeName = enums.AttributeName;
	type SectionType = enums.SectionType;
	type CharacterState = enums.CharacterState;
}
