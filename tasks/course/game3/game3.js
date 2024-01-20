const game = document.querySelector(".game");
const ghost = document.querySelector(".ghost");

let score = document.createElement("div");
let navigate = document.createElement("div");
let exitBtn = document.createElement("button");
let nextBtn = document.createElement("button");
let jumpWrap = document.createElement("div");
let exapmle = document.createElement("div");
let user = document.createElement("div");

let time;
let res1 = localStorage.getItem("res1");
let res2 = localStorage.getItem("res2");
let result = 0;
let counter = 0;
let isGaming = 0;

let massExample = [];
let massUser = [];
let massBetween = [];
let downCounter = 0;

let sound = new Audio();
sound.src = "jump.mp3";

function startGame() {
  ghost.style.display = "block";
  let ostal = document.querySelector(".timer");
  let start = Date.now(); // запомнить время начала
  let timer3 = setInterval(function () {
    let timePassed3 = Date.now() - start;
    //   console.log("time passed " + timePassed);
    if (timePassed3 >= 90000) {
      clearInterval(timer3);
      localStorage.setItem("res3", result);
      window.location.href = "../score/score.html";
      return;
    }
    if (timePassed3 >= 80000) {
      ostal.style.display = "block";
      ostal.innerHTML =
        "Осталось " + Math.floor((90000 - timePassed3) / 1000) + " сек";
    }
  }, 1000);
  document.querySelector("#start").classList.add("hidden");
  document.querySelector(".info").classList.add("hidden");
  //

  //
  score.innerHTML = "Ваши баллы: " + (+res1 + +res2 + +result);
  score.classList.add("score");
  game.append(score);
  jumpWrap.append(exapmle);
  jumpWrap.append(user);
  game.append(jumpWrap);
  //
  jumpWrap.classList.add("wrap");
  exapmle.classList.add("example");
  user.classList.add("user");
  //
  navigate.classList.add("navigate");
  exitBtn.innerHTML = "Выйти";
  nextBtn.innerHTML = "Пропуск";
  navigate.append(exitBtn);
  navigate.append(nextBtn);
  game.append(navigate);

  let x = Math.floor(Math.random() * 9) + 2;
  console.log(x);
  createLevel();
}

function jumpOn(element, nclass) {
  element.classList.add("jump");
  element.classList.add(nclass);
  //console.log("on");
  sound.play();
}

function jumpOff(element, nclass) {
  element.classList.remove("jump");
  element.classList.remove(nclass);
  //console.log("of");
  sound.pause();
  sound.currentTime = 0;
}

function jumpExample() {
  let delay = 0;
  let dur = 500;
  console.log("jexample");
  let x = 0;
  let y = dur;
  for (let i = 0; i < 3; i++) {
    x = x + delay + massExample[i] * 1000;
    y = y + delay + massExample[i] * 1000;
    let TJ = setTimeout(jumpOn, x, exapmle, "ej");
    setTimeout(jumpOff, y, exapmle, "ej");
    // console.log("x " + x + " " + y);
  }
  //   setTimeout(jumpOn, 3000, exapmle);
  //   setTimeout(jumpOff, 6000, exapmle);
}

function createLevel() {
  downCounter = 0;
  if (counter == 3) {
    localStorage.setItem("end", 1);
    localStorage.setItem("res3", result);
    setTimeout(() => {
      window.location.href = "../score/score.html";
    }, 500);
  }
  score.innerHTML = "Ваши баллы: " + (+res1 + +res2 + +result);

  massExample[0] = 1;
  for (let i = 1; i < 3; i++) {
    massExample[i] = Math.random() * 4.5 + 0.5;
  }

  massBetween[0] = 100000;
  massBetween[1] = 100000;
  //   console.log(massExample);
  //   console.log(massBetween);

  jumpExample();
  counter++;
}

function exitLevel() {
  result = 0;
  window.location.href = "../start.html";
}

function skipLevel() {
  console.log("SKIP");
  result -= 1;
  setTimeout(createLevel, 3000);
}

nextBtn.addEventListener("click", skipLevel);
exitBtn.addEventListener("click", exitLevel);

function endLevel() {
  massBetween[0] = massUser[1] - massUser[0];
  massBetween[1] = massUser[2] - massUser[1];
  console.log("end");
  console.log(massBetween);
  let pogr =
    Math.abs(massExample[1] * 1000 - massBetween[0]) +
    Math.abs(massExample[2] * 1000 - massBetween[1]);
  console.log("pogr " + pogr);
  console.log(Math.abs(massExample[1] * 1000 - massBetween[0]));
  console.log(Math.abs(massExample[2] * 1000 - massBetween[1]));

  if (pogr < 1000) {
    result += 10;
    ghost.classList.add("super");
    setTimeout(() => {
      ghost.classList.remove("super");
    }, 3000);
  } else if (pogr < 3000) {
    result += 5;
    ghost.classList.add("green");
    setTimeout(() => {
      ghost.classList.remove("green");
    }, 3000);
  } else if (pogr < 5000) {
    result += 2;
    ghost.classList.add("yellow");
    setTimeout(() => {
      ghost.classList.remove("yellow");
    }, 3000);
  } else {
    ghost.classList.add("red");
    setTimeout(() => {
      ghost.classList.remove("red");
    }, 3000);
  }

  setTimeout(createLevel, 3000);
}

document.addEventListener("keydown", function (event) {
  if (event.code == "Space" && downCounter < 3) {
    console.log("space" + counter);
    massUser[downCounter] = Date.now();
    console.log("mass user index" + +downCounter);
    jumpOn(user, "uj");
    setTimeout(jumpOff, 500, user, "uj");
    downCounter++;
    if (downCounter == 3) {
      downCounter = 0;
      endLevel();
    }
  }
  console.log(massUser);
});
