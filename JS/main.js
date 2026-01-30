
import{pagesFlow} from './slide-pages.js'
import{endAllCourses} from './custumize_courses.js'
import{custumizePathsButtons} from './UX.js'
import{setCurrentPage} from './custumize_courses.js'
import{setCurrentBody} from './custumize_courses.js'
import{checkCurrentPage} from './custumize_courses.js'
import{setContainer} from './slide-pages.js'
import{dreamRemover} from './dream.js'
import{programmingBeforeSection} from './programming.js'
import{programmingHTMLSection} from './programming.js'
import{programmingcommandLineSection} from './programming.js'
import{programminggitHubSection} from './programming.js'
import{programmingtemplate_1Section} from './programming.js'
import{programmingtemplate_2Section} from './programming.js'
import{programmingtemplate_3Section} from './programming.js'
import{programmingtemplate_4Section} from './programming.js'
import{programmingtemplate_5Section} from './programming.js'
import{programmingjsSection} from './programming.js'
import{programmingCssSection} from './programming.js'
import{EnglishZeroSection} from './english.js'
import{Englishgram1Section} from './english.js'
import{Englishsounds1Section} from './english.js'
import{Englishread1Section} from './english.js'
import{Englishconv1Section} from './english.js'
import{Englishlis1Section} from './english.js'
import{Englishwrite1Section} from './english.js'
import{EnglishmissSection} from './english.js'
import{EnglishslangSection} from './english.js'
import{mathsbefore_mathsSection} from './maths.js'
import{mathscount1Section} from './maths.js'
import{mathscalc1Section} from './maths.js'
import{mathsfrac1Section} from './maths.js'
import{mathscalc2Section} from './maths.js'
import{mathsfunc1Section} from './maths.js'
import{mathslimit1Section} from './maths.js'
import{mathscont1Section} from './maths.js'
import{mathsderiv1Section} from './maths.js'
import{mathsinteg1Section} from './maths.js'
import{mathstrig1Section} from './maths.js'
import{mathsexplog1Section} from './maths.js'
import{mathsos1Section} from './maths.js'
import{mathsmech1Section} from './maths.js'
import{mathslagrang1Section} from './maths.js'
import{endMaths} from './custumize_courses.js'
import{endProgramming} from './custumize_courses.js'
import{endEnglish} from './custumize_courses.js'
import{seeProgrammingSec} from './custumize_courses.js'
import{seeEnglishSec} from './custumize_courses.js'
import{seeMathsSec} from './custumize_courses.js'
import{setCurrentSec} from './custumize_courses.js'
import{custumizeProgrammingSections} from './custumize_courses.js'
import{custumizeEnglishSections} from './custumize_courses.js'
import{custumizeMathsSections} from './custumize_courses.js'
import{clickPathsButtons} from './UX.js'
import{costumizeProgress} from './UX.js'
import{pathProg} from './UX.js'
import{progressCreator} from './UX.js'
import{progressTracker} from './UX.js'
import{setProgressHeight} from './UX.js'
import{scrollAppear} from './UX.js'
import{mathsDoneTime} from './time.js'
import{englishDoneTime} from './time.js'
import{programmingDoneTime} from './time.js'
import{setTheLibrary} from './library.js'
import{filter} from './library.js'
import{makeBooks} from './library.js'
import{seeBooks} from './library.js'
import{returnDream} from './dream.js'
import{addDream} from './dream.js'
import{custumizeFilters} from './dream.js'
import{createAdream} from './dream.js'
import{saveDream} from './dream.js'
import{emptyNursery} from './dream.js'
import{clickOnDreamBoxAndEdit} from './dream.js'
import{fetchFeed} from './tv.js'
import{createTheMessage} from './UX.js'
import{createTheGift} from './UX.js'
import{clickSupport} from './about.js'
import{setSettings} from './settings.js'
import{seeInternet} from './UX.js'
import{startTheApp} from './start.js'
import{chooseLang} from './start.js'







// set the lang
let lang
  if(localStorage.getItem("Massary-lang") === "en"){
    lang = "en"
  }else{
    lang = "ar"
  }
if(lang === "ar"){
  document.body.classList.add("ar")
}else{
  document.body.classList.add("en")
}






