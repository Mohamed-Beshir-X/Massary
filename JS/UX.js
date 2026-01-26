
import{currentPage, setCurrentBody} from './custumize_courses.js'
import{currentSec} from './custumize_courses.js'
import{setCurrentSec} from './custumize_courses.js'
import{setCurrentPage} from './custumize_courses.js'
import{currentBody} from './custumize_courses.js'
import{seeEnglishSec} from './custumize_courses.js'
import{seeMathsSec} from './custumize_courses.js'
import{seeProgrammingSec} from './custumize_courses.js'

let currentPageOR = currentPage
let currentBodyOR = currentBody




let paths = Array.from(document.querySelectorAll(".paths div"));
let pathsButtons = Array.from(document.querySelectorAll(".paths-buttons div"));


export function clickPathsButtons(){
  let pathsButtons = Array.from(document.querySelectorAll(".paths-buttons div"));
  pathsButtons.forEach((e) => {
  e.addEventListener("click", () => {
    
    
    for (let i = 0; i < pathsButtons.length; i++) {
      pathsButtons[i].classList.remove("active");
    }
    let targetClass = e.className;
    console.log(e.className)
    localStorage.setItem("currentPage" , e.className)
    setCurrentPage()
    currentPageOR = e.className;
    setCurrentBody()
    console.log(currentBody)
    console.log(currentPage)
    setCurrentSec()
    localStorage.setItem("currentPage", currentPageOR);
    e.classList.add("active");
    for (let i = 0; i < paths.length; i++) {
      paths[i].classList.remove("active");
    }
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].className == targetClass) {
        paths[i].classList.add("active");
      }
    }
    currentBodyOR = document.querySelector(`.${currentPageOR}`);
    
    costumizeProgress();
    pathProg();
    progressTracker();
    setProgressHeight();
    scrollAppear();
  });
});
}
export function custumizePathsButtons(){
  for (let i = 0; i < pathsButtons.length; i++) {
    pathsButtons[i].classList.remove("active");
  }
  for (let i = 0; i < paths.length; i++) {
    paths[i].classList.remove("active");
  }
  for (let i = 0; i < paths.length; i++) {
    if (paths[i].className == currentPage) {
      paths[i].classList.add("active");
    }
  }
  for (let i = 0; i < pathsButtons.length; i++) {
    if (pathsButtons[i].className == currentPage) {
      pathsButtons[i].classList.add("active");
    }
  }
  
}

export function pathProg() {
  setCurrentSec()
  if (localStorage.getItem(`Massary-${currentPage}-currentProg`)) {
    let currentProg = localStorage.getItem(
      `Massary-${currentPage}-currentProg`
    );
    let lessons = Array.from(
      document.querySelectorAll(`.${currentSec} .lesson`)
      // console.log(currentSec)
    );
    for (let i = 1; i < currentProg; i++) {
      lessons[i].classList.add("done");
      lessons[i].classList.remove("active");
    }
    lessons[+currentProg].classList.add("active");
    console.log(currentSec);
    console.log(currentSec);
  }
}
let scrollDown = document.querySelector(".scroll-down");

export function scrollAppear () {
  console.log(currentBody);
  

  document.querySelector(".scroll-down").addEventListener("click", () => {
    if(!localStorage.getItem("Massary-englishDone")){
seeEnglishSec()
    }
    if(!localStorage.getItem("Massary-mathsDone")){
seeMathsSec()
    }
    if(!localStorage.getItem("Massary-programmingDone")){
seeProgrammingSec()
    }
    setCurrentPage()
    console.log(currentPage)
    setCurrentSec()

    let target = document.querySelectorAll(
    `.${currentPage} .${currentSec} .lesson.active`
  )[1];
  
    const offset = 160;
 
    console.log(currentSec)
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - offset,
      behavior: "smooth",
    });
    console.log(currentSec);
  });
};
export function progressCreator () {
  let progressBar = document.createElement("div");
  let progress = document.createElement("span");
  let progressNum = document.createElement("span");
  progressBar.className = "progress-bar";
  progress.className = "progress";
  progressNum.className = "progress-num";
  progressBar.appendChild(progress);
  progressBar.appendChild(progressNum);
  let place = document.querySelector(".path-container")
  place.appendChild(progressBar);
};
export function progressTracker () {
  let current =
    +localStorage.getItem(`Massary-${currentPage}-currentProg`) || 0;
  let total = document.querySelectorAll(`.${currentSec} .lesson`).length - 1;
  let newPercent = ((current / total) * 100).toFixed(1);
  document.querySelector(".progress-num").textContent = `${newPercent}%`;
  console.log("percent");
  console.log(newPercent);
  localStorage.setItem("Massary-progressPrec", newPercent);
};

