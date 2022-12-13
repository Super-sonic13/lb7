const work = document.querySelector(".work");
const play = document.getElementById("play");
let clicked = false;
let i = 1;
let interval;
const notification = document.querySelector(".info");

if (!localStorage.getItem("info")) {
  localStorage.setItem("info", "[]");
} else {
  JSON.parse(localStorage.getItem("info")).forEach((el) => {
    notification.insertAdjacentHTML(
      "beforeend",
      `<p>Action: ${el.action}</p>
<p>Time: ${el.time}</p>`
    );
  });
}

play.addEventListener("click", function playFn() {
  const info = JSON.parse(localStorage.getItem("info"));
  const action = { action: "Clicked play", time: new Date() };
  info.push(action);
  localStorage.setItem("info", JSON.stringify(info));
  notification.insertAdjacentHTML(
    "beforeend",
    `<p>Action: ${action.action}</p>
<p>Time: ${action.time}</p>`
  );

  work.style.display = "block";

  const top = document.getElementById("top");
  const right = document.getElementById("right");
  const bottom = document.getElementById("bottom");
  const left = document.getElementById("left");

  const anim = document.querySelector(".anim");

  const box = document.querySelector(".box");

  box.style.top = anim.offsetHeight / 2 - 10 + "px";
  box.style.left = anim.offsetWidth / 2 - 10 + "px";
  // box.style.right = anim.offsetWidth / 2 - 10 + "px";
  // box.style.bottom = anim.offsetWidth / 2 - 10 + "px";

  // top.addEventListener("click", () => {
  //   box.style.top = parseInt(box.style.top) + 1 + "px";
  // });

  // right.addEventListener("click", () => {
  //   box.style.right = parseInt(box.style.right) + 1 + "px";
  // });

  // bottom.addEventListener("click", () => {
  //   box.style.bottom = parseInt(box.style.bottom) - 1 + "px";
  // });

  // left.addEventListener("click", () => {
  //   box.style.left = parseInt(box.style.left) - 1 + "px";
  // });

  const start = document.getElementById("start");
  const close = document.getElementById("close");

  function startFn(e) {
    if (e.currentTarget.textContent === "Start") {
      const info = JSON.parse(localStorage.getItem("info"));
      const action = { action: "Clicked start", time: new Date() };
      info.push(action);
      localStorage.setItem("info", JSON.stringify(info));

      notification.insertAdjacentHTML(
        "beforeend",
        `<p>Action: ${action.action}</p>
<p>Time: ${action.time}</p>`
      );

      e.currentTarget.textContent = "Stop";
      move(box, anim, e);
    } else {
      const info = JSON.parse(localStorage.getItem("info"));
      const action = { action: "Clicked stop", time: new Date() };
      info.push(action);
      localStorage.setItem("info", JSON.stringify(info));

      notification.insertAdjacentHTML(
        "beforeend",
        `<p>Action: ${action.action}</p>
<p>Time: ${action.time}</p>`
      );

      e.currentTarget.textContent = "Start";
      start.removeEventListener("click", startFn);
      start.addEventListener("click", startFn);
      clearInterval(interval);
    }
  }

  start.addEventListener("click", startFn);

  close.addEventListener("click", () => {
    const info = JSON.parse(localStorage.getItem("info"));
    const action = { action: "Clicked close", time: new Date() };
    info.push(action);
    localStorage.setItem("info", JSON.stringify(info));
    notification.insertAdjacentHTML(
      "beforeend",
      `<p>Action: ${action.action}</p>
<p>Time: ${action.time}</p>`
    );

    work.style.display = "none";
    clearInterval(interval);
    box.style.top = anim.offsetHeight / 2 - 10 + "px";
    box.style.left = anim.offsetWidth / 2 - 10 + "px";
    i = 0;
    start.textContent = "Start";
    start.removeEventListener("click", startFn);
  });

  function move(box, anim, e) {
    interval = setInterval(() => {
      if (
        parseInt(box.style.left) - 10 >= anim.offsetWidth ||
        parseInt(box.style.top) - 10 >= anim.offsetHeight
      ) {
        // setTimeout(() => {
        const info = JSON.parse(localStorage.getItem("info"));
        const action = {
          action: "the square is outside the area",
          time: new Date(),
        };
        info.push(action);
        localStorage.setItem("info", JSON.stringify(info));
        notification.insertAdjacentHTML(
          "beforeend",
          `<p>Action: ${action.action}</p>
<p>Time: ${action.time}</p>`
        );

        clearInterval(interval);
        box.style.top = anim.offsetHeight / 2 - 10 + "px";
        box.style.left = anim.offsetWidth / 2 - 10 + "px";
        i = 0;
        start.textContent = "Start";
        // }, 3000);
      } else {
        console.log(anim.offsetHeight, anim.offsetWidth);
        console.log(box.style.top, box.style.left);
        box.style.left = parseInt(box.style.left) + i + "px";
        box.style.top = parseInt(box.style.top) + i + "px";
      }
      i += 1;
    }, 350);
  }
});
