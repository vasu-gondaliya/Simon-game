var buttonColors = ["red", "yellow", "green", "blue"];
var gameSequence = [];
var userSequence = [];
var level = 0;
var started = false;
$(document).keypress(function () {
    if (!started) {
        $(".heading").text("Level " + level);
        nextNumber();
        started = true;
    }
});
$(".btn").click(function () {
    var selectedButton = $(this).attr("id");
    userSequence.push(selectedButton);
    flashButton(selectedButton);
    audioButton(selectedButton);
    checkAnswer(userSequence.length - 1);
});
function checkAnswer(currentLevel) {

    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(function () {
                nextNumber();
            }, 1000);
        }
    }
    else {
        audioButton("wrong");
        $(".heading").text("Game Over. Press any key to restart.");
        $("body").addClass("gameover");
        setTimeout(function () { $("body").removeClass("gameover"); }, 200);
        newGame();
    }
}
function nextNumber() {
    userSequence = [];
    level++;
    var nextNumber = Math.floor(Math.random() * 4);
    var nextColor = buttonColors[nextNumber];
    gameSequence.push(nextColor);
    flashButton(nextColor);
    audioButton(nextColor);
    $(".heading").text("Level " + level);
}
function flashButton(selectedButton) {
    $("." + selectedButton).fadeToggle(100).fadeToggle(100);
}
function audioButton(selectedButton) {
    var audio = new Audio("audio/" + selectedButton + ".mp3");
    audio.play();
}
function newGame() {
    level = 0;
    gameSequence = [];
    started = false;
}