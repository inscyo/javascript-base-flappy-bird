function Location1(sx, sy, swidth, sheight, x, y, width, height){
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.xs = 3;
}
Location1.prototype = {
	draw: function () {
		spriteimage(spritesheet, 295, 0, 256, 512, this.x, this.y, width, height);
	},
	move: function(){
	this.x -= this.xs;
		if(this.x <= -width){
			this.x = width - this.xs;
		}
	}
}
function Location2(sx, sy, swidth, sheight, x, y, width, height){
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.xs = 3;
}
Location2.prototype = {
	draw: function () {
		spriteimage(spritesheet, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.w, this.h);
	},
	move: function(){
		this.x -= this.xs;
		if(this.x <= 0){
			this.x = width;
		}
	}
}
function Blocks1(sx, sy, swidth, sheight, x, y, width, height){
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.xs = 4;
}
Blocks1.prototype = {
	draw: function(){
		spriteimage(spritesheet, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.w + 21, this.h);
	},
	move: function(){
	this.x -= this.xs;
		if(this.x <= -width){
			this.x = 0;
		}
	}
}
function Blocks2(sx, sy, swidth, sheight, x, y, width, height){
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.xs = 4;
}
Blocks2.prototype = {
	draw: function(){
		spriteimage(spritesheet, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.w + 21, this.h);
	},
	move: function(){
		this.x -= this.xs;
		if(this.x <= 0){
			this.x = width;
		}
	}
}
function Pipe(){
	this.x = width;
	this.pipetop = random(50, height/2);
	this.pipebottom = random(112, height/2);
	this.w = 52;
	this.xs = 1;
	this.gone = false;
	this.stops = false;
}
Pipe.prototype = {
	draw: function(){
		singleimage(pipesprite[0], this.x, 0, this.w, this.pipetop);
		singleimage(pipesprite[1], this.x, height - this.pipebottom, this.w, this.pipebottom);
	},
	move: function(){
		this.x -= this.xs;
		if(this.x <= 0 - this.w){
			this.gone = true;
		}
	},
	passed: function(){
		if(bird.x >= this.x + this.w + bird.w/2){
			return true;
		}else{
			return false;
		}
	},
	gameover: function(){
		if(bird.y <= this.pipetop || bird.y >= height - this.pipebottom){
			if(bird.x + bird.w >= this.x && bird.x <= this.x + this.w){
				return true;
			}
		}
	}
}
window.addEventListener('keypress', (e)=>{
		if(game){
		if(e.keyCode === 32){
			bird.flying();
			tap.play();
			pipesadd = 4000;
		}else if(e.keyCode === 38){
			bird.flying();
			tap.play();
			pipesadd = 4000;
		}
	}
});
function Bird(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fly = -15;
	this.gravity = 0.5;
	this.velocity = 0;
}
Bird.prototype = {
	draw: function(){
	singleimage(birdsprite, this.x, this.y, this.w, this.h);
	},
	flying: function() {
		this.velocity += this.fly;
	},
	move: function(){
		this.velocity += this.gravity;
		this.y += this.velocity;
		if(this.y >= height-112-this.h){
			this.gravity = 0;
			this.y = height - 112 - this.h;
		}
	},
	hitbottom: function(){
		if(this.y >= height-112-this.h){
			return true;
		}else{
			return false;
		}
	},
	score: function(){
		let hs = width-30;
		if(parseInt(localStorage.getItem('score')) > 10){
			hs = width-45;
		}
		fill('#fff');
		textStyle('20px flappy');
		text(sc, 15, 30);
		text(parseInt(localStorage.getItem('score')), hs, 30);
	}
}
function Messages(){
	this.x = width/2/1.7;
	this.y = height/4;	
}
Messages.prototype = {
	startgame: function(){
		// Rate
		let ratex = this.x+57;
		let ratey = this.y+90;
		rate.setAttribute('style', `display: block;left:${ratex}px; top: ${ratey}px`);
		// play btn
		let playbtnx = this.x+5;
		let playbtny = this.y+150;
		playbtn.setAttribute('style', `display: block;left:${playbtnx}px; top: ${playbtny}px`);
		// Leaderboard
		let leaderboardx = this.x+110;
		let leaderboardy = this.y+150;
		leaderboard.setAttribute('style', `display: block;left:${leaderboardx}px; top: ${leaderboardy}px`);
		spriteimage(spritesheet, 701, 178, 185, 50, this.x+5, this.y, 180, 50);
		spriteimage(spritesheet, 701, 180, 185, 50, this.x+5, this.y, 180, 50);
		spriteimage(spritesheet, 925, 0, 67, 40, ratex, ratey, 67, 40);
		spriteimage(spritesheet, 707, 230, 110, 70, playbtnx, playbtny, 70, 45);
		spriteimage(spritesheet, 828, 230, 110, 70, leaderboardx, leaderboardy, 70, 45);
		fill('#333');
		textStyle('15px Helvetica');
		text('github.com/jwenson', width/2-65, height/2+300);
	},
	readygame: function(){
		singleimage(messagesprite[0], this.x, this.y, 184, 267);
	},
	gameover: function(){
		// Try again
		let tryagainx = this.x-24;
		let tryagainy = this.y+150;
		tryagain.setAttribute('style', `display: block;left:${tryagainx}px; top: ${tryagainy}px`);
		// Leader boards
		let leaderboardsx = this.x+150;
		let leaderboardsy = this.y+150;
		leaderboards.setAttribute('style', `display: block;left:${leaderboardsx}px; top: ${leaderboardsy}px`);
		// Main menu
		let mainmenux = this.x+64;
		let mainmenuy = this.y+200;
		mainmenu.setAttribute('style', `display: block;left:${mainmenux}px; top: ${mainmenuy}px`);
		// ok
		let okx = this.x+64;
		let oky = this.y+240;
		ok.setAttribute('style', `display: block;left:${okx}px; top: ${oky}px`);
		spriteimage(spritesheet, 790, 120, 200, 50, this.x, this.y - 70, 200, 50);
		spriteimage(spritesheet, 2, 512, 232, 132, this.x - 30, this.y, 250, 135);
		spriteimage(spritesheet, 707, 230, 110, 70, tryagainx, tryagainy, 70, 45);
		spriteimage(spritesheet, 828, 230, 110, 70, leaderboardsx, leaderboardsy, 70, 45);
		spriteimage(spritesheet, 922,49, 87, 30, mainmenux, mainmenuy, 70, 30);
		spriteimage(spritesheet, 922, 81, 87, 30, this.x+64, this.y+240, 70, 30);
	},
	newbest: function(){
		spriteimage(spritesheet, 225, 1000, 30, 15, this.x+120, this.y+64, 30, 15);
	},
	bronze: function(){
		spriteimage(spritesheet, 222, 1024 - 72, 50, 50, this.x+2, this.y+47.5, 50, 50);
		this.score();
	},
	gold: function(){
		spriteimage(spritesheet, 240, 561, 50, 50, this.x+2, this.y+47.5, 50, 50);
		this.score();
	},
	silver: function(){
		spriteimage(spritesheet, 240, 513, 50, 50, this.x+2, this.y+47.5, 50, 50);
		this.score();
	},
	score: function(){
		let scorex = this.x + 177;
		let hs = this.x + 177;
		if(parseInt(localStorage.getItem('score')) < 10){
			hs = this.x + 183;
		}
		if(parseInt(localStorage.getItem('score')) > 99){
			hs = this.x + 163;
		}
		if(sc < 10){
			scorex = this.x + 183;
		}
		fill('#fff');
		textStyle('20px flappy');
		text(sc, scorex, this.y +57);
		text(parseInt(localStorage.getItem('score')), hs, this.y + 100);
	}
}