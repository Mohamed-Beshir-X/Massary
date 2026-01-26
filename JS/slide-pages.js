let containers = Array.from(document.querySelectorAll(".body-container"));
let currentSlidePage = "path-container";
export function pagesFlow() {
  let slidePages = Array.from(document.querySelectorAll(".slide-bar ul li a"));
  let secondAboutUs = document.querySelector(
    ".header .setting.mobile .tabs #about-us a"
  );
  let secondCust = document.querySelector(
    ".header .setting.mobile .tabs #cust a"
  );
  slidePages.push(secondAboutUs);
  slidePages.push(secondCust);
  function whichPage() {
    slidePages[0].parentElement.classList.add("active");
    setContainer();
    slidePages.forEach((e) => {
      e.addEventListener("click", (k) => {
        for (let i = 0; i < slidePages.length; i++) {
          slidePages[i].parentElement.classList.remove("active");
        }
        let theChildren = Array.from(e.children);
        // theChildren.forEach((k)=>{
        //   k.preventDefault()
        // })
        k.preventDefault();
        e.parentElement.classList.add("active");
        currentSlidePage = e.parentElement.id;
        setContainer();
        setThePage();
        window.scrollTo(0, 0);
        console.log(e);
        console.log(e.parentElement.className);
      });
    });
  }
  whichPage()
  function setContainer() {
    containers.forEach((e) => {
      e.classList.add("hidden");
      if (e.classList.contains(currentSlidePage)) {
        e.classList.remove("hidden");
      }
    });
  }
  function setThePage() {
    document
      .querySelector(".header .setting  .tabs")
      .classList.remove("active");
    if (currentSlidePage === "path-container") {
      // programmingBeforeSection();
      // programmingHTMLSection();
      // programmingCssSection();
      // programmingcommandLineSection();
      // programminggitHubSection();
      // programmingtemplate_1Section();
      // programmingtemplate_2Section();
      // programmingtemplate_3Section();
      // programmingtemplate_4Section();
      // programmingjsSection();
      // programmingtemplate_5Section();
      // EnglishZeroSection();
      // Englishgram1Section();
      // Englishsounds1Section();
      // Englishread1Section();
      // Englishconv1Section();
      // Englishlis1Section();
      // Englishwrite1Section();
      // EnglishmissSection();
      // EnglishslangSection();
      // mathsbefore_mathsSection();
      // mathscount1Section();
      // mathscalc1Section();
      // mathsfrac1Section();
      // mathscalc2Section();
      // mathsfunc1Section();
      // mathslimit1Section();
      // mathscont1Section();
      // mathsderiv1Section();
      // mathsinteg1Section();
      // mathstrig1Section();
      // mathsexplog1Section();
      // mathsos1Section();
      // mathsmech1Section();
      // mathslagrang1Section();
      // seeProgrammingSec();
      // seeEnglishSec();
      // seeMathsSec();
      // setCurrentSec();
      // custumizeProgrammingSections();
      // custumizeEnglishSections();
      // custumizeMathsSections();
      // costumizeProgress();
      // pathProg();
      // progressCreator();
      // progressTracker();
      // setProgressHeight();
      // scrollAppear();
      // programmingDoneTime();
      // englishDoneTime();
      // mathsDoneTime();
      if (
        document.querySelector(".paths-buttons").classList.contains("hidden")
      ) {
        document.querySelector(".paths-buttons").classList.remove("hidden");
      }
      if (
        document.querySelector(".header .score").classList.contains("hidden")
      ) {
        document.querySelector(".header .score").classList.remove("hidden");
      }
    }
    if (currentSlidePage === "books") {
      // setTheLibrary();
      // makeBooks();
      // filter();
      // seeBooks();
      document.querySelector(".paths-buttons").classList.add("hidden");
      if (
        document.querySelector(".header .score").classList.contains("hidden")
      ) {
        document.querySelector(".header .score").classList.remove("hidden");
      }
    }
    if (currentSlidePage === "dream") {
      // returnDream();
      // addDream();
      // clickOnDreamBoxAndEdit();
      // emptyNursery();
      document.querySelector(".paths-buttons").classList.add("hidden");
      document.querySelector(".header .score").classList.add("hidden");
    }
    if (currentSlidePage === "massary-tv") {
      document.querySelector(".paths-buttons").classList.add("hidden");
      document.querySelector(".header .score").classList.add("hidden");
    }
    if (currentSlidePage === "next_level") {
      document.querySelector(".paths-buttons").classList.add("hidden");
      document.querySelector(".header .score").classList.add("hidden");
    }
    if (currentSlidePage === "about-us") {
      document.querySelector(".paths-buttons").classList.add("hidden");
      document.querySelector(".header .score").classList.add("hidden");
    }
    if (currentSlidePage === "cust") {
      document.querySelector(".paths-buttons").classList.add("hidden");
      document.querySelector(".header .score").classList.add("hidden");
    }
    if (window.location.pathname.includes("social.html")) {
    }
    if (window.location.pathname.includes("advanced.html")) {
    }
    if (window.location.pathname.includes("info.html")) {
    }
    if (window.location.pathname.includes("setting.html")) {
    }
  }
}
export function setContainer() {
    containers.forEach((e) => {
      e.classList.add("hidden");
      if (e.classList.contains(currentSlidePage)) {
        e.classList.remove("hidden");
      }
    });
  }
