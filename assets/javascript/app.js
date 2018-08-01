var questions;
var timer;
$(document)
    .ready(
        function () {
            $("#quiz").hide();

            var choices = [];
            choices[0] = makeChoice("Earth", 0);
            choices[1] = makeChoice("Mercury", 1);
            choices[2] = makeChoice("venus", 2);

            var question = {};
            question.question = "What is the closest planet to the Sun?";
            question.choices = choices;
            question.answerIndex = 1;

            var choices2 = [];
            choices2[0] = makeChoice("Neptune", 0);
            choices2[1] = makeChoice("Jupiter", 1);
            choices2[2] = makeChoice("Saturn", 2);

            var question2 = {};
            question2.question = "What is the name of the 2nd biggest planet in our solar system?";
            question2.choices = choices2;
            question2.answerIndex = 2;

            var choices3 = [];
            choices3[0] = makeChoice("Mars", 0);
            choices3[1] = makeChoice("Venus", 1);
            choices3[2] = makeChoice("Mercury", 2);

            var question3 = {};
            question3.question = "What is the hottest planet in our solar system?";
            question3.choices = choices3;
            question3.answerIndex = 1;


            var choices4 = [];
            choices4[0] = makeChoice("Jupiter", 0);
            choices4[1] = makeChoice("Saturn", 1);
            choices4[2] = makeChoice("Mars", 2);

            var question4 = {};
            question4.question = "What planet is famous for its big red spot on it?";
            question4.choices = choices4;
            question4.answerIndex = 0;

            questions = [question, question2, question3, question4];

            for (var i = 0; i < questions.length; i++) {
                console.log(questions[i].question);
                var question = questions[i];
                $("#question_" + (i + 1)).text(question.question);
                for (var k = 0; k < question.choices.length; k++) {
                    var answer = question.choices[k].answer;
                    $("#question-" + (i + 1) + "-choice-" + (k + 1) + "-label-" + (k + 1)).text(answer);

                }
            }
            resetScreen();
        }
    );


$("#submit").click(function () {
    processSubmit();
});
$("#reset").click(function () {
    processReset();
});
$("#start").click(function () {
    processReset();
});
$("#playAgain").click(function () {
    resetScreen();
});

function resetScreen() {
    $("#startGame").show();
    $("#endGame").hide();
    $("#quiz").hide();
    $("input[type=radio]").attr('disabled', false);
    $("input[type=radio]").prop('checked', false);
    $("#submit").prop('disabled', false);
}

function makeChoice(answer, id) {
    var choice = {};
    choice.answer = answer;
    choice.id = id;
    return choice;
}

function processReset() {
    $("#quiz").show();
    $("#startGame").hide();
    $("#endGame").hide();
    clearInterval(timer);                   
    startTimer();
    $("input[type=radio]").attr('disabled', false);
    $("input[type=radio]").prop('checked', false);
    $("#submit").prop('disabled', false);
}

function processSubmit() {
    $("#endGame").show();
    $("#startGame").hide();
    $("#quiz").hide();

    //stop timer
    clearInterval(timer);
    $("input[type=radio]").attr('disabled', true);
    $("#submit").attr("disabled", "disabled");
    $("#endGame").show();

    var correctAnswer = 0;
    for (var i = 0; i < questions.length; i++) {
        console.log(questions[i].question);
        var question = questions[i];
        for (var k = 0; k < question.choices.length; k++) {
            var answer = question.choices[k].answer;
            var myValue = $("#question-" + (i + 1) + "-choice-" + (k + 1) + ":checked").val();
            if (myValue == "on") {
                if (question.answerIndex == k) {
                    correctAnswer = correctAnswer + 1;
                }
                $("#correctAnswer").text("Correct Guesses: " + correctAnswer);
            }
            
        }
        
    }
    
}
//alert(correctAnswer);

function startTimer(){
var start = new Date;
secondsLeft = 0;
var secondsLimit = 30;
timer = setInterval(function () {
    var secondsLeft = secondsLimit - Math.round((new Date - start) / 1000);
    $('#clock').text(secondsLeft + " Seconds Left");
 if(secondsLeft <= 0){
 processSubmit();
}
 }, 1000);
}
