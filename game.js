var gamePattern = [],
    buttonColors = ["red", "blue", "green", "yellow"],
    userClickedPattern = [],
    started = !1,
    level = 0;

function nextSequence() {
    userClickedPattern = [], level++, $("#level-title").text("Level s" + level);
    var e = Math.floor(4 * Math.random()),
        t = buttonColors[e];
    gamePattern.push(t), $("#" + t).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100), playSound(t), started = !0
}

function playSound(e) {
    new Audio("sounds/" + e + ".mp3").play()
}

function animatePress(e) {
    $("." + e).addClass("pressed"), setTimeout(function () {
        $("." + e).removeClass("pressed")
    }, 100)
}

function checkAnswer(e) {
    userClickedPattern[e] == gamePattern[e] ? (console.log("success"), userClickedPattern.length == gamePattern.length && setTimeout(function () {
        nextSequence()
    }, 1e3)) : (new Audio("sounds/wrong.mp3").play(), $("body").addClass("game-over"), setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200), $("#level-title").text("Game Over, Press Any Key to Restart"), startOver())
}

function startOver() {
    level = 0, gamePattern = [], started = !1
}
$(".btn").click(function () {
    var e = $(this).attr("id");
    userClickedPattern.push(e);
    var t = userClickedPattern.length - 1;
    playSound(e), animatePress(e), checkAnswer(t)
}), $(document).keydown(function () {
    started || ($("#level-title").text("Level " + level), nextSequence(), started = !0)
});