var whackamole = {
	active: false,
	score: 0,
	clickes: 0,
	clicked: false,
	

	
	startGame: function() {
		var that = this;
		that.score = 0;
		$('.board').on('click','.wacked', function(){
			console.log('clicked');
			that.score+=1;
			that.displayScore();
		});

		intervalId = setInterval(function(){
				var number = that.randomNumber(1,9)
				var $tile = $('[data-tile="'+number+'"]')

				$tile.addClass("wacked");
				
				setTimeout(function() {
					$tile.removeClass("wacked");
				},1000);
			},1500);
	},

	endGame: function() {
		clearInterval(intervalId)
	},

	//Generates random number for tile selection
	randomNumber: function(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	},

	//displays the score onto the page
	displayScore: function(){
		$('.score h2').text('Score: '+this.score);
	},
};	

function makeNewPosition() {
	var h = $(window).height()-375;
	var w = $(window).height()-375;

	var nh = Math.floor(Math.random() * h);
	var nw = Math.floor(Math.random() * w);

	return [nh,nw];
};

function animateDiv(){
	var newq = makeNewPosition();
	var oldq = $('.board').offset();
	var speed = calcSpeed([oldq.top, oldq.left], newq);
	$('.board').animate({ top: newq[0], left: newq[1]},function(){
		animateDiv();
	});
};

function calcSpeed(prev,next){
	var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 12;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;
};

$(document).ready(function(){
	var audio = new Audio("/sounds/ready.mp3");
	$('.start').on('mouseup',function(){
		whackamole.startGame();
		animateDiv();
		audio.play();
		
	});
	$('.giveup').on('mouseup', function(){
		whackamole.endGame();
		$('.board').stop();
		audio.pause();
	});


})