export function setProgressHeight() {
  console.log("height");
  console.log(`${localStorage.getItem("Massary-progressPrec")}%`);
  console.log(document.querySelector(".progress-bar .progress"));
  console.log("this is 0000000");
  document.querySelector(
    ".progress-bar .progress"
  ).style.height = `${localStorage.getItem("Massary-progressPrec")}%`;
}
export function costumizeProgress() {
  window.addEventListener("click", (e) => {
    if (
      e.target == document.querySelector(".progress-bar") ||
      e.target == document.querySelector(".progress-bar .progress-num") ||
      e.target == document.querySelector(".progress-bar .progress")
    ) {
      document.querySelector(".progress-bar").classList.toggle("closed");
    }
  });
}
export function createTheGift(theData) {
  let randomArray = [true , false  , false, false]
  let randomValue = randomArray[Math.floor(Math.random() * randomArray.length)]
  if(randomValue && +localStorage.getItem(`Massary-${currentPage}-currentProg`) !== 0 ){
    let gift = document.createElement("div");
  gift.className = "img";
  gift.classList.add("gift");
  let giftImg = document.createElement("img");
  giftImg.src = "../Images/gift.webp";
  gift.appendChild(giftImg);
  let thePlace = Array.from(
    document.querySelectorAll(
      `.body-container .${currentPage} .${currentSec} .lesson.active`
    )
  )[1];
  thePlace.appendChild(gift);
  gift.addEventListener("mouseover", (e) => {
    thePlace.classList.add("no-hover");
  });
  gift.addEventListener("mouseout", (e) => {
    thePlace.classList.remove("no-hover");
  });
  gift.addEventListener("click", (e) => {
    e.stopPropagation();
    let popUp = document.createElement("div");
    let layer = document.createElement("div");
    let close = document.createElement("i");
    let head = document.createElement("h4");
    let img = document.createElement("img");
    close.classList.add("close");
    close.textContent = theData["texts"]["popUp-btn"];
    head.textContent = theData["texts"]["gift-head"]
    const giftAmount = 25;
    let zaitounaGiftMessages = Array.from(theData["texts"]["gift-message"])
    // احنا وقفنا في ترجمة ده ولسة الرسالة و النهاية و تعديل ال responsive و تعديل ايقونات الرسالة و الهدية و تعديل مع ملف الانجليزي 
    let randomGiftMessage =
      zaitounaGiftMessages[
        Math.floor(Math.random() * zaitounaGiftMessages.length)
      ];
    let des = document.createElement("p");
    des.className = "des";
    des.innerHTML = `${randomGiftMessage}`;
    console.log("---------------")
    console.log(randomGiftMessage)
    console.log("---------------")
    img.src = "../Images/mr_gift.webp";

    close.addEventListener("click", () => {
      popUp.classList.add("out");
      layer.remove();
      let coins = document.querySelector(".header .score span")
      let temp = +localStorage.getItem("Massary-coins") + giftAmount
      localStorage.setItem("Massary-coins" , temp)
      coins.textContent = temp
      setTimeout(() => {
        popUp.remove();
      }, 250);
    });
    layer.className = "layer";
    popUp.classList.add("popUp");
    popUp.classList.add("info");
    popUp.classList.add("gf");
    popUp.appendChild(close);
    popUp.appendChild(img);
    popUp.appendChild(head);
    popUp.appendChild(des);
    document.body.appendChild(layer);
    document.getElementById("gift").play();
    gift.remove()
    document.body.appendChild(popUp);
  });
  }else{
    console.log("--------------------------------")
    console.log(randomValue)
    console.log(currentPage)
    console.log("--------------------------------")
  }
}
export function createTheMessage(theData) {
  // let randomArray = [true , false , false , true , true]
  let randomArray =  [true , false , false , true , true]

  let randomValue = randomArray[Math.floor(Math.random() * randomArray.length)]
  if(randomValue){
    let dreamBoxes = []
  let theBoxes = Array.from(document.querySelectorAll(".body-container.dream .box-small"))
  let dreamTitles = []
  theBoxes.forEach((e)=>{
    if(!e.classList.contains("hidden")){
      dreamBoxes.push(e)
    }
  })
  dreamBoxes.forEach((e)=>{
    let theChildren = Array.from(e.children)
    theChildren.forEach((k)=>{
      if(k.classList.contains("box-small-title")){
        dreamTitles.push(k.textContent)
      }
    })
  })
  console.log(dreamTitles)
  if(dreamTitles.length !==0){
    let message = document.createElement("div")
    message.classList.add("message")
    let thePlace = Array.from(
    document.querySelectorAll(
      `.body-container .${currentPage} .${currentSec} .lesson.active`
    )
  )[1];
  console.log(currentPage)
  console.log(currentSec)
    thePlace.appendChild(message)
    let messageImg = document.createElement("img")
    messageImg.src = "../Images/message.webp"
    message.appendChild(messageImg)

    message.addEventListener("mouseover", (e) => {
    thePlace.classList.add("no-hover");
  });
  message.addEventListener("mouseout", (e) => {
    thePlace.classList.remove("no-hover");
  });
  message.addEventListener("click", (e) => {
    e.stopPropagation();
    let popUp = document.createElement("div");
    let layer = document.createElement("div");
    let close = document.createElement("i");
    let head = document.createElement("h4");
    let img = document.createElement("img");
    close.classList.add("close");
    close.textContent = theData["texts"]["popUp-btn"];
    head.textContent = theData["texts"]["messages-head"];
    const dream = dreamTitles[Math.floor(Math.random() * dreamTitles.length)];
    
const zaitounaMessages = Array.from(theData["texts"]["messages"])

const tempRandomMessage =
  zaitounaMessages[Math.floor(Math.random() * zaitounaMessages.length)];

  let randomMessage = tempRandomMessage.replace("${dream}" , dream)

    let des = document.createElement("p");
    des.className = "des";
    des.innerHTML = `${randomMessage}`;

    img.src = "../Images/mr_message.webp";

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
    popUp.classList.add("msg");
    popUp.appendChild(close);
    popUp.appendChild(img);
    popUp.appendChild(head);
    popUp.appendChild(des);
    document.body.appendChild(layer);
    document.getElementById("paper").play();
    message.remove()
    document.body.appendChild(popUp);
  });
  }
  }else{
    console.log(randomValue)
  }
}
export function seeInternet(theData){
  window.addEventListener("offline" , ()=>{
    let popUp = document.createElement("div")
    popUp.className = "popUp"
    popUp.classList.add("no-connection")
    let layer = document.createElement("div")
    layer.className = 'layer'
    layer.classList.add("internet")
    document.body.appendChild(popUp)
    document.body.appendChild(layer)
    let title = document.createElement("h4")
    title.textContent = theData["texts"]['no-connection-title']
    popUp.appendChild(title)
    let des = document.createElement("p")
    des.className = "des"
    des.innerHTML = theData["texts"]["no-connection-des"]
    popUp.appendChild(des)
    let img =document.createElement("img")
    img.className = "img"
    img.src = "../Images/network.webp"
    popUp.appendChild(img)
    let restart = document.createElement("span")
    restart.className = "restart"
    restart.classList.add("btn")
    restart.textContent = theData["texts"]["no-connection-btn"]
    popUp.appendChild(restart)
    restart.addEventListener('click' , ()=>{
      window.location.reload()
    })
  })
  window.addEventListener("online" , ()=>{
    window.location.reload()
  })
}