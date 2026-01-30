import{setCurrentPage} from './custumize_courses.js'
setCurrentPage()
import{progressTracker} from './UX.js'
import{setProgressHeight} from './UX.js'
import{currentPage} from './custumize_courses.js'
import{endMessage} from './data-server.js'



let currentPR = 0
export function EnglishZeroSection(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(theData["english"]["level_1"]["zero"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/zero.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["zero"][`zero1_ar_${i}`])
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
          theData["english"]["level_1"]["zero"][`zero1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["zero"][`zero1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["zero"][`zero1_ar_${i}`]["url"]
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
        pr1Des.innerHTML = theData["texts"]["popUp-start-des-2"]

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
           "gram1",
           "Massary-ZeroDone",
           "Massary-english-currentProg",
           theData
         );
          // document.querySelector(".section.zero").classList.add("completed");
          // localStorage.setItem("Massary-ZeroDone", "done");
          // localStorage.setItem("Massary-english-currentProg" , 0)
          // progressTracker()
          // document.querySelector(".gram1.section").classList.remove("closed")
          // window.scrollTo(0, 0);
          // // (name , age , id , area , date , course , msg1 , msg2)
          // sendAchievementData(userName , userAge , localStorage.getItem("Massary_user_id") , userCity , Date.now(), currentSec , "very happy" , "thank you mohamed")
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
  section.classList = "zero section";
  body.appendChild(section);
}
export function Englishgram1Section(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(
    theData["english"]["level_1"]["gram1"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/gram1.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["gram1"][`gram11_ar_${i}`])
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
          theData["english"]["level_1"]["gram1"][`gram1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["gram1"][`gram1_ar_${i}`][
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
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["gram1"][`gram1_ar_${i}`]["url"]
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
        // pr1Title.textContent = "Why this Course ?";
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']


          pr1Des.innerHTML = theData["texts"]['before-english']

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

         // date , course , nextCourse , storage , progStorage
         endMessage(
           date,
           `${lesson.parentElement.classList[0]}`,
           "sounds1",
           "Massary-gram1Done" ,
           "Massary-english-currentProg",
           theData
         );
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
  section.classList = "gram1 section";
  body.appendChild(section);
}
export function Englishsounds1Section(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(
    theData["english"]["level_1"]["sounds1"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/sounds1.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["sounds1"][`sounds11_ar_${i}`])
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
          theData["english"]["level_1"]["sounds1"][`sounds1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["sounds1"][`sounds1_ar_${i}`][
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
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["sounds1"][`sounds1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "read1",
  "Massary-sounds1Done",
  "Massary-english-currentProg",
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
  section.classList = "sounds1 section";
  body.appendChild(section);
}
export function Englishread1Section(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(
    theData["english"]["level_1"]["read1"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/read1.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["read1"][`read11_ar_${i}`])
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
          theData["english"]["level_1"]["read1"][`read1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["read1"][`read1_ar_${i}`][
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
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["read1"][`read1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "conv1",
  "Massary-read1Done",
  "Massary-english-currentProg",
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
  section.classList = "read1 section";
  body.appendChild(section);
}
export function Englishconv1Section(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(
    theData["english"]["level_1"]["conv1"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/conv1.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["conv1"][`conv11_ar_${i}`])
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
          theData["english"]["level_1"]["conv1"][`conv1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["conv1"][`conv1_ar_${i}`][
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
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["conv1"][`conv1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "lis1",
  "Massary-conv1Done",
  "Massary-english-currentProg",
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
  section.classList = "conv1 section";
  body.appendChild(section);
}
export function Englishlis1Section(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(theData["english"]["level_1"]["lis1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/lis1.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["lis1"][`lis11_ar_${i}`])
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
          theData["english"]["level_1"]["lis1"][`lis1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["lis1"][`lis1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["lis1"][`lis1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "write1",
  "Massary-lis1Done",
  "Massary-english-currentProg",
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
  section.classList = "lis1 section";
  body.appendChild(section);
}
export function Englishwrite1Section(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(
    theData["english"]["level_1"]["write1"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/write1.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["write1"][`write11_ar_${i}`])
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
          theData["english"]["level_1"]["write1"][`write1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["write1"][`write1_ar_${i}`][
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
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["write1"][`write1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "miss",
  "Massary-write1Done",
  "Massary-english-currentProg",
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
  section.classList = "write1 section";
  body.appendChild(section);
}
export function EnglishmissSection(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(theData["english"]["level_1"]["miss"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/miss.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["miss"][`miss1_ar_${i}`])
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
          theData["english"]["level_1"]["miss"][`miss1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["miss"][`miss1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["miss"][`miss1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "slang",
  "Massary-missDone",
  "Massary-english-currentProg",
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
  section.classList = "miss section";
  body.appendChild(section);
}
export function EnglishslangSection(theData) {
  let body = document.querySelector(".english .content");
  console.log(theData);
  let objectNumbers = Object.keys(
    theData["english"]["level_1"]["slang"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/slang.webp";
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
        localStorage.removeItem("Massary-english-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-english-startTime");
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
        // console.log(theData[["english"]["level_1"]["slang"][`slang1_ar_${i}`])
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
          theData["english"]["level_1"]["slang"][`slang1_ar_${i}`]["title"];
        des.textContent =
          theData["english"]["level_1"]["slang"][`slang1_ar_${i}`][
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
            "Massary-english-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-english-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["english"]["level_1"]["slang"][`slang1_ar_${i}`]["url"]
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
        pr1Title.textContent = "Why this Course ?";
        pr1.appendChild(pr1Title);
        pr1.className = "pr";
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]['before-english']

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
  "Massary-slangDone",
  "Massary-english-currentProg",
  theData
);


sessionStorage.setItem("Massary-englishDone" , "done")
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
  section.classList = "slang section";
  body.appendChild(section);
}

