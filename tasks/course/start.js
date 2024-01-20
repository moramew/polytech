const startBtn = document.querySelector("#start");
const inputName = document.querySelector("#name");
startBtn.addEventListener("click", start);
let notFirst = localStorage.getItem("notFirst");
let nickname = localStorage.getItem("nickname");
let l2 = localStorage.getItem("l2");
let l3 = localStorage.getItem("l3");
console.log(localStorage.getItem("notFirst"));
console.log(localStorage.getItem("nickname"));

if (nickname == "admin") {
  l2 = 1;
  l3 = 1;
  start();
}

if (notFirst) {
  document.querySelector(".hello").classList.add("hidden");
  document.querySelector(".hi").innerHTML += " " + nickname + "!";
}

if (l2) {
  document.querySelector("#level2").classList.add("notlocked");
  document.querySelector("#level2").classList.remove("locked");
}

if (l3) {
  document.querySelector("#level3").classList.add("notlocked");
  document.querySelector("#level3").classList.remove("locked");
}

function start() {
  console.log("start");
  if (inputName.value != "") {
    document.querySelector(".hello").classList.add("hidden");
    nickname = inputName.value;
    document.querySelector(".hi").innerHTML += " " + nickname + "!";
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("notFirst", 1);
  }
  if (nickname == "admin") {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("notFirst", 1);
    localStorage.setItem("l2", 1);
    localStorage.setItem("l3", 1);
    l2 = 1;
    l3 = 1;
  }
}

function toLevel2() {
  if (l2 == 1) {
    window.location.href = "game2/game2.html";
  }
}

function toLevel3() {
  if (l3 == 1) {
    window.location.href = "game3/game3.html";
  }
}

function toScore() {
  window.location.href = "score/score.html";
}

function exit() {
  localStorage.clear();
  window.location.reload();
}
