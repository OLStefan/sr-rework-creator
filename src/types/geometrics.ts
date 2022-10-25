export interface Point {
	x: number;
	y: number;
}

export interface Rectangle {
	width: number;
	height: number;
}

export interface Box extends Rectangle, Point {}
