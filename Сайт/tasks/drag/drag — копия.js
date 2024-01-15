let isDragging = false;

document.addEventListener("mousedown", function (event) {
  let dragElement = event.target.closest(".draggable");
  event.preventDefault();
  if (!dragElement) return;

  dragElement.ondragstart = function () {
    return false;
  };

  let shiftX = event.clientX - dragElement.getBoundingClientRect().left;
  let shiftY = event.clientY - dragElement.getBoundingClientRect().top;
  dragElement.style.position = "absolute";
  dragElement.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    let element = document.querySelector(".field");
    console.log(element);
    let rectq = element.getBoundingClientRect();
    console.log(rectq.left);
    if (pageX - shiftX > rectq.left && pageX < rectq.right) {
      dragElement.style.left = pageX - shiftX + "px";
    }
    if (pageY > rectq.top + shiftY && pageY < rectq.bottom - shiftY) {
      dragElement.style.top = pageY - shiftY + "px";
    }
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  dragElement.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    dragElement.onmouseup = null;
  };
});
