import { progressTracker } from "./UX.js";
import { setProgressHeight } from "./UX.js";
import { scrollAppear } from "./UX.js";
import { currentSec } from "./custumize_courses.js";
import { changeCurrentSec } from "./custumize_courses.js";
import { endEnglish } from "./custumize_courses.js";
import { endProgramming } from "./custumize_courses.js";
import { endMaths } from "./custumize_courses.js";
function sendAchievementData(name, age, id, area, date, course, msg1, msg2) {
  const actionURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeuoc1eJQgc-WPI9DnI5qlTRjeoWgrS2P7IRETXOJV2LJrTrg/formResponse";
  const params = new URLSearchParams();
  params.append("entry.794592497", name + localStorage.getItem("Massary-userSecondName"));
  params.append("entry.1072691738", age);
  params.append("entry.1841984111", id);
  params.append("entry.207526386", area);
  params.append("entry.1760038492", date);
  params.append("entry.1316803364", course);
  params.append("entry.2072906368", msg1);
  params.append("entry.169717683", msg2);

  fetch(actionURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
    .then(() => {
      // alert("مبروك يا بطل! تم تسجيل إنجازك في 'أبطال مساري' بنجاح 🚀");
    })
    .catch((err) => {
      console.error("خطأ:", err);
      // alert("تأكد من إغلاق 'Limit to 1 response' في إعدادات جوجل فورم.");
    });
}
export function endMessage(
  date,
  course,
  nextCourse,
  storage,
  progStorage,
  theData
) {
  if(document.body.classList.contains("ar")){
    sessionStorage.setItem("card-rtl" , "yes")
  } 
  document.body.classList.remove("ar");
  let popUp = document.createElement("div");
  popUp.className = "popUp";
  popUp.classList.add("end");
  let layer = document.createElement("div");
  layer.className = "layer";
  document.body.appendChild(layer);
  document.body.appendChild(popUp);
  let theCard = document.createElement("div");
  theCard.className = "card";
  popUp.appendChild(theCard);
  if(sessionStorage.getItem("card-rtl")){
    theCard.classList.add("rtl")
    sessionStorage.removeItem("card-rtl")
  }
  let header = document.createElement("div");
  header.className = "text";
  theCard.appendChild(header);
  let h2 = document.createElement("h2");
  h2.textContent = theData["texts"]["end-course-head"];
  header.appendChild(h2);
  let p = document.createElement("p");
  // p.textContent = "You’ve completed the course — take a quiet moment for yourself."
  p.textContent = theData["texts"]["end-course-p"];
  header.appendChild(p);
  let field1 = document.createElement("div");
  field1.className = "field";
  theCard.appendChild(field1);
  let label1 = document.createElement("label");
  // label1.textContent = "How do you feel right now?"
  label1.textContent = theData["texts"]["end-course-label-1"];
  field1.appendChild(label1);
  let textarea1 = document.createElement("textarea");
  // textarea1.placeholder = "I feel ......"
  textarea1.placeholder = theData["texts"]["end-course-label-textarea-1"];
  field1.appendChild(textarea1);
  let field2 = document.createElement("div");
  theCard.appendChild(field2);
  field2.className = "field";
  let label2 = document.createElement("label");
  // label2.textContent = "A message to the founder of Massary"
  label2.textContent = theData["texts"]["end-course-label-2"];
  field2.appendChild(label2);
  let small2 = document.createElement("small");
  // small2.textContent = "This message will reach them personally."
  small2.textContent = theData["texts"]["end-course-small-2"];
  field2.appendChild(small2);
  let textarea2 = document.createElement("textarea");
  // textarea2.placeholder = "Thank you for building this journey…"
  textarea2.placeholder = theData["texts"]["end-course-textarea-2"];
  field2.appendChild(textarea2);

  let btnPrimary = document.createElement("button");
  btnPrimary.className = "btn-primary";
  // btnPrimary.textContent = "Next →"
  btnPrimary.textContent = theData["texts"]["end-course-button"];
  btnPrimary.addEventListener("click", () => {
    sendAchievementData(
      localStorage.getItem("Massary-userName"),
      localStorage.getItem("Massary-userAge"),
      localStorage.getItem("Massary_user_id"),
      localStorage.getItem("Massary-userCity"),
      date,
      course,
      textarea1.value,
      textarea2.value
    );
    popUp.classList.add("out");
    if (sessionStorage.getItem("Massary-mathsDone")) {
      localStorage.setItem("Massary-mathsDone", "done");
    }
    if (sessionStorage.getItem("Massary-programmingDone")) {
      localStorage.setItem("Massary-programmingDone", "done");
    }
    if (sessionStorage.getItem("Massary-englishDone")) {
      localStorage.setItem("Massary-englishDone", "done");
    }
    setTimeout(() => {
      console.log(course);
      document.querySelector(`.section.${course}`).classList.add("completed");
      localStorage.setItem(storage, "done");
      localStorage.setItem(progStorage, 0);
      progressTracker();
      setProgressHeight();
      if (nextCourse !== null) {
        document
          .querySelector(`.${nextCourse}.section`)
          .classList.remove("closed");
        window.scrollTo(0, 0);
        Array.from(document.querySelectorAll(`.${course} .lesson`))[
          Array.from(document.querySelectorAll(`.${course} .lesson`)).length - 1
        ].classList.remove("active");
        // currentSec = nextCourse
        changeCurrentSec(nextCourse);
        console.log(currentSec);
        console.log();
        scrollAppear();
      }

      popUp.remove();

      let popUp2 = document.createElement("div");
      popUp2.className = "popUp";
      popUp2.classList.add("thursday");
      document.body.appendChild(popUp2);
      let card2 = document.createElement("div");
      card2.className = "card";
      card2.classList.add("card2");
      popUp2.appendChild(card2);
      let h3 = document.createElement("h3");
      // h3.textContent = "Congratulations, Massary Hero!"
      h3.textContent = theData["texts"]["end-course-pop-head"];
      card2.appendChild(h3);
      let box = document.createElement("div");
      box.className = "message-box";
      // box.innerHTML = "I’m truly proud of you 🤍<br>Finishing a course means you know how to start —<br>and more importantly, you know how to keep going."
      // box.innerHTML = theData["texts"]["end-course-pop-des"]
      card2.appendChild(box);
      let highlight = document.createElement("div");
      highlight.className = "highlight";
      // highlight.textContent = "✨ Your achievement has been officially recorded among Massary Heroes."
      highlight.textContent = theData["texts"]["end-course-pop-des-2"];
      box.appendChild(highlight);
      let tease = document.createElement("div");
      tease.className = "tease";
      // tease.innerHTML  =  "🌟 Wait for your recognition this <b>Thursday</b><br>inside the <b>the family of mr zeytouna Group</b>"
      tease.innerHTML = theData["texts"]["end-course-pop-des-3"];
      card2.appendChild(tease);
      let img = document.createElement("img");
      img.src = "../Images/mr_tears.webp";
      card2.appendChild(img);
      let btnGhost = document.createElement("div");
      btnGhost.className = "btn-ghost";
      btnGhost.textContent = theData["texts"]["popUp-btn"];
      card2.appendChild(btnGhost);
      btnGhost.addEventListener("click", () => {
        if (!document.body.classList.contains("en")) {
          document.body.classList.add("ar");
        }
        layer.remove();
        popUp2.classList.add("out");
        if (sessionStorage.getItem("Massary-mathsDone")) {
          // window.location.reload()
          sessionStorage.removeItem("Massary-mathsDone");
          endMaths();
          window.location.reload();
        }
        if (sessionStorage.getItem("Massary-programmingDone")) {
          // window.location.reload()
          sessionStorage.removeItem("Massary-programmingDone");
          endProgramming();
          window.location.reload();
        }
        if (sessionStorage.getItem("Massary-englishDone")) {
          // window.location.reload()
          sessionStorage.removeItem("Massary-englishDone");
          endEnglish();
          window.location.reload();
        }
        setTimeout(() => {
          popUp2.remove();
          document.getElementById("piano").pause();
        }, 250);
      });
    }, 250);
  });
  theCard.appendChild(btnPrimary);

  let close = document.createElement("i");
  close.className = "close";
  close.classList.add("fas");
  close.classList.add("fa-close");
  theCard.appendChild(close);
  document.getElementById("piano").play();
  close.addEventListener("click", () => {
    if (!document.body.classList.contains("en")) {
      document.body.classList.add("ar");
    }
    popUp.classList.add("out");
    layer.remove();
    setTimeout(() => {
      popUp.remove();
      document.getElementById("piano").pause();
    }, 250);
  });
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet (تابلت)";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return "Mobile (موبايل)";
  }
  return "Desktop (كمبيوتر)";
}


export function sendUserDataWithDevice(name, age, city) {
  const deviceType = getDeviceType(); 
  const actionURL = "https://docs.google.com/forms/d/e/1FAIpQLSeSC9b5w6ILWJETtRdSYMolFrg1h2fMLOrPGc79K_iwB2S_kw/formResponse";
  const params = new URLSearchParams();
  params.append("entry.1740594963", name);
  params.append("entry.1060625601", age);
  params.append("entry.1535560332", city);
  params.append("entry.1905659119", deviceType);

  fetch(actionURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
  .then(() => {
    console.log("تم الإرسال بنجاح مع بيانات الجهاز!")
    window.location.reload()
  })
  .catch((err) => console.error("خطأ:", err));
}