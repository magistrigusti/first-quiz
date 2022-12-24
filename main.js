const questions = [
	{
		question: "What language works in the browser?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "What does it mean CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "What does it mean HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "What year was it created JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	let answerNumber = 1;

	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate = `
			<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>
		`;

		const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);
		listContainer.innerHTML +=answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p> 
	`;

	let title, message;

	if (score === questions.length) {
		title = "Congratulations";
		message = "You answered all the questions correctly";
	} else if ((score * 100) / questions.length >= 50) {
		title = "Not a bad result";
		message = "You gave more than half of the correct answers";
	} else {
		title = "Wort the effort";
		message = "You have less than half of the correct answers";
	}

	let result = `${score} from ${questions.length}`;
	
	const finalMessage = resultsTemplate
												.replace('%title%', title)
												.replace('%message%', message)
												.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;
	submitBtn.blur();
	submitBtn.innerHTML = 'start over';
	submitBtn.onclick = () => history.go();
}