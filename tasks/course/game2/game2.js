const game = document.querySelector(".game");

let score = document.createElement("div");
let mouse = document.createElement("div");
let cheese1 = document.createElement("div");
let cheese2 = document.createElement("div");
let mouseLine = document.createElement("div");
let enterLine = document.createElement("div");
let navigate = document.createElement("div");
let exitBtn = document.createElement("button");
let nextBtn = document.createElement("button");
let answer1 = document.createElement("button");
let answer2 = document.createElement("button");
let info = document.createElement("div");

let time;
let res1 = localStorage.getItem("res1");
let result = 0;
let counter = 0;
let chT1 = 0;
let chT2 = 0;
let ANSW = 1;

function startGame() {
  let ostal = document.querySelector(".timer");
  let start = Date.now(); // запомнить время начала
  let timer2 = setInterval(function () {
    let timePassed2 = Date.now() - start;
    //   console.log("time passed " + timePassed);
    if (timePassed2 >= 60000) {
      clearInterval(timer2);
      localStorage.setItem("l3", 1);
      localStorage.setItem("res2", result);
      window.location.href = "../game3/game3.html";
      return;
    }
    if (timePassed2 >= 50000) {
      ostal.style.display = "block";
      ostal.innerHTML =
        "Осталось " + Math.floor((60000 - timePassed2) / 1000) + " сек";
    }
  }, 1000);

  document.querySelector("#start").classList.add("hidden");
  document.querySelector(".info").classList.add("hidden");
  //

  //
  score.innerHTML = "Ваши баллы: " + (+res1 + +result);
  score.classList.add("score");
  game.append(score);
  //
  mouse.classList.add("mouse");
  cheese2.classList.add("cheese2");
  mouseLine.classList.add("mouse-line");
  //
  cheese1.classList.add("cheese1");

  mouseLine.append(mouse);
  mouseLine.append(cheese1);
  mouseLine.append(cheese2);
  //
  game.append(mouseLine);
  //
  enterLine.classList.add("enterLine");
  //
  info.innerHTML = "До какого сыра мышь добралась через n сек:";
  answer1.innerHTML = "1";
  answer2.innerHTML = "2";
  enterLine.append(info);
  enterLine.append(answer1);
  enterLine.append(answer2);

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

let isDrow = 0;

function mouseRun(time) {
  mouse.classList.add("mouse-run");
  let x = (0.02 * 500) / time;
  let pos = 0;
  mouse.style.left = pos + "px";
  console.log("t " + time);
  console.log("x " + x);
  let zaderz = 500;
  if (!isDrow) {
    isDrow = 1;
    answer1.classList.add("blocked");
    answer2.classList.add("blocked");
    nextBtn.classList.add("blocked");
    let start = Date.now(); // запомнить время начала
    let timer = setInterval(function () {
      // сколько времени прошло с начала анимации?
      let timePassed = Date.now() - start;
      //   console.log("time passed " + timePassed);
      if (timePassed >= time * 1000 + zaderz) {
        mouse.classList.remove("mouse-run");
        // mouse.classList.add("mouse-sit");
        cheese1.classList.add("hidden");
        cheese2.classList.add("hidden");
        answer1.classList.remove("blocked");
        answer2.classList.remove("blocked");
        nextBtn.classList.remove("blocked");
        isDrow = 0;
        clearInterval(timer); // закончить анимацию через 2 секунды
        return;
      }
      if (timePassed <= zaderz) {
        mouse.classList.add("mouse-wait");
        // cheese1.classList.add("hidden");
        // cheese2.classList.add("hidden");
      }
      // отрисовать анимацию на момент timePassed, прошедший с начала анимации
      if (timePassed >= zaderz) {
        mouse.classList.remove("mouse-wait");
        // cheese1.classList.remove("hidden");
        // cheese2.classList.remove("hidden");
        draw(timePassed, x);
      }
    }, 20);

    // в то время как timePassed идёт от 0 до 2000
    // left изменяет значение от 0px до 400px
    function draw(timePassed, x) {
      pos = +pos + x;
      mouse.style.left = pos + "px";
      //   console.log("left " + mouse.style.left);
    }
  }
}

function createLevel() {
  if (counter == 3) {
    localStorage.setItem("l3", 1);
    localStorage.setItem("res2", result);
    setTimeout(() => {
      window.location.href = "../game3/game3.html";
    }, 500);
  }
  score.innerHTML = "Ваши баллы: " + (+res1 + +result);
  //   mouse.classList.remove("mouse-sit");
  cheese1.classList.remove("hidden");
  cheese2.classList.remove("hidden");
  time = Math.floor(Math.random() * 8) + 2;
  chT1 = Math.floor(time / 2);
  chT2 = Math.floor((time * 4) / 5);
  console.log("time " + time + " t1 " + chT1 + " " + chT2);
  setTimeout(mouseRun(time), 4000);
  ANSW = Math.round(Math.random());
  console.log("ANSW " + ANSW);
  if (ANSW == 0) {
    info.innerHTML = "До какого сыра мышь добралась через " + chT1 + " сек:";
  } else {
    info.innerHTML = "До какого сыра мышь добралась через " + chT2 + " сек:";
  }

  counter++;
}

function exitLevel() {
  result = 0;
  window.location.href = "../start.html";
}

function skipLevel() {
  if (!isDrow) {
    result -= 1;
    createLevel();
  }
}

nextBtn.addEventListener("click", skipLevel);
exitBtn.addEventListener("click", exitLevel);
answer1.addEventListener("click", () => {
  if (!isDrow) {
    console.log("a1");
    if (ANSW == 0) {
      result = result + 3;
      answer1.classList.add("green");
      setTimeout(() => answer1.classList.remove("green"), 2000);
    } else {
      answer1.classList.add("red");
      setTimeout(() => answer1.classList.remove("red"), 2000);
    }
    setTimeout(createLevel, 2000);
  }
});

answer2.addEventListener("click", () => {
  if (!isDrow) {
    console.log("a2");
    if (ANSW == 1) {
      result = result + 3;
      answer2.classList.add("green");
      setTimeout(() => answer2.classList.remove("green"), 2000);
    } else {
      answer2.classList.add("red");
      setTimeout(() => answer2.classList.remove("red"), 2000);
    }
    setTimeout(createLevel, 2000);
  }
});
