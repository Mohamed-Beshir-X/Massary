import{setCurrentPage} from './custumize_courses.js'
setCurrentPage()
import{progressTracker} from './UX.js'
import{setProgressHeight} from './UX.js'
import{currentPage} from './custumize_courses.js'
import{endMessage} from './data-server.js'
let currentPR = 0

export function programmingHTMLSection(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["html"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/HTML.webp";
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
        // des.textContent =
        //   "Before Marking The lesson as done, take a moment with the explanation, small steps are what turn effort into progress.";
        des2.innerHTML = theData["texts"]["popUp-not-done-2"];
        // des2.innerHTML = theData["texts"]["popUp-not-done-2"];

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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["html"][`html_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["html"][`html_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["html"][`html_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"];
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]
               
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");
        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"]         
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
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
  "css",
  "Massary-htmlDone",
  "Massary-programming-currentProg",
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
  section.classList = "html section";
  body.appendChild(section);
}
export function programmingcommandLineSection(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(
    theData["programming"]["command_line"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/command_line.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["command_line"][`cli1_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["command_line"][`cli1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["command_line"][`cli1_ar_${i}`]["url"]
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
        // pr1Title.textContent = "Why This Course ?";
        pr1Title.textContent = theData["texts"]["popUp-start-head-1"];
        pr1.appendChild(pr1Title);

        pr1.className = "pr";

        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-cmd"]

        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        pr2Title.textContent = theData['texts']['before-1-pr2Title'];
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.innerHTML = theData["texts"]["before-1-prLink"]
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.innerHTML =theData["texts"]["before-1-web1"]
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.innerHTML = theData["texts"]["before-1-prLink"]
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");
        web2Des.textContent = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.innerHTML = theData["texts"]["before-1-prLink"]
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.textContent = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.innerHTML = theData["texts"]["before-1-prLink"]
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.textContent = theData["texts"]["before-1-web4"]
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Cmder";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute("href", "https://cmder.app/");
        web5Link.setAttribute("target", "_blank");
        web5Link.innerHTML = theData["texts"]["before-1-prLink"]
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML = theData['texts']["before-cmder"]

        web5.appendChild(web5Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
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
  "github",
  "Massary-command_lineDone",
  "Massary-programming-currentProg",
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
  section.classList = "command_line section";
  body.appendChild(section);
}
export function programminggitHubSection(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["github"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/github.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        let doneText = Array.from(theData["texts"]["doneText"])
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["github"][`git1_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["github"][`git1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["github"][`git1_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
        popUp.appendChild(container);

        document.body.appendChild(layer);
      });
    }
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
  "template_1",
  "Massary-githubDone",
  "Massary-programming-currentProg",
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
  section.classList = "github section";
  body.appendChild(section);
}
// programmingCssSection();
export function programmingtemplate_1Section(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["template_1"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/template_1.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["template_1"][`template_1_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["template_1"][`template_1_ar_${i}`][
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
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["template_1"][`template_1_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
        popUp.appendChild(container);

        document.body.appendChild(layer);
      });
    }
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
  "template_2",
  "Massary-template_1Done",
  "Massary-programming-currentProg",
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
  section.classList = "template_1 section";
  body.appendChild(section);
}

export function programmingtemplate_2Section(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["template_2"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/template_2.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["template_2"][`template_2_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["template_2"][`template_2_ar_${i}`][
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
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["template_2"][`template_2_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
        popUp.appendChild(container);

        document.body.appendChild(layer);
      });
    }
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
  "template_3",
  "Massary-template_2Done",
  "Massary-programming-currentProg",
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
  section.classList = "template_2 section";
  body.appendChild(section);
}

export function programmingtemplate_3Section(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["template_3"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/template_3.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["template_3"][`template_3_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["template_3"][`template_3_ar_${i}`][
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
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["template_3"][`template_3_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
        popUp.appendChild(container);

        document.body.appendChild(layer);
      });
    }
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
  "template_4",
  "Massary-template_3Done",
  "Massary-programming-currentProg",
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
  section.classList = "template_3 section";
  body.appendChild(section);
}
export function programmingtemplate_4Section(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["template_4"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/template_4.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["template_4"][`template_4_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["template_4"][`template_4_ar_${i}`][
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
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["template_4"][`template_4_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
        popUp.appendChild(container);

        document.body.appendChild(layer);
      });
    }
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
  "js",
  "Massary-template_4Done",
  "Massary-programming-currentProg",
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
  section.classList = "template_4 section";
  body.appendChild(section);
}
export function programmingtemplate_5Section(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(
    theData["programming"]["template_special"]
  ).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/template_special.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["template_special"][
            `template_special_ar_${i}`
          ]["title"];
        des.textContent =
          theData["programming"]["template_special"][
            `template_special_ar_${i}`
          ]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["template_special"][
            `template_special_ar_${i}`
          ]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
        popUp.appendChild(container);

        document.body.appendChild(layer);
      });
    }
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
  "Massary-template_specialDone",
  "Massary-programming-currentProg",
  theData
);


