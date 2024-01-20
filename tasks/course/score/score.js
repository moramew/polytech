const score = document.querySelector(".score");
let notFirst = localStorage.getItem("notFirst");
let nickname = localStorage.getItem("nickname");
let l2 = localStorage.getItem("l2");
let l3 = localStorage.getItem("l3");
let res1 = localStorage.getItem("res1");
let res2 = localStorage.getItem("res2");
let res3 = localStorage.getItem("res3");
let result = +res1 + +res2 + +res3;
console.log(localStorage.getItem("notFirst"));
console.log(localStorage.getItem("nickname"));

document.querySelector(".hi").innerHTML += " " + nickname + "!";
document.querySelector(".urscore").innerHTML += " " + result;

let people = [
  [nickname, result],
  ["Mary", 28],
  ["Ёжик", 30],
  ["anon", 3],
  ["2222", 23],
  ["я", 34],
  ["Настя", -2],
];
people.sort((a, b) => b[1] - a[1]);
let counter = 0;
for (let i = 0; i < people.length; i++) {
  let wrap = document.createElement("div");
  let user = document.createElement("div");
  let userScore = document.createElement("div");
  wrap.append(user);
  wrap.append(userScore);
  score.append(wrap);
  user.innerHTML = people[i][0];
  userScore.innerHTML = people[i][1];
  wrap.classList.add("wrap");
  if (people[i][0] == nickname) {
    user.classList.add("anim");
    userScore.classList.add("anim");
  }
  if (counter % 2 == 0) {
    wrap.classList.add("class1");
  } else {
    wrap.classList.add("class2");
  }
  counter++;
}
console.log(people);

function exit() {
  window.location.href = "../start.html";
}
