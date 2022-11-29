import { collisions } from "./collisions";
import { Sprite, Boundary } from "./classes";

import map from "../assets/img/map.png";
import playerDown from "../assets/img/playerDown.png";
import foregroundObjects from "../assets/img/foregroundObjects.png";

const canvas = <HTMLCanvasElement>document.querySelector("canvas");

const c = <CanvasRenderingContext2D>canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
console.log(c);

c.fillStyle = "#ffffff";
c.fillRect(0, 0, canvas.width, canvas.height);

const collisionsMap: number[][] = [];

for (let i = 0; i < collisions.length; i += 70) {
	collisionsMap.push(collisions.slice(i, 70 + i));
}

const offset = {
	x: -832,
	y: -620,
};

const boundaries: Boundary[] = [];

collisionsMap.forEach((row, rowIndex) => {
	row.forEach((symbol, symbolIndex) => {
		if (symbol === 1025) {
			boundaries.push(
				new Boundary({
					position: {
						x: symbolIndex * Boundary.width + offset.x,
						y: rowIndex * Boundary.height + offset.y,
					},
				})
			);
		}
	});
});

const image = new Image();
image.src = map;

const foregroundImage = new Image();
foregroundImage.src = foregroundObjects;

const playerImage = new Image();
playerImage.src = playerDown;

let lastKey = "";

const player = new Sprite({
	position: {
		x: canvas.width / 2 - 192 / 4 / 2, //playerImage.width
		y: canvas.height / 2 - 68 / 2, //playerImage.height
	},
	image: playerImage,
	frames: {
		max: 4,
	},
});

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: image,
});

const foreground = new Sprite({
	position: {
		x: offset.x - 3,
		y: offset.y,
	},
	image: foregroundImage,
});

const keys = {
	w: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
};

const movables = [background, ...boundaries, foreground];

const rectangularCollision = ({
	rectangleOne,
	rectangleTwo,
}: {
	rectangleOne: Sprite;
	rectangleTwo: Boundary;
}) => {
	return (
		rectangleOne.position.x + rectangleOne.width >=
			rectangleTwo.position.x &&
		rectangleOne.position.x <=
			rectangleTwo.position.x + rectangleTwo.width &&
		rectangleOne.position.y <=
			rectangleTwo.position.y + rectangleTwo.height &&
		rectangleOne.position.y + rectangleOne.height >= rectangleTwo.position.y
	);
};

const animate = () => {
	window.requestAnimationFrame(animate);
	background.draw(c);
	boundaries.forEach((boundary) => {
		boundary.draw(c);
	});

	player.draw(c);
	foreground.draw(c);

	let moving = true;

	if (keys.w.pressed && lastKey === "w") {
		for (let i = 0; i < boundaries.length; i += 1) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangleOne: player,
					rectangleTwo: {
						// ...boundary,
						width: boundary.width,
						height: boundary.height,
						draw: boundary.draw,
						position: {
							x: boundary.position.x,
							y: boundary.position.y + 3,
						},
					},
				})
			) {
				console.log("colliding");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach((movable) => (movable.position.y += 3));
		}
	} else if (keys.a.pressed && lastKey === "a") {
		for (let i = 0; i < boundaries.length; i += 1) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangleOne: player,
					rectangleTwo: {
						// ...boundary,
						width: boundary.width,
						height: boundary.height,
						draw: boundary.draw,
						position: {
							x: boundary.position.x + 3,
							y: boundary.position.y,
						},
					},
				})
			) {
				console.log("colliding");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach((movable) => (movable.position.x += 3));
		}
	} else if (keys.s.pressed && lastKey === "s") {
		for (let i = 0; i < boundaries.length; i += 1) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangleOne: player,
					rectangleTwo: {
						// ...boundary,
						width: boundary.width,
						height: boundary.height,
						draw: boundary.draw,
						position: {
							x: boundary.position.x,
							y: boundary.position.y - 3,
						},
					},
				})
			) {
				console.log("colliding");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach((movable) => (movable.position.y -= 3));
		}
	} else if (keys.d.pressed && lastKey === "d") {
		for (let i = 0; i < boundaries.length; i += 1) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangleOne: player,
					rectangleTwo: {
						// ...boundary,
						width: boundary.width,
						height: boundary.height,
						draw: boundary.draw,
						position: {
							x: boundary.position.x - 3,
							y: boundary.position.y,
						},
					},
				})
			) {
				console.log("colliding");
				moving = false;
				break;
			}
		}
		if (moving) {
			movables.forEach((movable) => (movable.position.x -= 3));
		}
	}
};

animate();

window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "w":
			keys[event.key].pressed = true;
			lastKey = event.key;
			break;
		case "a":
			keys[event.key].pressed = true;
			lastKey = event.key;
			break;
		case "s":
			keys[event.key].pressed = true;
			lastKey = event.key;
			break;
		case "d":
			keys[event.key].pressed = true;
			lastKey = event.key;
			break;
	}
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "w":
			keys[event.key].pressed = false;
			break;
		case "a":
			keys[event.key].pressed = false;
			break;
		case "s":
			keys[event.key].pressed = false;
			break;
		case "d":
			keys[event.key].pressed = false;
			break;
	}
});
