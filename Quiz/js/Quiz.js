var questionArray = ["Alektorophobia is the fear of:", "Whales", "Bovines", "Chickens", "Instant Noodles", "Bathmophobia is the fear of:", "Railings", "Stairs", "Bathtubs", "Spreadsheets", "Hellenologophobia is the fear of:", "Complex scientific terms", "Women named Helen", "Edible Plants", "Carbohydrates", "Triskaidekaphobia is the fear of:", "Kaleidoscopes", "Psychotropic Plants", "Men named Tristan", "Number 13"];

var answers = [3,2,1,4];

var currentString = -1;
var currentQuestion = -1;
var score = 0;
var answerArray = document.getElementsByClassName('answer');
var buttonArray = document.getElementsByClassName('answerButton');
var quizArray = document.getElementsByClassName('quiz');
var resultsArray = document.getElementsByClassName('results');
var scoreArray = document.getElementsByClassName('score');

function uncheck() {
	for (i = 0; i < buttonArray.length; i++) {
		buttonArray[i].checked = false;
	}
}

function hideQuiz() {
	for (i = 0; i < quizArray.length; i++) {
		quizArray[i].style.display = "none";
	}
}

function displayResults() {
	totalQuestions();
	tabScore();
	hideQuiz();
	for (i = 0; i < resultsArray.length; i++) {
		resultsArray[i].style.display = "unset";
	}
}

function nextQuestion() {
	uncheck();
	currentString++;
	currentQuestion++;
	if (questionArray[currentString] == undefined) {
		displayResults();
	}
	else {
		document.getElementById('question').innerHTML = questionArray[currentString];
		document.getElementById('question').style.fontSize = "20px";
		for (i = 0; i < answerArray.length; i++) {
			currentString++;
			answerArray[i].innerHTML = questionArray[currentString];
		}
	}
}

function tabScore() {
	for (i = 0; i < scoreArray.length; i++) {
		scoreArray[i].innerHTML = score;
	}
}

function totalQuestions() {
	document.getElementById('totQuestions').innerHTML = currentQuestion;
}

function answered(answerNum) {
	if (answers[currentQuestion] == answerNum) {
		score++;
	}
	tabScore();
	nextQuestion();
}
