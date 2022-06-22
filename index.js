let Questions;
let containerDiv = document.querySelector(".container");
let answerList = [];
let correct = true;
let orders = [".a", "b", ".c", ".d"];

//Fetching Questions from a 3rd party API
let getQuestions = async () => {
  let apiCall = await fetch(
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy"
  );  
  let res = await apiCall.json();
  console.log(res.results);
  return res.results;
};

//Loading Questions as per the data fetched
let loadQuestions = (Questions, i) => {
  let questionBox = document.createElement("div");
  let ques = document.createElement("h2");
  let optionDiv = document.createElement("div");
  ques.textContent = Questions[i]["question"];
  questionBox.appendChild(ques);
  questionBox.classList.add("questions");

  //Rendering the data
  for (let j = 0; j < 3; j++) {
    let option = document.createElement("div");
    option.innerHTML = Questions[i]["incorrect_answers"][j];
    option.classList.add("option");
    optionDiv.appendChild(option);
  }
  let correctOption = document.createElement("div");
  correctOption.innerHTML = Questions[i]["correct_answer"];
  correctOption.classList.add("option");
  correctOption.classList.add("correct");
  optionDiv.appendChild(correctOption);
  optionDiv.classList.add("options");
  questionBox.appendChild(optionDiv);
  containerDiv.appendChild(questionBox);

  //Shuffling the options
  let options = document.querySelectorAll(".option");
  let op = 0;
  let random;
  let completed = [];
  while (op < options.length) {
    random = Math.floor(Math.random() * options.length);
    console.log(random)
    if (options[op] != "shuffled") {
      if (!completed.includes(orders[random])) {
        options[op].classList.add(orders[random]);
        completed.push(orders[random]);
        options[op] = "shuffled";
        op++;
      }
    }
  }
};

//Adding Event-Listeners to options
let addEventListeners = (Questions, i) => {
  let correctOption = document.querySelector(".correct");
  let option = document.querySelectorAll(".option");
  let getQuestion = document.querySelector(".questions");
  console.log(i);

  //Winning condition
  if (i >= Questions.length - 1) {
    let youWon = document.createElement("h1");
    youWon.textContent = "You WON!";
    getQuestion.remove();
    youWon.classList.add("lost");
    containerDiv.appendChild(youWon);
    return;
  }

  for (let j = 0; j < option.length; j++) {
    option[j].addEventListener("click", () => {
      //Losing condition
      if (option[j].textContent != correctOption.textContent) {
        getQuestion.remove();
        let youLost = document.createElement("h1");
        youLost.textContent = "YOU LOST !";
        containerDiv.appendChild(youLost);
        youLost.classList.add("lost");
        console.log("galat");
      } else {
        //If correct render the next question
        getQuestion.remove();
        loadQuestions(Questions, ++i);
        addEventListeners(Questions, i);
      }
    });
  }
};

//Main
let run = async () => {
  Questions = await getQuestions();
  let i = 0;
  loadQuestions(Questions, i);
  addEventListeners(Questions, i);
};

run();
