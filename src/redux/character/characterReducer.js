const initialState = { attributes: {}, skills: {} };

export default function (character = initialState, action) {
	switch (action.type) {
		default:
			return character;
	}
}
