import{setCurrentPage} from './custumize_courses.js'
setCurrentPage()
import{progressTracker} from './UX.js'
import{setProgressHeight} from './UX.js'
import{currentPage} from './custumize_courses.js'
import{endMessage} from './data-server.js'
let currentPR = 0


export function mathsbefore_mathsSection(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["before_maths"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/before_maths.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["before_maths"][`before_maths_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["before_maths"][`before_maths_ar_${i}`][
            "description"
          ];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["before_maths"][`before_maths_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["popUp-start-des-3"]
          

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent =theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {
          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "count1",
  "Massary-before_mathsDone",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "before_maths section";
  body.appendChild(section);
}

export function mathscount1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["count1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/count1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["count1"][`count1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["count1"][`count1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["count1"][`count1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        // pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]
        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];

        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {
          let today = new Date();
          let day = today.getDate();
          let month = today.getMonth() + 1;
          let year = today.getFullYear();
          let date = `${day}/${month}/${year}`;
          endMessage(
            date,
            `${lesson.parentElement.classList[0]}`,
            "calc1",
            "Massary-count1Done",
            "Massary-maths-currentProg",
            theData
          );

          // date , course , nextCourse , storage , progStorage
          
        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "count1 section";
  body.appendChild(section);
}

export function mathscalc1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["calc1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/calc1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["calc1"][`calc1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["calc1"][`calc1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["calc1"][`calc1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "frac1",
  "Massary-calc1Done",
  "Massary-maths-currentProg",
  theData
);

// date , course , nextCourse , storage , progStorage


        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "calc1 section";
  body.appendChild(section);
}

export function mathsfrac1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["frac1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/frac1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["frac1"][`frac1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["frac1"][`frac1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["frac1"][`frac1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

         let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "calc2",
  "Massary-frac1Done",
  "Massary-maths-currentProg",
  theData
);

// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "frac1 section";
  body.appendChild(section);
}
export function mathscalc2Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["calc2"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/calc2.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["calc2"][`calc2_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["calc2"][`calc2_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["calc2"][`calc2_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "func1",
  "Massary-calc2Done",
  "Massary-maths-currentProg",
  theData
);

// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "calc2 section";
  body.appendChild(section);
}
export function mathsfunc1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["func1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/func1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["func1"][`func1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["func1"][`func1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["func1"][`func1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {
          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "limit1",
  "Massary-func1Done",
  "Massary-maths-currentProg",
  theData
);

// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "func1 section";
  body.appendChild(section);
}
export function mathslimit1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["limit1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/limit1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["limit1"][`limit1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["limit1"][`limit1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["limit1"][`limit1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "cont1",
  "Massary-limit1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage
        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "limit1 section";
  body.appendChild(section);
}
export function mathscont1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["cont1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/cont1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["cont1"][`cont1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["cont1"][`cont1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["cont1"][`cont1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {
   
          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "deriv1",
  "Massary-cont1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "cont1 section";
  body.appendChild(section);
}
export function mathsderiv1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["deriv1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/deriv1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["deriv1"][`deriv1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["deriv1"][`deriv1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["deriv1"][`deriv1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "integ1",
  "Massary-deriv1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "deriv1 section";
  body.appendChild(section);
}
export function mathsinteg1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["integ1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/integ1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["integ1"][`integ1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["integ1"][`integ1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["integ1"][`integ1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "trig1",
  "Massary-integ1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "integ1 section";
  body.appendChild(section);
}
export  function mathstrig1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["trig1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/trig1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["trig1"][`trig1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["trig1"][`trig1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["trig1"][`trig1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "explog1",
  "Massary-trig1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "trig1 section";
  body.appendChild(section);
}
export function mathsexplog1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["explog1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/explog1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["explog1"][`explog1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["explog1"][`explog1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["explog1"][`explog1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "os1",
  "Massary-explog1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "explog1 section";
  body.appendChild(section);
}
export function mathsos1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["os1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/os1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["os1"][`os1_ar_${i}`]["title"];
        des.textContent = theData["maths"]["os1"][`os1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["os1"][`os1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {
          
          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "mech1",
  "Massary-os1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "os1 section";
  body.appendChild(section);
}
export function mathsmech1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["mech1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/mech1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent = theData["maths"]["mech1"][`mech1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["mech1"][`mech1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["mech1"][`mech1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  "lagrang1",
  "Massary-mech1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage

        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "mech1 section";
  body.appendChild(section);
}
export function mathslagrang1Section(theData) {
  let body = document.querySelector(".maths .content");
  let objectNumbers = Object.keys(theData["maths"]["lagrang1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/lagrang1.webp";
  heading.className = "heading";
  heading.appendChild(head);
  section.appendChild(heading);
  for (let i = 0; i <= objectNumbers + 1; i++) {
    let lesson = document.createElement("div");
    let done = document.createElement("div");
    done.className = "done";
    done.classList.add("not-done");
    let doneBadge = document.createElement("span");
    doneBadge.textContent = "Done";
    done.appendChild(doneBadge);
    done.addEventListener("click", (e) => {
      e.stopPropagation();
      if (done.classList.contains("not-done")) {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        head.textContent = theData["texts"]["popUp-not-done-head"];
        des.textContent = theData["texts"]["popUp-not-done"]
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];

        img.src = "Images/explain1png.webp";
        document.getElementById("info").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        popUp.classList.add("info");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      } else {
        done.parentElement.classList.remove("active");
        done.parentElement.classList.add("done");
        localStorage.removeItem("Massary-maths-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-maths-startTime");
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let des2 = document.createElement("div");
        let des2Img = document.createElement("img");
        des2Img.src = "Images/coins.webp";
        let des2Span = document.createElement("span");
        des2Span.textContent = "+";
        let des3Span = document.createElement("span");
        des3Span.textContent = "0";
        let counter = function (e) {
          let score = 50;
          let interval = setInterval(() => {
            e.textContent = +e.textContent + 1;
            if (+e.textContent === score) {
              clearInterval(interval);
            }
          }, 30);
        };
        counter(des3Span);
        des2.appendChild(des2Span);
        des2.appendChild(des2Img);
        des2.appendChild(des3Span);
        let img = document.createElement("img");
        img.classList.add("img");
        close.classList.add("close");
        close.textContent = "Ok";
        des.className = "des";
        des2.className = "des";
        des2.classList.add("des2");
        let doneText = Array.from(theData["texts"]["doneText"]) ;
        localStorage.setItem("Massary-reward", "yes");
        head.textContent = theData["texts"]["popUp-done-head"];
        let randomNum = Math.floor(Math.random() * doneText.length);
        des.innerHTML = doneText[randomNum];
        let score = +localStorage.getItem("Massary-coins") + 50;
        console.log(score);
        localStorage.setItem("Massary-coins", score);
        popUp.classList.add("done");
        img.src = "Images/start.webp";
        document.getElementById("done").play();
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.classList.add("out");
          let bank = document.querySelector(".score");
          let { left, top, width, height } = bank.getBoundingClientRect();
          const targetX = left + width / 2;
          const targetY = top + height / 2;
          const startX = window.innerWidth / 2;
          const startY = window.innerHeight / 2;
          const dx = targetX - startX;
          const dy = targetY - startY;
          let coins = document.querySelector(".score span");
          let sound = document.getElementById("coin-spill");
          localStorage.removeItem("Massary-reward", "yes");
          sound.play();
          des2.animate(
            [
              { transform: "translate(-50%, -50%) scale(1)" },
              {
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + -35px + ${dy}px)) scale(0.3)`,
              },
            ],
            {
              duration: 500,
              easing: "ease-in",
              fill: "forwards",
            }
          );
          setTimeout(() => {
            des2.remove();
            let counter = function (e) {
              let interval = setInterval(() => {
                e.textContent = +e.textContent + 1;
                if (+e.textContent === score) {
                  clearInterval(interval);
                  sound.pause();
                }
              }, 30);
            };
            counter(coins);
            document.querySelector(".progress-bar").classList.remove("closed");
            progressTracker();
            setProgressHeight();
            // counter(document.querySelector(".progress-num"));
          }, 500);
          setTimeout(() => {
            popUp.remove();
            layer.remove();
          }, 600);
        });
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        popUp.appendChild(des2);
        document.body.appendChild(layer);
      }
    });
    lesson.addEventListener("click", () => {
      if (
        lesson.classList.contains("active") &&
        i !== 0 &&
        i !== +objectNumbers + 1
      ) {
        console.log(i);
        // console.log(theData["maths"]["html"][`html_ar_${i}`])
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let link = document.createElement("a");
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        link.className = "video-link";
        head.textContent =
          theData["maths"]["lagrang1"][`lagrang1_ar_${i}`]["title"];
        des.textContent =
          theData["maths"]["lagrang1"][`lagrang1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-maths-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-maths-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["maths"]["lagrang1"][`lagrang1_ar_${i}`]["url"]
        );
        des.className = "des";
        img.src = "Images/reading.webp";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        layer.className = "layer";

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(span);
        popUp.appendChild(des);
        popUp.appendChild(link);
        document.body.appendChild(layer);
      }
    });
    if (i === 0) {
      lesson.addEventListener("click", () => {
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        document.getElementById("info").play();
        head.classList.add("prHead");
        let img = document.createElement("img");
        let pr1 = document.createElement("div");
        let pr1Title = document.createElement("h4");
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML =theData["texts"]["before-maths"]

        popUp.classList.add("start");
        // let pr2Des = document.createElement("p")
        // pr2.appendChild(pr2Des)
        // pr2Des.textContent = "Inspiring Description: The ultimate guide that transforms any beginner into a confident developer, mastering HTML and CSS step by step."
        close.classList.add("close");
        close.classList.add("fas");
        close.classList.add("fa-close");
        head.textContent = theData["texts"]["popUp-start-title"];
        img.src = "Images/thinking1.webp";
        img.className = "start";
        close.addEventListener("click", () => {
          popUp.classList.add("out");
          layer.remove();
          setTimeout(() => {
            popUp.remove();
          }, 250);
        });
        let container = document.createElement("div");
        container.classList.add("container");
        layer.className = "layer";
        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        popUp.appendChild(container);
        document.body.appendChild(layer);
      });
    }
    if (i === +objectNumbers + 1) {
      lesson.addEventListener("click", () => {
        if (lesson.classList.contains("active")) {

          let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = `${day}/${month}/${year}`;
endMessage(
  date,
  `${lesson.parentElement.classList[0]}`,
  null,
  "Massary-lagrang1Done",
  "Massary-maths-currentProg",
  theData
);
// date , course , nextCourse , storage , progStorage
      sessionStorage.setItem("Massary-mathsDone" , "done")
        }
      });
    }
    lesson.appendChild(done);
    lesson.className = "lesson";
    lessons.push(lesson);
    section.appendChild(lesson);
    if (currentPR === 0) {
      if (i === 0 || i === 1) {
        lessons[i].classList.add("active");
      }
    }
  }
  section.classList = "lagrang1 section";
  body.appendChild(section);

}
