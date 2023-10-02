var colorList=["red","yellow","blue","green"];

var userClickPattern=[];
var gamePattern=[];

var started=false;
var level=0;

$(document).keypress(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });

 

  function nextSequence() {		//nextSequence is clled for every level up to give another random color.

    userClickPattern = [];		//This is empty because every time level changes the user has to enter from the starting .
    level++;
    $(".fonting").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = colorList[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

  }

  $(".outline").click(function() {          // User clicks the buttons of the same sequence as the computer generated sequence.

    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkPattern(userClickPattern.length-1);
    
  });

  function start(){
    if (level===0){
      nextSequence();
      $("button").hide();

      
    }
  }

  function checkPattern(currentLevel){  		// This function is called for every click to check whether the color is same on both arrays at "i"th index.

    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
        if(gamePattern.length===userClickPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        if(gamePattern.length>0){
            $(".fonting").text("Your Score is "+(gamePattern.length-1));
        }
        else{
            $(".fonting").text("Your Score is "+gamePattern.length);
        }
        setTimeout(function () {
            $(".fonting").text("Game Over, Press Any Key to Restart");
        }, 2000);
        $(".fonting").css("font-size","4rem");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        
        $("button").show();
        startOver();
      }
  }




function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
} 



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  