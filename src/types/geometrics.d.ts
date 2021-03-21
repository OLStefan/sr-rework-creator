interface Point {
	x: number;
	y: number;
}

interface Rectangle {
	width: number;
	height: number;
}

interface Box extends Rectangle, Point {}
