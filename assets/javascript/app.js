var questions;
var timer;
$(document)
    .ready(
        function () {
            $("#quiz").hide();

            var choices = [];
            choices[0] = makeChoice("teacher", 0);
            choices[1] = makeChoice("santa", 1);
            choices[2] = makeChoice("mother", 2);

            var question = {};
            question.question = "\"You'll shoot your eye out, kid\"";
            question.choices = choices;
            question.answerIndex = 1;

            var choices2 = [];
            choices2[0] = makeChoice("bloodsport", 0);
            choices2[1] = makeChoice("Rambo", 1);
            choices2[2] = makeChoice("terminator", 2);

            var question2 = {};
            question2.question = "\"I'll be back\"";
            question2.choices = choices2;
            question2.answerIndex = 2;

            var choices3 = [];
            choices3[0] = makeChoice("Ted Bundy", 0);
            choices3[1] = makeChoice("Buffulo Bill", 1);
            choices3[2] = makeChoice("Jeffery Dahmer", 2);

            var question3 = {};
            question3.question = "\"It puts the lotion on its skin\"";
            question3.choices = choices3;
            question3.answerIndex = 1;


            var choices4 = [];
            choices4[0] = makeChoice("Billy the Kid", 0);
            choices4[1] = makeChoice("wyatt Earp", 1);
            choices4[2] = makeChoice("Doc Holiday", 2);

            var question4 = {};
            question4.question = "\"I'll make ya famous\"";
            question4.choices = choices4;
            question4.answerIndex = 0;

            questions = [question, question2, question3, question4];

            for (var i = 0; i < questions.length; i++) {
                console.log(questions[i].question);
                var question = questions[i];
                $("#question_" + (i + 1)).text(question.question);
                for (var k = 0; k < question.choices.length; k++) {
                    var answer = question.choices[k].answer;
                    //question-1-choice-1-label-1
                    //question-4-choice-1-label-1
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

function resetScreen(){
    $("#startGame").show();
    $("#endGame").hide();
    $("#quiz").hide();
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
    //reset timer
    startTimer();
    //clear out radio button selection and enable
    $("input[type=radio]").attr('disabled', false);
    $("input[type=radio]").prop('checked',false);
    $("#submit").prop('disabled', false);
}

function processSubmit() {
    $("#endGame").show();
    $("#startGame").hide();
    $("#quiz").hide();

    //stop timer
    clearInterval(timer);
    //disable radios
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
            }
        }
    }
    //alert(correctAnswer);
}
function startTimer(){
    var start = new Date;
    secondsLeft = 0;
    var secondsLimit = 10;
    timer = setInterval(function () {
        var secondsLeft = secondsLimit - Math.round((new Date - start) / 1000);
        $('#clock').text(secondsLeft + " Seconds Left");
        if(secondsLeft <= 0){
            processSubmit();
        }
    }, 1000);
}