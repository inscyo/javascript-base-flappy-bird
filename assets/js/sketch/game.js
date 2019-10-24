let cgw, game = false, gameon = 4000, gready = true, best = false, diecount = 0, 
ready = true, lf = 1, sc = 0, spritesheet, locations1, locations2, blocks1, blocks2,
pipes = [], pipesprite = [], pipesadd = 4500, bird, birdsprite, tap = document.querySelector('.tap'), hit = document.querySelector('.hit'), point =  document.querySelector('.point'), die =  document.querySelector('.die')
,theme =  document.querySelector('.theme'), message, messagesprite = [];
let rate = document.querySelector('.rate');
let playbtn = document.querySelector('.playbtn');
let leaderboard = document.querySelector('.leaderboard');
let tryagain = document.querySelector('.tryagain');
let leaderboards = document.querySelector('.leaderboards');
let mainmenu = document.querySelector('.mainmenu');
let ok = document.querySelector('.ok');
function setup(){
	cgw = 445.5;
	if(!localStorage.getItem('score')){
		localStorage.setItem('score', '0');
	}
	createCanvas(windowWidth, windowHeight, '#canvas-parent');
	spritesheet = new Image();
	spritesheet.src = 'resources/sprites/sprite/sprite.png';
	for(let i = 0; i < 2; i++){
		pipesprite[i] = new Image();
		pipesprite[i].src = 'resources/sprites/pipes/pipe'+i+'.png';
	}
	birdsprite = new Image();
	birdsprite.src = 'resources/sprites/bird/green/bird0.png';
	for(let i = 0; i < 3; i++){
		messagesprite[i] = new Image();
		messagesprite[i].src = 'resources/sprites/message/message'+i+'.png';
	}
	locations1 = new Location1(295, 0, 256, 512, 0, 0, width, height);
	locations2 = new Location1(295, 0, 256, 512, width, 0, width, height);
	blocks1 = new Blocks1(585, 0, 225, 512/4, 0, height-512/4, width, 512 - 365);
	blocks2 = new Blocks2(585, 0, 225, 512/4, 0, height-512/4, width, 512 - 365);

	setInterval(function(){
		if(game){
			pipes.push(new Pipe());
		}
	}, pipesadd);

	let x = random(15, 40);
	let w = 34;
	let y = height/2 - w*2;
	let h = 24;
	bird = new Bird(x, y, w, h);

	message = new Messages();

}
function draw(){
	loop(draw, '#000');
	locations1.draw();
	locations1.move();
	locations2.draw();
	locations2.move();
	if(game){
	for(let i = 0; i < pipes.length; i++){
		pipes[i].draw();

		if(pipes[i].gone){
			pipes.splice(i, 1);
		}
	}
	}
	blocks1.draw();
	blocks1.move();
	blocks2.draw();
	blocks2.move();
	bird.draw();
	
	if(game){
		theme.muted = true;
		bird.move();
		bird.score();

		if(gready){
			message.readygame();
			setTimeout(function(){
				gready = false;
			}, gameon);
		}
	
		setTimeout(()=>{
		for(let i = 0; i < pipes.length; i++){
			if(pipes[i].gameover(bird)){
				pipes.xs = 0;
				hit.play();
				lf = 0;
				pipes.splice(i, 1);
				bird.fly = 0;
				tap.pause();
				tap.muted = true;
				die.play();
			}
			if(pipes[i].passed()){
				sc++;
				pipes.splice(i, 1);
				point.play();
			}
		}

		}, gameon);
		}else{
			message.startgame();
		}

		if(bird.hitbottom()){
			pipes.xs = 0;
			lf = 0;
			bird.fly = 0;
			tap.muted = true;
			gameon = 0;
			die = 1;
		}
			if(lf <= 0){
				if(!localStorage.getItem('score')){
					localStorage.setItem('score', sc);
				}
				else {
					if(sc > parseInt(localStorage.getItem('score'))){
						best = true;
						localStorage.setItem('score', sc);
						localStorage.setItem(sc, sc);
					}
				}
			message.gameover();
			pipesadd = 0;
			locations1.xs = 0;
			//locations1.x = 0;
			locations2.xs = 0;
			//locations2.x = width;
			blocks1.xs = 0;
			//blocks1.x = 0;
			blocks2.xs = 0;
			//blocks2.x = width;
			if(sc <= 0){
				sc = 0;
				message.score();
			}
			else if(sc > 0){
				message.bronze();
			}else if(sc > 20){
				message.gold();
			}else if(sc > 40){
				message.silver();
			}
	}else{
		if(game){
			for(let i = 0; i < pipes.length; i++){
			pipes[i].move();
		}
		}
	}
	if(best){
		message.newbest();
	}

}
function fplaybtn(){
	game = true;
	if(!localStorage.getItem('score')){
		localStorage.setItem('score', '0');
	}
}
