
//This stores the user's answers.
let userAnswers = [];
const currentURL = window.location.origin;
let userScore;
//this is used for summing the user's answers array.
function getSum(total, num) {
    return total + num;
};

//Array of questions in the survey.
const questions = [
    "I cry very frequently.",
    "I brush my teeth at least twice a day.",
    "I get very angry when someone eats something from the fridge that I've clearly labelled as my own.",
    "I hate children.",
    "I am morbidly obese, but I wear it well.",
    "My favorite holiday is Arbor Day.",
    "I like to spend money on frivolous things like food and health insurance.",
    "Clipping my toenails has been one of my life's greatest adventures.",
    "McDonald's is the nicest restaurant in the town where I grew up.",
    "I can count to 40 with my eyes closed."
];

//function that puts the questions into the HTML.
function popQuestions() {
    for (let i = 0; i < questions.length; i++) {
        let newQuestion = $("<div>")
            .addClass('question-box')
        let sliderBox = $("<div>")
            .addClass('slider-box');
        let slider =
            $("<input>").attr('type', "range")
                .attr('id', `question${i}`)
                .attr('min', 0)
                .attr('max', 10)
                .attr('name', `question${i}`)
                .addClass('slider')
                .attr('value', 5)
                .attr('display', 'inline');
        $("<p>").text(questions[i]).addClass('question')
            .appendTo(newQuestion);
        $("<span>").text("Strongly Disagree")
            .addClass('agree disagree')
            .attr('id', `disagree${i}`)
            .appendTo(sliderBox);
        slider.appendTo(sliderBox);
        $("<span>").html(`Strongly Agree`)
            .addClass('agree')
            .attr('id', `agree${i}`)
            .attr('align-self', 'end')
            .appendTo(sliderBox);
        sliderBox.appendTo(newQuestion);
        $("<p>").html("<hr>").appendTo(newQuestion);
        newQuestion.appendTo("#questions");
    }
};


//this function makes the boxes light up when the slider is moved
function lightBoxes() {
    for (let i = 0; i < questions.length; i++) {
        $(`#question${i}`).on('input', () => {
            let x = $(`#question${i}`).val();
            $(`#agree${i}`).css('background-color', `rgba(30, 102, 30, ${0.1 + x / 9})`)
            $(`#disagree${i}`).css('background-color', `rgba(175, 49, 49, ${1 - x / 9})`)
        })
    }
};

//This records the user's answers in an array.
function recordAnswers() {
    userAnswers = [];
    for (let i = 0; i < questions.length; i++) {
        let ans = parseInt($(`#question${i}`).val());
        userAnswers.push(ans);
    };
};

//this function compares friendscores from the user and the friends stored in the friends.js file.
//many thanks to Manfred Mann* for making this code both shorter and longer.
//*Though it was first recorded by The Exciters, the version of the former is the more renowned, and thus the one used for abstraction of this code).
function friendMatch(frans) {
    tempArray = [];
    let match;
    frans.forEach(f => {
        const imHers = f.iso == me.gender;
        const shesMine = f.gender == me.iso;
        if ((me.iso == "no preference" && imHers) || ((imHers || f.iso == "no preference") && shesMine)) {
            f.compatible = true;
            f.diff = Math.abs(userScore - f.friendScore);
            tempArray.push(f.diff);
        } else {
            f.compatible = false;
        };
    });

    let matchNum = Math.min.apply(null, tempArray);
    let matches = [];
    frans.forEach(f => {
        if (f.compatible == true) {
            if (f.diff == matchNum) {
                matches.push(f);
            };
        } else console.log("barking up the wrong tree");

    });
    if (matches[0]) {
        makeModal(matches[0]);
    } else {
        sorryModal();
    }

};

//Ajax method for getting the friend object array from /api/friends. Why doesn't $.get() or jQuery.get() work!??
function getFriends() {
    $.ajax({ url: currentURL + "/api/friends", method: "GET" })
        .then(function (data) {
            let friends = data;
            friendMatch(friends);
        });
};

let me = {};

// POST sends the user's me object to the server. What will it do with all that information!? Nothing. This app hasn't gotten that far.
function postMe() {
    $.post("/api/friends", me, res => {
        console.log(res);
    });
};
//makes me as an object with all of the user's inputs
function makeMe() {
    me = {
        firstName: $("#first-name").val().trim(),
        lastName: $("#last-name").val().trim(),
        gender: $('input[name=gender]:checked').val(),
        iso: $('input[name=iso]:checked').val(),
        friendScore: userAnswers,
        photo: $("#photo").val(),
    };
};


function makeModal(f) {
    $(".modal-pic").attr("src", `/images/${(f.firstName).toLowerCase()}.png`)
    $(".match-name").text(f.firstName);
    $(".match-last-name").text(f.lastName);

    $("#match").show();

    $("#yes").on('click', () => {
        $("#married").show();
    });

    $("#no").on('click', () => {
        $(".modal-pic").attr("src", `/images/alone.png`);
        $("#alone").show();
    })

}
function sorryModal() {
    $(".modal-pic").attr("src", `/images/fish.png`);
    $("#no-match").show();
};

$(".close").on('click', () => {
    $(".modal").hide();
})

//Now we set stuff in motion by calling these functions.
popQuestions();
lightBoxes();
let complete = false;
function checkAnswers() {
    if ($('input[name=iso]:checked').val() && $('input[name=gender]:checked').val() && $('#last-name').val() && $('#first-name').val()) {
        complete = true;
    } else {
        complete = false;
    }
};

$("#final").on('click', function () {


    checkAnswers();
    if (complete == true) {
        recordAnswers();
        userScore = userAnswers.reduce(getSum);
        //stores user's objects 
        makeMe();
        //does the friend finding
        getFriends();
        //posts user object to friends array
        postMe();
    } else {
        $("<p>").prependTo("#body-survey")
            .text('You forgot to fill some things out...')
            .css('width', '100%')
            .css('height', '5%')
            .css('text-align', 'center')
            .css('font-size', '3vw')
            .css('background-color', 'white')
            .css('color', 'red')
            .css('font-family', 'londrina solid')
            .attr('id', 'forgot');
        document.querySelector('#forgot').scrollIntoView({
            behavior: 'smooth'
        });
    }

});
