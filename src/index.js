const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
console.log(c);

c.fillStyle = "#ffffff";
c.fillRect(0, 0, canvas.width, canvas.height);
