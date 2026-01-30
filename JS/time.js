import { seeEnglishSec } from "./custumize_courses.js";

import { currentenglishSec } from "./custumize_courses.js";
import { seeProgrammingSec } from "./custumize_courses.js";

import { currentprogrammingSec } from "./custumize_courses.js";
import { seeMathsSec } from "./custumize_courses.js";

import { currentMathsSec } from "./custumize_courses.js";




export function mathsDoneTime() {
  if (localStorage.getItem("Massary-maths-startTime")) {
    seeMathsSec()
    let startTime = localStorage.getItem("Massary-maths-startTime");
    let timeNow = Date.now();
    let interval = setInterval(() => {
      let timeNow = Date.now();
      if (timeNow - startTime < 120000) {
        console.log(timeNow - startTime);
      } else {
        document
          .querySelectorAll(`.maths .${currentMathsSec} .lesson .done`)
          [localStorage.getItem("Massary-maths-currentDone")].classList.remove(
            "not-done"
          );
        console.log(
          document.querySelectorAll(`.maths .${currentMathsSec} .lesson .done`)[
            localStorage.getItem("Massary-maths-currentDone")
          ]
        );
        clearInterval(interval);
      }
    }, 1000);
  }
}

export function englishDoneTime() {
  if (localStorage.getItem("Massary-english-startTime")) {
    seeEnglishSec()
    let startTime = localStorage.getItem("Massary-english-startTime");
    let timeNow = Date.now();
    let interval = setInterval(() => {
      let timeNow = Date.now();
      if (timeNow - startTime < 120000) {
        console.log(timeNow - startTime);
      } else {
        console.log(currentenglishSec)
        document
          .querySelectorAll(`.english .${currentenglishSec} .lesson .done`)
          [
            localStorage.getItem("Massary-english-currentDone")
          ].classList.remove("not-done");
        clearInterval(interval);
      }
    }, 1000);
  }
}

export function programmingDoneTime() {
  if (localStorage.getItem("Massary-programming-startTime")) {
    seeProgrammingSec()
    let startTime = localStorage.getItem("Massary-programming-startTime");
    let timeNow = Date.now();
    let interval = setInterval(() => {
      let timeNow = Date.now();
      if (timeNow - startTime < 120000) {
        console.log(timeNow - startTime);
      } else {
        document
          .querySelectorAll(
            `.programming .${currentprogrammingSec} .lesson .done`
          )
          [
            localStorage.getItem("Massary-programming-currentDone")
          ].classList.remove("not-done");
          if(document.querySelector(".msg")){
            document.querySelector(".msg").remove()
          }
        clearInterval(interval);
      }
    }, 1000);
  }
}
