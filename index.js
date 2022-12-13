const work = document.querySelector(".work");
const play = document.getElementById("play");
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
      move();
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
      cancelAnimationFrame(anim);
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

  let anim;
  let pTimeStamp = 0;
  let i = 1;
  let wCenter = 490 / 2 - 10;
  let hCenter = 445 / 2 - 10;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  ctx.fillStyle = "blue";
  ctx.fillRect(wCenter, hCenter, 10, 10);

  function move() {
    anim = requestAnimationFrame(tick);
    function tick(timeStamp) {
      anim = requestAnimationFrame(tick);

      const diff = timeStamp - pTimeStamp;
      pTimeStamp = timeStamp;
      i += 1;

      if (wCenter + i - 10 >= 490 || hCenter + i - 10 >= 445) {
        cancelAnimationFrame(anim);
        ctx.clearRect(0, 0, 490, 445);
        ctx.fillStyle = "blue";
        ctx.fillRect(wCenter, hCenter, 10, 10);
        i = 0;
        start.textContent = "Start";
      }

      // ctx.clearRect(0, 0, 490, 445);
      // ctx.fillStyle = "blue";
      // ctx.fillRect(wCenter + i, hCenter + i, 10, 10);

      ctx.clearRect(0, 0, 490, 445);
      ctx.fillStyle = "blue";
      ctx.fillRect(wCenter + i, hCenter, 10, 10);

      ctx.clearRect(0, 0, 490, 445);
      ctx.fillStyle = "blue";
      ctx.fillRect(wCenter, hCenter - i, 10, 10);

      ctx.clearRect(0, 0, 490, 445);
      ctx.fillStyle = "blue";
      ctx.fillRect(wCenter - i, hCenter, 10, 10);

      ctx.clearRect(0, 0, 490, 445);
      ctx.fillStyle = "blue";
      ctx.fillRect(wCenter, hCenter + i, 10, 10);
      console.log(i);
    }
  }
});
