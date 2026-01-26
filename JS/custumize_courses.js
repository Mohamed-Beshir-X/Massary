export let currentBody = "";
export let currentSec = ""; 
export let currentPage = "";
export let currentprogrammingSec = "before_prog";
export let currentenglishSec = "zero";
export let currentMathsSec = "before_maths";

export function setCurrentPage() {
  if (localStorage.getItem("currentPage")) {
    currentPage = localStorage.getItem("currentPage");
  } else {
    currentPage = "programming";
  }
}
export function setCurrentBody() {
  currentBody = document.querySelector(`.${currentPage}`);
}
export function checkCurrentPage() {
  if (!localStorage.getItem(`Massary-${currentPage}-currentProg`)) {
  localStorage.setItem(`Massary-${currentPage}-currentProg`, 0);
  }
}




export function seeProgrammingSec() {
  if (localStorage.getItem("Massary-before_progDone")) {
    currentprogrammingSec = "html";
    document.querySelector(".section.before_prog").classList.add("completed");
  }
  if (localStorage.getItem("Massary-htmlDone")) {
    document.querySelector(".section.html").classList.add("completed");
    currentprogrammingSec = "css";
  }
  if (localStorage.getItem("Massary-cssDone")) {
    document.querySelector(".section.css").classList.add("completed");
    currentprogrammingSec = "command_line";
  }
  if (localStorage.getItem("Massary-command_lineDone")) {
    document.querySelector(".section.command_line").classList.add("completed");
    currentprogrammingSec = "github";
  }
  if (localStorage.getItem("Massary-githubDone")) {
    document.querySelector(".section.github").classList.add("completed");
    currentprogrammingSec = "template_1";
  }
  if (localStorage.getItem("Massary-template_1Done")) {
    document.querySelector(".section.template_1").classList.add("completed");
    currentprogrammingSec = "template_2";
  }
  if (localStorage.getItem("Massary-template_2Done")) {
    document.querySelector(".section.template_2").classList.add("completed");
    currentprogrammingSec = "template_3";
  }
  if (localStorage.getItem("Massary-template_3Done")) {
    document.querySelector(".section.template_3").classList.add("completed");
    currentprogrammingSec = "template_4";
  }
  if (localStorage.getItem("Massary-template_4Done")) {
    document.querySelector(".section.template_4").classList.add("completed");
    currentprogrammingSec = "js";
  }
  if (localStorage.getItem("Massary-jsDone")) {
    document.querySelector(".section.js").classList.add("completed");
    currentprogrammingSec = "template_special";
  }
}
export function seeEnglishSec() {
  if (localStorage.getItem("Massary-ZeroDone")) {
    currentenglishSec = "gram1";
    document.querySelector(".section.zero").classList.add("completed");
  }

  if (localStorage.getItem("Massary-gram1Done")) {
    document.querySelector(".section.gram1").classList.add("completed");
    currentenglishSec = "sounds1";
  }

  if (localStorage.getItem("Massary-sounds1Done")) {
    document.querySelector(".section.sounds1").classList.add("completed");
    currentenglishSec = "read1";
  }

  if (localStorage.getItem("Massary-read1Done")) {
    document.querySelector(".section.read1").classList.add("completed");
    currentenglishSec = "conv1";
  }

  if (localStorage.getItem("Massary-conv1Done")) {
    document.querySelector(".section.conv1").classList.add("completed");
    currentenglishSec = "lis1";
  }

  if (localStorage.getItem("Massary-lis1Done")) {
    document.querySelector(".section.lis1").classList.add("completed");
    currentenglishSec = "write1";
  }

  if (localStorage.getItem("Massary-write1Done")) {
    document.querySelector(".section.write1").classList.add("completed");
    currentenglishSec = "miss";
  }

  if (localStorage.getItem("Massary-missDone")) {
    document.querySelector(".section.miss").classList.add("completed");
    currentenglishSec = "slang";
  }

  if (localStorage.getItem("Massary-slangDone")) {
    document.querySelector(".section.slang").classList.add("completed");
    currentenglishSec = null; // المسار خلص
  }
}
export function seeMathsSec() {
  if (localStorage.getItem("Massary-before_mathsDone")) {
    currentMathsSec = "count1";
    document.querySelector(".section.before_maths").classList.add("completed");
  }

  if (localStorage.getItem("Massary-count1Done")) {
    document.querySelector(".section.count1").classList.add("completed");
    currentMathsSec = "calc1";
  }

  if (localStorage.getItem("Massary-calc1Done")) {
    document.querySelector(".section.calc1").classList.add("completed");
    currentMathsSec = "frac1";
  }

  if (localStorage.getItem("Massary-frac1Done")) {
    document.querySelector(".section.frac1").classList.add("completed");
    currentMathsSec = "calc2";
  }

  if (localStorage.getItem("Massary-calc2Done")) {
    document.querySelector(".section.calc2").classList.add("completed");
    currentMathsSec = "func1";
  }

  if (localStorage.getItem("Massary-func1Done")) {
    document.querySelector(".section.func1").classList.add("completed");
    currentMathsSec = "limit1";
  }

  if (localStorage.getItem("Massary-limit1Done")) {
    document.querySelector(".section.limit1").classList.add("completed");
    currentMathsSec = "cont1";
  }

  if (localStorage.getItem("Massary-cont1Done")) {
    document.querySelector(".section.cont1").classList.add("completed");
    currentMathsSec = "deriv1";
  }

  if (localStorage.getItem("Massary-deriv1Done")) {
    document.querySelector(".section.deriv1").classList.add("completed");
    currentMathsSec = "integ1";
  }

  if (localStorage.getItem("Massary-integ1Done")) {
    document.querySelector(".section.integ1").classList.add("completed");
    currentMathsSec = "trig1";
  }

  if (localStorage.getItem("Massary-trig1Done")) {
    document.querySelector(".section.trig1").classList.add("completed");
    currentMathsSec = "explog1";
  }

  if (localStorage.getItem("Massary-explog1Done")) {
    document.querySelector(".section.explog1").classList.add("completed");
    currentMathsSec = "os1";
  }

  if (localStorage.getItem("Massary-os1Done")) {
    document.querySelector(".section.os1").classList.add("completed");
    currentMathsSec = "mech1";
  }

  if (localStorage.getItem("Massary-mech1Done")) {
    document.querySelector(".section.mech1").classList.add("completed");
    currentMathsSec = "lagrang1";
  }

  if (localStorage.getItem("Massary-lagrang1Done")) {
    document.querySelector(".section.lagrang1").classList.add("completed");
    currentMathsSec = null; // مسار الرياضيات خلص
  }
}
export function custumizeProgrammingSections() {
  let sections = Array.from(document.querySelectorAll(".programming .section"));
  sections.forEach((e) => {
    if (
      !e.classList.contains(currentprogrammingSec) &&
      !e.classList.contains("completed")
    ) {
      e.classList.add("closed");
    }
  });
}
export function custumizeEnglishSections() {
  let sections = Array.from(document.querySelectorAll(".english .section"));
  sections.forEach((e) => {
    if (
      !e.classList.contains(currentenglishSec) &&
      !e.classList.contains("completed")
    ) {
      e.classList.add("closed");
    }
  });
}
export function custumizeMathsSections() {
  let sections = Array.from(document.querySelectorAll(".maths .section"));
  sections.forEach((e) => {
    if (
      !e.classList.contains(currentMathsSec) &&
      !e.classList.contains("completed")
    ) {
      e.classList.add("closed");
    }
  });
}
export function setCurrentSec() {
  if (currentPage === "programming") {
    currentSec = currentprogrammingSec;
  }
  if (currentPage === "english") {
    currentSec = currentenglishSec;
  }
  if (currentPage === "maths") {
    currentSec = currentMathsSec;
  }
  if (currentPage === "selfDevelopment") {
    // currentSec === currentselfDevelopmentSec;
  }
}
export function endMaths() {
  if (localStorage.getItem("Massary-mathsDone")) {
    document.querySelector(".paths-buttons .maths").remove();
    document.querySelector(".paths .maths").remove();
    Array.from(
      document.querySelectorAll(".paths-buttons > div")
    )[0].classList.add("active");
    if (Array.from(document.querySelectorAll(".paths-buttons > div"))[1]) {
      Array.from(
        document.querySelectorAll(".paths-buttons > div")
      )[1].classList.remove("active");
    }
    Array.from(
      document.querySelectorAll(".path-container .paths > div")
    )[0].classList.add("active");

    currentPage = Array.from(
      document.querySelectorAll(".paths-buttons > div")
    )[0].classList[0];
    console.log(currentPage);
  }
}
export function endProgramming() {
  if (localStorage.getItem("Massary-programmingDone")) {
    document.querySelector(".paths-buttons .programming").remove();
    document.querySelector(".paths .programming").remove();
    Array.from(
      document.querySelectorAll(".paths-buttons > div")
    )[0].classList.add("active");
    if (Array.from(document.querySelectorAll(".paths-buttons > div"))[1]) {
      Array.from(
        document.querySelectorAll(".paths-buttons > div")
      )[1].classList.remove("active");
    }
    Array.from(
      document.querySelectorAll(".path-container .paths > div")
    )[0].classList.add("active");
    if (
      Array.from(document.querySelectorAll(".path-container .paths > div"))[1]
    ) {
      Array.from(
        document.querySelectorAll(".path-container .paths > div")
      )[1].classList.remove("active");
    }
    console.log(
      Array.from(document.querySelectorAll(".path-container .paths > div"))[1]
    );
    currentPage = Array.from(
      document.querySelectorAll(".paths-buttons > div")
    )[0].classList[0];
    console.log(currentPage);
  }
}
export function endEnglish() {
  if (localStorage.getItem("Massary-englishDone")) {
    document.querySelector(".paths-buttons .english").remove();
    document.querySelector(".paths .english").remove();
    Array.from(
      document.querySelectorAll(".paths-buttons > div")
    )[0].classList.add("active");
    if (Array.from(document.querySelectorAll(".paths-buttons > div"))[1]) {
      Array.from(
        document.querySelectorAll(".paths-buttons > div")
      )[1].classList.remove("active");
    }
    Array.from(
      document.querySelectorAll(".path-container .paths > div")
    )[0].classList.add("active");
    if (
      Array.from(document.querySelectorAll(".path-container .paths > div"))[1]
    ) {
      Array.from(
        document.querySelectorAll(".path-container .paths > div")
      )[1].classList.remove("active");
    }
    currentPage = Array.from(
      document.querySelectorAll(".paths-buttons > div")
    )[0].classList[0];
    console.log(currentPage);
  }
}
export function endAllCourses() {
  if (
    localStorage.getItem("Massary-mathsDone") &&
    localStorage.getItem("Massary-programmingDone") &&
    localStorage.getItem("Massary-englishDone")
  ) {
    localStorage.setItem("Massary-finished", "done");
    document.querySelector(".path-container").remove();
    document.querySelector(".slide-bar #path-container").remove();
  }
}


export function changeCurrentSec(value){
  currentSec = value
}