// Start User Data ----------------------------------------------------------------------------


// End User Data ----------------------------------------------------------------------------






document.querySelector(".header .toggle").addEventListener("click" , ()=>{
  document.querySelector(".header .setting  .tabs").classList.toggle("active")
})








document.querySelector(".score span").textContent =
  localStorage.getItem("Massary-coins");
if (!localStorage.getItem("Massary-coins")) {
  document.querySelector(".score span").textContent = 0;
}
// start Setting Langauages and naming ----------------------------------------------------------------
let theData = null;
let userName = null
if(localStorage.getItem("Massary-userName")){
  userName = localStorage.getItem("Massary-userName")
}

let currentPR = 0;

function namingElements(){

   document.querySelector(".start-page h4") .textContent = theData["texts"]['start-page-head']
   document.querySelector(".start-page .btn") .textContent = theData["texts"]['start-page-btn']
   let startArray = Array.from(theData["texts"]["start-page"])
   let startMSG = startArray[Math.floor(Math.random()*startArray.length)]
  document.querySelector(".start-page .des").textContent = startMSG

  document.querySelector(".paths-buttons .programming").textContent = theData["texts"]["programming"]
  document.querySelector(".paths-buttons .english").textContent = theData["texts"]["english"]
  document.querySelector(".paths-buttons .maths").textContent = theData["texts"]["maths"]

  document.querySelector(".slide-bar #path-container span").textContent = theData["texts"]["slide-paths"]
  document.querySelector(".slide-bar #books span").textContent = theData["texts"]["slide-books"]
  document.querySelector(".slide-bar #dream span").textContent = theData["texts"]["slide-dream"]
  document.querySelector(".slide-bar #massary-tv span").textContent = theData["texts"]["slide-tv"]
  document.querySelector(".slide-bar #about-us span").textContent = theData["texts"]["slide-about-us"]
  document.querySelector(".slide-bar #next_level span").textContent = theData["texts"]["slide-next_level"]
  document.querySelector(".header #about-us span").textContent = theData["texts"]["slide-about-us"]
  document.querySelector(".slide-bar #cust span").textContent = theData["texts"]["slide-settings"]
  document.querySelector(".header #cust span").textContent = theData["texts"]["slide-settings"]
  


  document.querySelector(".books .filter #all div").textContent = theData["texts"]["library-all"]
  document.querySelector(".books .filter #self div").textContent = theData["texts"]["library-self"]
  document.querySelector(".books .filter #mang div").textContent = theData["texts"]["library-mang"]
  document.querySelector(".books .filter #prod div").textContent = theData["texts"]["library-prod"]
  document.querySelector(".books .filter #fin div").textContent = theData["texts"]["library-fin"]
  document.querySelector(".books .filter #buis div").textContent = theData["texts"]["library-buis"]

  document.querySelector(".books .lib .lib-img h3").textContent = theData["texts"]["library-h3"]

  document.querySelector(".dream .top .plt ").textContent = theData['texts']["dream-head"]


  document.querySelector(".massary-tv .title p").textContent = theData['texts']["tv-title"]

  document.querySelector(".next_level .content p").innerHTML= theData['texts']['next_level']

   
  document.querySelector(".body-container.about-us .about-title").textContent = theData['texts']['about-us'] 
  document.querySelector(".body-container.about-us .about-content h3").textContent = theData['texts']['about-us-story-head'] 
  document.querySelector(".body-container.about-us .about-content p").innerHTML = theData['texts']['about-us-story'] 
  document.querySelector(".body-container.about-us .sig-name").textContent = theData['texts']['about-us-story-name'] 
  document.querySelector(".body-container.about-us .sig-title").textContent = theData['texts']['about-us-story-founder'] 
  document.querySelector(".body-container.about-us .support-btn").textContent = theData['texts']['about-us-suport-btn'] 
  
  document.querySelector(".body-container.cust h3").textContent = theData["texts"]['cust-title']
  document.querySelector(".body-container.cust .box.sound .title").textContent = theData["texts"]['cust-sound']
  document.querySelector(".body-container.cust .box.lang .title").textContent = theData["texts"]['cust-lang']

  

  document.querySelectorAll(".body-container .future").forEach((e)=>{
    e.textContent = theData["texts"]["future"]
  })
  
  let doneBtns = Array.from(document.querySelectorAll(".paths .lesson .done span"))
  doneBtns.forEach((e)=>{
    e.textContent = theData["texts"]["popUp-lesson-doneButton"]
  })
  
}
WritableStreamDefaultController
if (lang === "ar") {
  fetch("Massary/lang/data-ar.json")
    .then((res) => res.json())
    .then((data) => {
        theData = data;

  const hello = Array.from(theData["texts"]["hello"])

  let randomNum = Math.floor(Math.random() * hello.length);
  document.querySelector(".header .name span").textContent = `${userName}, ${hello[randomNum]}`;
    if(!localStorage.getItem("Massary-lang")){
      chooseLang()
    }else{
      startTheApp(theData)
    }
    seeInternet(theData)
    endAllCourses()
    pagesFlow()
    if(localStorage.getItem("Massary-finished")){
      document.querySelector(".slide-bar #next_level").classList.add("active")
      let pagesArray = Array.from(document.querySelectorAll(".body-container"))
      for(let i = 0; i < pagesArray.length; i++){
        pagesArray[i].classList.remove("active")
        if(pagesArray[i].classList.contains("next_level")){
          pagesArray[i].classList.add("active")
          pagesArray[i].classList.remove("hidden")
          document.querySelector(".paths-buttons").classList.add("hidden")
        }
      }
    }
    if(!localStorage.getItem("Massary-finished")){
    custumizePathsButtons()
    setCurrentPage()
    setCurrentBody()
    checkCurrentPage()
    setContainer()
    dreamRemover()
    
    programmingBeforeSection(theData);
    programmingHTMLSection(theData);
    programmingCssSection(theData);
    programmingcommandLineSection(theData);
    programminggitHubSection(theData);
    programmingtemplate_1Section(theData);
    programmingtemplate_2Section(theData);
    programmingtemplate_3Section(theData);
    programmingtemplate_4Section(theData);
    programmingjsSection(theData);
    programmingtemplate_5Section(theData);
    EnglishZeroSection(theData);
    Englishgram1Section(theData);
    Englishsounds1Section(theData);
    Englishread1Section(theData);
    Englishconv1Section(theData);
    Englishlis1Section(theData);
    Englishwrite1Section(theData);
    EnglishmissSection(theData);
    EnglishslangSection(theData);
    mathsbefore_mathsSection(theData);
    mathscount1Section(theData);
    mathscalc1Section(theData);
    mathsfrac1Section(theData);
    mathscalc2Section(theData);
    mathsfunc1Section(theData);
    mathslimit1Section(theData);
    mathscont1Section(theData);
    mathsderiv1Section(theData);
    mathsinteg1Section(theData);
    mathstrig1Section(theData);
    mathsexplog1Section(theData);
    mathsos1Section(theData);
    mathsmech1Section(theData);
    mathslagrang1Section(theData);
    endMaths()
    endProgramming()
    endEnglish()
    
    }
    
    if(!localStorage.getItem("Massary-programmingDone")){
      seeProgrammingSec();
    }
    if(!localStorage.getItem("Massary-englishDone")){
      seeEnglishSec();
    }
    
    if(!localStorage.getItem("Massary-mathsDone")){
      seeMathsSec();
    }
    if(!localStorage.getItem("Massary-finished")){
      setCurrentSec();
    custumizeProgrammingSections();
    custumizeEnglishSections();
    custumizeMathsSections();
    clickPathsButtons()
    costumizeProgress();
    pathProg();
    progressCreator();
    progressTracker();
    setProgressHeight();
    scrollAppear();
    programmingDoneTime();
    englishDoneTime();
    mathsDoneTime();
    }
    setTheLibrary(theData);
    makeBooks(theData);
    filter(theData);
    seeBooks(theData);
    returnDream(theData);
    addDream(theData);
    clickOnDreamBoxAndEdit(theData);
    emptyNursery(theData);
    fetchFeed(theData);

    if(!localStorage.getItem("Massary-finished")){
      createTheMessage(theData);
      createTheGift(theData)
      document.querySelector(".progress-bar").classList.add("closed");
    }
    namingElements(theData)
    clickSupport(theData)
    setSettings(theData)
    })
    .catch((err) => console.log(err));
} else if (lang === "en") {
  fetch("Massary/lang/data-en.json")
    .then((res) => res.json())
    .then((data) => {
           theData = data;

  const hello = Array.from(theData["texts"]["hello"])

  let randomNum = Math.floor(Math.random() * hello.length);
  document.querySelector(".header .name span").textContent = `${userName}, ${hello[randomNum]}`;
    if(!localStorage.getItem("Massary-lang")){
      chooseLang()
    }else{
      startTheApp(theData)
    }
    seeInternet(theData)
    endAllCourses()
    pagesFlow()
    if(localStorage.getItem("Massary-finished")){
      document.querySelector(".slide-bar #next_level").classList.add("active")
      let pagesArray = Array.from(document.querySelectorAll(".body-container"))
      for(let i = 0; i < pagesArray.length; i++){
        pagesArray[i].classList.remove("active")
        if(pagesArray[i].classList.contains("next_level")){
          pagesArray[i].classList.add("active")
          pagesArray[i].classList.remove("hidden")
          document.querySelector(".paths-buttons").classList.add("hidden")
        }
      }
    }
    if(!localStorage.getItem("Massary-finished")){
    custumizePathsButtons()
    setCurrentPage()
    setCurrentBody()
    checkCurrentPage()
    setContainer()
    dreamRemover()
    
    programmingBeforeSection(theData);
    programmingHTMLSection(theData);
    programmingCssSection(theData);
    programmingcommandLineSection(theData);
    programminggitHubSection(theData);
    programmingtemplate_1Section(theData);
    programmingtemplate_2Section(theData);
    programmingtemplate_3Section(theData);
    programmingtemplate_4Section(theData);
    programmingjsSection(theData);
    programmingtemplate_5Section(theData);
    EnglishZeroSection(theData);
    Englishgram1Section(theData);
    Englishsounds1Section(theData);
    Englishread1Section(theData);
    Englishconv1Section(theData);
    Englishlis1Section(theData);
    Englishwrite1Section(theData);
    EnglishmissSection(theData);
    EnglishslangSection(theData);
    mathsbefore_mathsSection(theData);
    mathscount1Section(theData);
    mathscalc1Section(theData);
    mathsfrac1Section(theData);
    mathscalc2Section(theData);
    mathsfunc1Section(theData);
    mathslimit1Section(theData);
    mathscont1Section(theData);
    mathsderiv1Section(theData);
    mathsinteg1Section(theData);
    mathstrig1Section(theData);
    mathsexplog1Section(theData);
    mathsos1Section(theData);
    mathsmech1Section(theData);
    mathslagrang1Section(theData);
    endMaths()
    endProgramming()
    endEnglish()
    
    }
    
    if(!localStorage.getItem("Massary-programmingDone")){
      seeProgrammingSec();
    }
    if(!localStorage.getItem("Massary-englishDone")){
      seeEnglishSec();
    }
    
    if(!localStorage.getItem("Massary-mathsDone")){
      seeMathsSec();
    }
    if(!localStorage.getItem("Massary-finished")){
      setCurrentSec();
    custumizeProgrammingSections();
    custumizeEnglishSections();
    custumizeMathsSections();
    clickPathsButtons()
    costumizeProgress();
    pathProg();
    progressCreator();
    progressTracker();
    setProgressHeight();
    scrollAppear();
    programmingDoneTime();
    englishDoneTime();
    mathsDoneTime();
    }
    setTheLibrary(theData);
    makeBooks(theData);
    filter(theData);
    seeBooks(theData);
    returnDream(theData);
    addDream(theData);
    clickOnDreamBoxAndEdit(theData);
    emptyNursery(theData);
    fetchFeed(theData);

    if(!localStorage.getItem("Massary-finished")){
      createTheMessage(theData);
      createTheGift(theData)
      document.querySelector(".progress-bar").classList.add("closed");
    }
    namingElements(theData)
    clickSupport(theData)
    setSettings(theData)
    })
    .catch((err) => console.log(err));
}

// window.addEventListener("offline" , ()=>{
//   console.log("we are offline")
//   console.log("we")

// })
