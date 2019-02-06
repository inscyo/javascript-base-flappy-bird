/* ----------------------------------------------------
| insyco.js is a simple javascript library for canvas
| created by inson concepcion !
| can use in canvas game
| can use in canvas animations
| insyco.js 2019
------------------------------------------------------- */
let ctx;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let width;
let height;
let gw = windowWidth/2;
let mouseX, mouseY;
/* --------------------------------------------
#
# Javascript event listeners for variables
#
----------------------------------------------- */
window.addEventListener('mousemove', (e) =>{mouseX = e.x;mouseY = e.y;});
/* --------------------------------------------
# Documentations | Referrence
#
# Create canvas, loop, backgrounds
#
----------------------------------------------- */
function createCanvas(w, h, parent){
	/* ----------------------------------
	| Inserting canvas tag on parent tag
	| ex: #parent
	------------------------------------- */
	const ctxp = document.querySelector('#canvas-parent');
	const crt = document.createElement('canvas');
	crt.setAttribute('id', 'canvas');
	ctxp.appendChild(crt);
	const canvas = document.querySelector('#canvas');
	canvas.width = w;
	canvas.height = h;
	ctxp.style.width = w+'px';
	ctxp.style.height = h+'px';
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext('2d');
}
function loop(sketch, background){
	/* ------------------------
	| sketch is the function you wanted to loop
	| using requestAnimationFrame
	| background the background of canvas
	| you can add here any css colors:
	| hexadecimal colors
	| rgba colors
	| rgb colors
	| hsla colors
	| normal colors
	| transparent
	| none
	| add them width qoutes
	| ex: '#fff', "rgba()", "hsla()", "rgb()"
	------------------------- */
	requestAnimationFrame(sketch);
	ctx.clearRect(0, 0, width, height);
	canvas.setAttribute('style', 'background-color:' + background);
}
/* --------------------------------------------
#
# Canvas shapes, shape style, text, text style
#
----------------------------------------------- */
function nostroke(){
	/* -------------------------------
	| removing object stroke weight
	---------------------------------- */
	ctx.lineWidth = 0;
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.0)';
}
function strokeweight(size){
	/* -------------------------------
	| size = size of the object stroke
	| ex: strokeweight(5)
	---------------------------------- */
	ctx.lineWidth = size;
}
function fill(color){
	/* -----------------------------------
	| color = color of the object
	| ex: fill('red') or fill('#fff') etc
	-------------------------------------- */
	ctx.fillStyle = color;
}
function ellipse(x, y, size){
	/* ---------------------------------
	| x = x position of the ellipse
	| y = y position of the ellipse
	| w = width of the ellipse
	| h = height of the ellipse
	| ex: ellipse(100, 100, 50, 50)
	------------------------------------ */
	ctx.beginPath();
	ctx.arc(x, y, size, Math.PI * 2, false);
	ctx.fill();
	ctx.stroke();
}
function rectangle(x, y, w, h){
	/* -----------------------------------
	| x = x position of the retangle
	| y = y position of the retangle
	| w = width of the rectangle
	| h = height of the rectangle
	| ex: retangle(100, 100, 50, 50)
	-------------------------------------- */
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fill();
	ctx.stroke();
}
function text(txt, x, y){
	/* ------------------------
	| txt = some text
	| x = x position of the text
	| y = y position of the text
	| ex: text('sometext', 100, 100)
	--------------------------- */
	ctx.fillText(txt, x, y);
}
function textStyle(font){
	/* ----------------------------
	| font = text size and font
	| ex: textStyle('30px arial')
	------------------------------- */
	ctx.font = font;
}
/* --------------------------------------
#
# Canvas load files images, sounds etc
#
----------------------------------------- */
function spriteimage(file, sx, sy, swidth, sheight, x, y, width, height){
	/* -----------------------------------------
	| Multiple image sprite
	| file = Specifies the image, canvas, or video element to use
	| sx = Optional. The x coordinate where to start clipping
	| sy = Optional. The y coordinate where to start clipping
	| swidth = Optional. The width of the clipped image
	| sheight = Optional. The height of the clipped image
	| x = The x coordinate where to place the image on the canvas
	| y = The Y coordinate where to place the image on the canvas
	| width = Optional The width of the image to use (stretch or reduce the image)
	| heigth = Optional. The height of the image to use (stretch or reduce the image)
	| ex: image(variable, 100, 100, 50, 50)
	-------------------------------------------- */
	ctx.drawImage(file, sx, sy, swidth, sheight, x, y, width, height);
}
function singleimage(file, x, y, w, h){
	/* ---------------------------
	| single iamge for sprite
	| file = variable of image
	| x = x position of the image
	| y = y position of the image
	| w = width of the image
	| h = height of the image
	| ex: image(variable, 100, 100, 50, 50)
	------------------------------ */
	ctx.drawImage(file, x, y, w, h);
}
/* --------------------------------------
#
# javascript calculation
#
----------------------------------------- */
function random(min, max){
	/* ------------------------------
	| min = start of the random
	| max = max of the random number
	| ex: random(10, 10)
	--------------------------------- */
	 return Math.random() * (max - min + 1) + min;
}
function floor(num){
	/* -----------------------------------------------
	| num = number you wanted to remove decimal point
	| ex: floor(1.0023425)
	-------------------------------------------------- */
	return Math.floor(num);
}
function distance(fx, fy, sx, sy){
	/* ---------------------------------------------
	| will return the value of the distance between:
	| first object x (fx)
	| first object y (fy)
	| second object x (sx)
	| second object y (sy) 
	| ex: distance(100, 100, 100, 100)
	------------------------------------------------ */
	let x = sx - fx;
	let y = sy - fy;
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
/* -----------------
| Don't remove this 
-------------------- */
setup();
draw();