sessionStorage.setItem("Massary-programmingDone" , "done")
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
  section.classList = "template_special section";
  body.appendChild(section);
}
export function programmingjsSection(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["js"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/js.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
        head.textContent = theData["programming"]["js"][`js_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["js"][`js_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["js"][`js_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");
        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"]         
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");

        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
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
  "template_special",
  "Massary-jsDone",
  "Massary-programming-currentProg",
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
  section.classList = "js section";
  body.appendChild(section);
}
export function programmingCssSection(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["css"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/CSS.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["css"][`css_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["css"][`css_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["css"][`css_ar_${i}`]["url"]
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
        pr1Title.textContent = theData["texts"]["before-1-pr1Title"]
        pr1.appendChild(pr1Title);
        let pr1Link = document.createElement("a");
        pr1Link.setAttribute(
          "href",
          "https://www.noor-book.com/%D9%83%D8%AA%D8%A7%D8%A8-%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA-HTML-%D9%88-CSS-%D9%88-Javascript-%D9%88-SASS-%D8%A3%D8%B3%D8%A7%D9%85%D8%A9-%D8%A7%D9%84%D8%B2%D9%8A%D8%B1%D9%88-pdf"
        );
        pr1Link.setAttribute("target", "_blank");
        pr1.className = "pr";
        pr1Title.appendChild(pr1Link);
        pr1Link.textContent = theData["texts"]["before-1-prLink"];
        let pr1Des = document.createElement("p");
        pr1.appendChild(pr1Des);
        pr1Des.innerHTML = theData["texts"]["before-1-prDes"]        
        popUp.classList.add("start");
        let pr2 = document.createElement("div");

        let pr2Title = document.createElement("h4");
        // pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2Title.textContent = theData["texts"]["before-1-pr2Title"]
        pr2.appendChild(pr2Title);
        // pr2Link.setAttribute("href" , "https://developer.mozilla.org/")
        // pr2Link.setAttribute("target" , "_blank")
        pr2.className = "pr";
        pr2.classList.add("pr2");
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
        let web1 = document.createElement("div");
        web1.classList.add("web");
        pr2.appendChild(web1);
        let web1Title = document.createElement("h3");
        web1Title.textContent = "MDN Web Docs";
        web1.appendChild(web1Title);
        let web1Link = document.createElement("a");
        web1Link.setAttribute("href", "https://developer.mozilla.org/");
        web1Link.setAttribute("target", "_blank");
        web1Link.textContent = theData["texts"]["before-1-prLink"];
        web1Title.appendChild(web1Link);
        let web1Des = document.createElement("p");
        web1Des.textContent = theData['texts']["before-1-web1"]
        web1Des.innerHTML=theData["texts"]["before-1-web1"]        
        web1.appendChild(web1Des);
        let web2 = document.createElement("div");
        web2.classList.add("web");
        pr2.appendChild(web2);
        let web2Title = document.createElement("h3");
        web2Title.textContent = "CodePen";
        web2.appendChild(web2Title);
        let web2Link = document.createElement("a");
        web2Link.setAttribute("href", "https://codepen.io/");
        web2Link.setAttribute("target", "_blank");
        web2Link.textContent = theData["texts"]["before-1-prLink"];
        web2Title.appendChild(web2Link);
        let web2Des = document.createElement("p");

        web2Des.innerHTML = theData["texts"]["before-1-web2"]
        web2.appendChild(web2Des);
        let web3 = document.createElement("div");
        web3.classList.add("web");
        pr2.appendChild(web3);
        let web3Title = document.createElement("h3");
        web3Title.textContent = "Frontend Mentor";
        web3.appendChild(web3Title);
        let web3Link = document.createElement("a");
        web3Link.setAttribute("href", "https://www.frontendmentor.io/");
        web3Link.setAttribute("target", "_blank");
        web3Link.textContent = theData["texts"]["before-1-prLink"];
        web3Title.appendChild(web3Link);
        let web3Des = document.createElement("p");
        web3Des.innerHTML = theData["texts"]["before-1-web3"]
        web3.appendChild(web3Des);
        let web4 = document.createElement("div");
        web4.classList.add("web");
        pr2.appendChild(web4);
        let web4Title = document.createElement("h3");
        web4Title.textContent = "Figma Community";
        web4.appendChild(web4Title);
        let web4Link = document.createElement("a");
        web4Link.setAttribute("href", "https://www.figma.com/community");
        web4Link.setAttribute("target", "_blank");
        web4Link.textContent = theData["texts"]["before-1-prLink"];
        web4Title.appendChild(web4Link);
        let web4Des = document.createElement("p");
        web4Des.innerHTML =   theData["texts"]["before-1-web4"]         
 
        web4.appendChild(web4Des);
        let pr3 = document.createElement("div");
        let web5 = document.createElement("div");
        web5.classList.add("web");
        let web5Title = document.createElement("h3");
        web5Title.textContent = "Visual Studio Code (VS Code)";
        web5.appendChild(web5Title);
        let web5Link = document.createElement("a");
        web5Link.setAttribute(
          "href",
          "https://code.visualstudio.com/download?utm_source=chatgpt.com"
        );
        web5Link.setAttribute("target", "_blank");
        web5Link.textContent = theData["texts"]["before-1-prLink"];
        web5Title.appendChild(web5Link);
        let web5Des = document.createElement("p");
        web5Des.innerHTML =   theData["texts"]["before-1-web5"] 
        web5.appendChild(web5Des);

        let web6 = document.createElement("div");
        web6.classList.add("web");
        let web6Title = document.createElement("h3");
        web6Title.textContent = "Google Chrome";
        web6.appendChild(web6Title);
        let web6Link = document.createElement("a");
        web6Link.setAttribute(
          "href",
          "https://www.google.com/chrome/?utm_source=chatgpt.com"
        );
        web6Link.setAttribute("target", "_blank");
        web6Link.textContent = theData["texts"]["before-1-prLink"];
        web6Title.appendChild(web6Link);
        let web6Des = document.createElement("p");
        web6Des.innerHTML = theData["texts"]["before-1-web6"];
        web6.appendChild(web6Des);

        pr3.classList.add("pr");
        pr3.classList.add("pr2");
        let pr3Title = document.createElement("h4");
        pr3Title.classList.add("prTitle");
        pr3Title.textContent = theData["texts"]["before-p3Title"];
        pr3.appendChild(pr3Title);
        pr3.appendChild(web5);
        pr3.appendChild(web6);

        popUp.classList.add("popUp");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        container.appendChild(pr1);
        container.appendChild(pr3);
        container.appendChild(pr2);
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
  "command_line",
  "Massary-cssDone",
  "Massary-programming-currentProg",
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
  section.classList = "css section";
  body.appendChild(section);
}
export function programmingBeforeSection(theData) {
  let body = document.querySelector(".programming .content");
  let objectNumbers = Object.keys(theData["programming"]["before_prog"]).length;
  let section = document.createElement("div");
  let lessons = [];
  let heading = document.createElement("div");
  let head = document.createElement("img");
  head.src = "Images/prog1.webp";
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
        localStorage.removeItem("Massary-programming-currentDone");
        let nextElement = lessons[lessons.indexOf(done.parentElement) + 1];
        // console.log(lessons.indexOf(done.parentElement))
        let currentProg = lessons.indexOf(done.parentElement) + 1;
        localStorage.setItem(`Massary-${currentPage}-currentProg`, currentProg);

        nextElement.classList.add("active");
        done.remove();
        localStorage.removeItem("Massary-programming-startTime");
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
        // console.log(theData["programming"]["html"][`html_ar_${i}`])
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
          theData["programming"]["before_prog"][`prog1_ar_${i}`]["title"];
        des.textContent =
          theData["programming"]["before_prog"][`prog1_ar_${i}`]["description"];
        span.textContent = theData["texts"]["popUp-lesson-head"];
        link.textContent = theData["texts"]["popUp-lesson-button"];
        link.target = "_blank";
        document.getElementById("lesson").play();
        link.onclick = () => {
          link.classList.add("visited");
          setTimeout(() => done.classList.remove("not-done"), 120000);
          localStorage.setItem(
            "Massary-programming-currentDone",
            lessons.indexOf(lesson)
          );
          localStorage.setItem("Massary-programming-startTime", Date.now());
        };
        link.setAttribute(
          "href",
          theData["programming"]["before_prog"][`prog1_ar_${i}`]["url"]
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
        pr1Des.innerHTML = theData["texts"]["pop-start-des-1"]
          

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
  "html",
  "Massary-before_progDone",
  "Massary-programming-currentProg",
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
  section.classList = "before_prog section";
  body.appendChild(section);

}
