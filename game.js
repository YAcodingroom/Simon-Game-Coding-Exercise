var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;

var level = 0;

var indexOfAns = 0;

$(document).on("keypress", function() {
  if (!start) {
    start = true;
    setTimeout(function() {
      nextSequence();
    }, 300)
  }
})

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenColour);
})

function nextSequence() {
  level ++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour  = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // $("#" + randomChosenColour).delay(100).fadeOut().fadeIn('slow');
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  start =false;
  level = 0;
  indexOfAns = 0;
}

function checkAnswer(currentLevel) {
  if (currentLevel === gamePattern[indexOfAns]) {
    indexOfAns++;
    if (indexOfAns === gamePattern.length) {
      indexOfAns = 0;
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}
