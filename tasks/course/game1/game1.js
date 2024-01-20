console.log(localStorage.getItem("nickname"));
const game = document.querySelector(".game");

let score = document.createElement("div");
let lamp = document.createElement("div");
let enterLine = document.createElement("div");
let input = document.createElement("input");
let enterBtn = document.createElement("button");
let navigate = document.createElement("div");
let exitBtn = document.createElement("button");
let nextBtn = document.createElement("button");

let time;
let result = 0;
let counter = 0;

function startGame() {
  let ostal = document.querySelector(".timer");
  let start = Date.now(); // запомнить время начала
  let timer = setInterval(function () {
    let timePassed = Date.now() - start;
    //   console.log("time passed " + timePassed);
    if (timePassed >= 60000) {
      clearInterval(timer);
      localStorage.setItem("l2", 1);
      localStorage.setItem("res1", result);
      window.location.href = "../game2/game2.html";
      return;
    }
    if (timePassed >= 50000) {
      ostal.style.display = "block";
      ostal.innerHTML =
        "Осталось " + Math.floor((60000 - timePassed) / 1000) + " сек";
    }
  }, 1000);
  document.querySelector("#start").classList.add("hidden");
  document.querySelector(".info").classList.add("hidden");
  //
  score.innerHTML = "Ваши баллы: " + result;
  score.classList.add("score");
  game.append(score);
  //
  lamp.classList.add("lamp");
  game.append(lamp);
  //
  enterLine.classList.add("enterLine");
  //
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "сек");
  input.classList.add("input");
  enterLine.append(input);
  //
  console.log(enterBtn);
  enterBtn.classList.add("enter");
  enterBtn.innerHTML = "Ввод";
  enterLine.append(enterBtn);
  //
  game.append(enterLine);

  navigate.classList.add("navigate");
  exitBtn.innerHTML = "Выйти";
  nextBtn.innerHTML = "Пропуск";
  navigate.append(exitBtn);
  navigate.append(nextBtn);
  game.append(navigate);

  let x = Math.floor(Math.random() * 10) + 1;
  console.log(x);
  createLevel();
}

function lightOn() {
  lamp.classList.add("lamp-on");
  console.log("on");
}

function lightOff() {
  lamp.classList.remove("lamp-on");
  console.log("off");
}

function createLevel() {
  score.innerHTML = "Ваши баллы: " + result;
  if (counter == 3) {
    localStorage.setItem("l2", 1);
    localStorage.setItem("res1", result);
    window.location.href = "../game2/game2.html";
  }
  time = Math.floor(Math.random() * 10) + 1;
  console.log("time " + time);
  setTimeout(lightOn, 1000);
  setTimeout(lightOff, 1500);
  setTimeout(lightOn, 1500 + time * 1000);
  setTimeout(lightOff, 2000 + time * 1000);
  counter++;
}

function enterSec() {
  if (input.value != "") {
    let enTime = input.value;
    input.value = "";
    if (time == enTime) {
      result += 2;
      document.querySelector(".perfect").classList.add("anim");
      setTimeout(
        () => document.querySelector(".perfect").classList.remove("anim"),
        2000
      );
    } else if (Math.abs(time - enTime) == 1) {
      result += 1;
      document.querySelector(".good").classList.add("anim");
      setTimeout(
        () => document.querySelector(".good").classList.remove("anim"),
        2000
      );
    } else {
      document.querySelector(".bad").classList.add("anim");
      setTimeout(
        () => document.querySelector(".bad").classList.remove("anim"),
        2000
      );
    }
    score.innerHTML = "Ваши баллы: " + result;
    setTimeout(createLevel, 3000);
  }
}

function exitLevel() {
  result = 0;
  window.location.href = "../start.html";
}

function skipLevel() {
  result -= 1;
  createLevel();
}

enterBtn.addEventListener("click", enterSec);
nextBtn.addEventListener("click", skipLevel);
exitBtn.addEventListener("click", exitLevel);
