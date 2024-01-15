const createBtn = document.querySelector("#create");
const colorBtn = document.querySelector("#color");
const divRand = document.querySelector("#rand");

let Phrase = [
  ["Consuetudo est altera natura", "Привычка вторая натура"],
  ["Nota bene", "Заметьте хорошо!"],
  ["Nulla calamitas sola", "Беда не приходит одна"],
  ["Per aspera ad astra", "Через тернии к звёздам"],
  ["A realibus ad realiora", "От реального к реальнейшему"],
  ["Eventus docet", "Событие учит"],
  ["Hodie mihi, cras tibi", "Сегодня мне, завтра тебе"],
];

let counter = 0;
let list = [];
for (let i = 0; i < Phrase.length; i++) {
  list[i] = i;
}

for (let i = list.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [list[i], list[j]] = [list[j], list[i]];
}
console.log(list);

function createFun() {
  if (counter == Phrase.length) {
    alert("Фразы закончились!");
  } else {
    let newPhrase = document.createElement("p");
    newPhrase.setAttribute("id", "n" + counter);

    let id = document.createElement("span");
    id.setAttribute("style", "text-decoration: underline");
    let latin = document.createElement("span");
    latin.setAttribute("style", " font-style: italic");
    let russian = document.createElement("span");

    id.textContent = "id=" + counter;
    latin.textContent = Phrase[list[counter]][0];
    russian.textContent = Phrase[list[counter]][1];

    if (counter % 2 == 0) {
      newPhrase.classList.add("class1");
    } else {
      newPhrase.classList.add("class2");
    }
    newPhrase.append(id);
    newPhrase.append(latin);
    newPhrase.append(russian);
    divRand.append(newPhrase);
    counter++;
    console.log("create");
  }
}

let isBold = 0;

function boldFun() {
  for (let i = 0; i < counter; i++) {
    console.log("is bold? = " + isBold);
    if (i % 2 == 0) {
      if (isBold) {
        document.querySelector("#n" + i).classList.remove("bold");
      } else {
        document.querySelector("#n" + i).classList.add("bold");
      }
    }
  }
  isBold ? (isBold = 0) : (isBold = 1);
}

createBtn.addEventListener("click", createFun);
color.addEventListener("click", boldFun);
