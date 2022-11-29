export type SpriteProps = {
	position: {
		x: number;
		y: number;
	};
	velocity?: number;
	image: HTMLImageElement;
	frames?: { max: number };
};

export type BoundaryProps = {
	position: {
		x: number;
		y: number;
	};
};