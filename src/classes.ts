type SpriteProps = {
	position: {
		x: number;
		y: number;
	};
	velocity?: number;
	image: HTMLImageElement;
	frames?: { max: number };
};

export class Sprite {
	position;
	image;
	frames;
	width;
	height;
	constructor({
		position,
		velocity,
		image,
		frames = { max: 1 },
	}: SpriteProps) {
		this.position = position;
		this.image = image;
		this.frames = frames;

		this.width = 0;
		this.height = 0;

		this.image.onload = () => {
			this.width = this.image.width / this.frames.max;
			this.height = this.image.height;
			console.log(this.width);
			console.log(this.height);
		};
	}

	draw(c: CanvasRenderingContext2D) {
		c.drawImage(
			this.image,
			0,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.position.x,
			this.position.y,
			this.image.width / this.frames.max,
			this.image.height
		);
	}
}

type BoundaryProps = {
	position: {
		x: number;
		y: number;
	};
};

export class Boundary {
	position;
	static width = 48;
	static height = 48;
	width;
	height;

	constructor({ position }: BoundaryProps) {
		this.position = position;
		this.width = 48;
		this.height = 48;
	}

	draw(c: CanvasRenderingContext2D) {
		c.fillStyle = "rgba(255, 0, 0, 0.0)";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
