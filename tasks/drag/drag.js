let isDragging = false;
const cat = document.querySelector("#cat");
let checked = cat;
const dog = document.querySelector("#dog");
const octopus = document.querySelector("#octopus");
const fish = document.querySelector("#fish");
const colibri = document.querySelector("#colibri");
const eagle = document.querySelector("#eagle");
const bug = document.querySelector("#bug");
const butterfly = document.querySelector("#butterfly");
cat.style.transform = "rotate(180deg)";
dog.style.transform = "rotate(90deg)";
octopus.style.transform = "rotate(180deg)";
fish.style.transform = "rotate(90deg)";
colibri.style.transform = "rotate(30deg)";
eagle.style.transform = "rotate(360deg)";
bug.style.transform = "rotate(120deg)";
butterfly.style.transform = "rotate(60deg)";

document.addEventListener("mousedown", function (event) {
  let dragElement = event.target.closest(".draggable");
  event.preventDefault();
  if (!dragElement) {
    return;
  }

  dragElement.ondragstart = function () {
    return false;
  };

  let shiftX = event.clientX - dragElement.getBoundingClientRect().left;
  let shiftY = event.clientY - dragElement.getBoundingClientRect().top;
  dragElement.style.position = "absolute";
  dragElement.style.zIndex = 1000;
  let shiftRight = dragElement.getBoundingClientRect().right - event.clientX;
  let shiftBottom = dragElement.getBoundingClientRect().bottom - event.clientY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function startDrag(element, clientX, clientY) {
    if (isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseup", onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = "fixed";

    moveAt(clientX, clientY);
  }

  function finishDrag() {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top =
      parseInt(dragElement.style.top) + pageYOffset + "px";
    dragElement.style.position = "absolute";

    document.removeEventListener("mousemove", onMouseMove);
    dragElement.removeEventListener("mouseup", onMouseUp);
    check(dragElement);
    done(dragElement);
  }

  function moveAt(pageX, pageY) {
    let element = document.querySelector(".field");
    let rectq = element.getBoundingClientRect();

    if (pageX - shiftX > rectq.left && pageX < rectq.right - shiftRight) {
      dragElement.style.left = pageX - shiftX + "px";
    }
    if (pageY > rectq.top + shiftY && pageY < rectq.bottom - shiftBottom) {
      dragElement.style.top = pageY - shiftY + "px";
    }
  }

  dragElement.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    dragElement.onmouseup = null;
  };
});

function check(dragElement) {
  checked.classList.remove("border");
  checked = dragElement;
  checked.classList.add("border");
}

const rightBtn = document.querySelector(".turn-right");
const leftBtn = document.querySelector(".turn-left");
rightBtn.addEventListener("click", turnRight);
leftBtn.addEventListener("click", turnLeft);

function turnRight() {
  let c1, c2, c3;
  c1 = checked.style.transform[7];
  c2 = checked.style.transform[8];
  c3 = checked.style.transform[9];
  let nangle;

  //console.log(checked.style.transform + "c123: " + c1 + c2 + c3);
  if (!isNaN(c1) && !isNaN(c2) && !isNaN(c3)) {
    nangle = Number(c1) * 100 + Number(c2) * 10 + Number(c3);
  }

  if (!isNaN(c1) && !isNaN(c2) && isNaN(c3)) {
    nangle = Number(c1) * 10 + Number(c2);
  }

  if (!isNaN(c1) && isNaN(c2) && isNaN(c3)) {
    nangle = Number(c1);
  }

  if (isNaN(c1) && isNaN(c2) && isNaN(c3)) {
    nangle = 0;
  }
  console.log("nangle" + nangle);
  nangle = nangle + 30;
  if (nangle == 360) nangle = 0;
  checked.style.transform = "rotate(" + nangle + "deg)";
  console.log("res right " + checked.style.transform);
  done(checked);
}

function turnLeft() {
  let c1, c2, c3;
  c1 = checked.style.transform[7];
  c2 = checked.style.transform[8];
  c3 = checked.style.transform[9];
  let nangle;

  console.log(checked.style.transform + "c123: " + c1 + c2 + c3);
  if (!isNaN(c1) && !isNaN(c2) && !isNaN(c3)) {
    nangle = Number(c1) * 100 + Number(c2) * 10 + Number(c3);
  }

  if (!isNaN(c1) && !isNaN(c2) && isNaN(c3)) {
    nangle = Number(c1) * 10 + Number(c2);
  }

  if (!isNaN(c1) && isNaN(c2) && isNaN(c3)) {
    nangle = Number(c1);
    if (nangle == 0) nangle = 360;
  }

  if (isNaN(c1) && isNaN(c2) && isNaN(c3)) {
    nangle = 360;
  }
  console.log("nangle" + nangle);
  nangle = nangle - 30;
  if (nangle == 0) nangle = 360;
  checked.style.transform = "rotate(" + nangle + "deg)";
  console.log("res left" + checked.style.transform);
  done(checked);
}

function distance(el1, el2) {
  console.log("isdistance");
  let x1 =
    el1.getBoundingClientRect().right -
    (el1.getBoundingClientRect().right - el1.getBoundingClientRect().left) / 2;
  let x2 =
    el2.getBoundingClientRect().right -
    (el2.getBoundingClientRect().right - el2.getBoundingClientRect().left) / 2;
  let y1 =
    el1.getBoundingClientRect().bottom -
    (el1.getBoundingClientRect().bottom - el1.getBoundingClientRect().top) / 2;
  let y2 =
    el2.getBoundingClientRect().bottom -
    (el2.getBoundingClientRect().bottom - el2.getBoundingClientRect().top) / 2;
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  console.log("x1 " + x1 + " x2 " + x2);
}

function rotate(el1, el2) {
  console.log("isrotate");
  console.log(el1);
  console.log(el1.style.transform);
  console.log(el2.style.transform);
  if (
    (el1.style.transform === "rotate(0deg)" ||
      el1.style.transform === "rotate(360deg)") &&
    (el2.style.transform === "rotate(0deg)" ||
      el2.style.transform === "rotate(360deg)")
  ) {
    console.log("rotate done ");
    return true;
  }

  return false;
}

function done(currEl) {
  console.log(currEl);
  if (currEl == dog || currEl == cat) {
    if (distance(cat, dog) < 100 && rotate(cat, dog)) {
      cat.classList.add("anim");
      dog.classList.add("anim");
    } else {
      cat.classList.remove("anim");
      dog.classList.remove("anim");
    }
  }

  if (currEl == octopus || currEl == fish) {
    if (distance(octopus, fish) < 100 && rotate(octopus, fish)) {
      octopus.classList.add("anim");
      fish.classList.add("anim");
    } else {
      octopus.classList.remove("anim");
      fish.classList.remove("anim");
    }
  }

  if (currEl == bug || currEl == butterfly) {
    if (distance(bug, butterfly) < 100 && rotate(bug, butterfly)) {
      bug.classList.add("anim");
      butterfly.classList.add("anim");
    } else {
      bug.classList.remove("anim");
      butterfly.classList.remove("anim");
    }
  }

  if (currEl == colibri || currEl == eagle) {
    if (distance(colibri, eagle) < 100 && rotate(colibri, eagle)) {
      colibri.classList.add("anim");
      eagle.classList.add("anim");
    } else {
      colibri.classList.remove("anim");
      eagle.classList.remove("anim");
    }
  }
}
