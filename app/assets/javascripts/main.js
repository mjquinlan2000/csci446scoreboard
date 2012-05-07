var guessesLeft = 10;
var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var secret_number;
var timer_id;
var loser_message = 'YOU LOST';
var message_counter = -1;

$(function() {
  updateScore(guessesLeft);
  populateHighScores(highScores);
  $('h2#user_prompt').hide();
  $('#winner_message').hide();
  $('#loser_message').hide();
});

function populateHighScores(scores) {
	$('div#highScores').html("");
  for (var i = 0; i < scores.length; ++i) {
    $('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
  }
}

function updateScore(score) {
  $('h2#score span#guessesLeft').text(score);
}

function genRandomNum(){
	secret_number = Math.floor(Math.random()*100 + 1);
}

function reset(){
	$('input#guess').val("");
	$('#user_prompt').slideUp();
	$('#loser_message').slideUp();
	$('#winner_message').slideUp();
	$('#winner_message').text("");
	$('#loser_message').text("");
	$('form#guessTheNumber').slideDown();
	$('h2#score').slideDown();
	guessesLeft = 10;
	updateScore(guessesLeft);
	genRandomNum();
	clearInterval(timer_id);
}

function changeUserPrompt(prompt)
{
	$('#user_prompt').text(prompt);
	if($('#user_prompt').css("display") == 'none'){
		$('#user_prompt').slideDown();
	}else{
		$('#user_prompt').effect("highlight", {color:"#ff0000"} , 700);
	}
}

function winnerMessage(){
	var color1 = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
	var color2 = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
	$('#winner_message').css('background-color', color1);
	$('#winner_message').css('color', color2);
}

function loserMessage(){
	if(message_counter++ < loser_message.length){
		$('#loser_message').append(loser_message.charAt(message_counter));
	}else{
		clearInterval(timer_id)
	}
}

function gameEnd(){
	$('h2#score').slideUp();
	$('form#guessTheNumber').slideUp();
	$('#user_prompt').slideUp();
}

function winnerPrompt(){
	var username;
	while(username == null || username == ''){
		username=prompt("What is your username?");
	}
	highScores.push([++guessesLeft, username]);
	populateHighScores(highScores);
}

$(document).ready(function(){
	genRandomNum();
	$('form#guessTheNumber input#btnGuess').click(function(){
		if($('form#guessTheNumber input#guess').val() != ""){
			var user_guess = $('input#guess').val();
			var rexp = /^\d+$/;
			user_guess = user_guess.replace(/ /g, "");
			if(!rexp.test(user_guess) || parseInt(user_guess) < 1 || parseInt(user_guess) > 100){
				alert("That is not a valid input. Only guess numbers between 1 and 100");
				return;
			}else{
				var int_user_guess = parseInt(user_guess);
				if(int_user_guess == secret_number){
					gameEnd();
					$('#winner_message').slideDown();
					timer_id = setInterval(winnerMessage, 100);
					winnerPrompt();
				}else{
					updateScore(--guessesLeft);
					if(guessesLeft == 0){
						gameEnd();
						$('#loser_message').slideDown();
						timer_id = setInterval(loserMessage, 500)
					}else{
						if(int_user_guess > secret_number){
							changeUserPrompt("Guess Lower");
						}else{
							changeUserPrompt("Guess Higher");
						}
					}
				}
			}
		}else{
			alert("You must guess something");
		}
	});
	
	$('#btn_reset').click(function(){
		reset();
	});
});

