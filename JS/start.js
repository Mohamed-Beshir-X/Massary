import {  sendUserDataWithDevice } from "./data-server.js";
export function startTheApp(theData) {
  let music = document.getElementById("music");
  let startBtn = document.querySelector(".start-page .btn");
  startBtn.addEventListener("click", () => {
    let skip = document.createElement("span");
    skip.className = "skip";
    skip.textContent = theData["texts"]["skip"];
    setTimeout(()=>{
      document.body.appendChild(skip);
    },4000)
    skip.addEventListener("click", () => {
      skip.remove();
      music.pause();

      if (document.querySelector(".developer")) {
        document.querySelector(".developer").remove();
      }
      if (document.querySelector(".product")) {
        document.querySelector(".product").remove();
      }
      window.scrollTo(0,0)
      if (!navigator.onLine) {
        let popUp = document.createElement("div");
        popUp.className = "popUp";
        popUp.classList.add("no-connection");
        let layer = document.createElement("div");
        layer.className = "layer";
        document.body.appendChild(popUp);
        document.body.appendChild(layer);
        let title = document.createElement("h4");
        title.textContent = theData["texts"]["no-connection-title"];
        popUp.appendChild(title);
        let des = document.createElement("p");
        des.className = "des";
        des.innerHTML = theData["texts"]["no-connection-des"];
        popUp.appendChild(des);
        let img = document.createElement("img");
        img.className = "img";
        img.src = "../Images/network.webp";
        popUp.appendChild(img);
        let restart = document.createElement("span");
        restart.className = "restart";
        restart.classList.add("btn");
        restart.textContent = theData["texts"]["no-connection-btn"];
        popUp.appendChild(restart);
        restart.addEventListener("click", () => {
          window.location.reload();
        });
      } else {
        if(!localStorage.getItem("Massary-userId")){
          firstStart(theData);
        }
      }
    });
    document.querySelector(".start-page").remove();
    music.play();
    let developer = document.createElement("div");
    developer.className = "developer";
    document.body.appendChild(developer);
    let imgCont1 = document.createElement("div");
    imgCont1.className = "img";
    developer.appendChild(imgCont1);
    let img1 = document.createElement("img");
    img1.src = "../Images/developer.webp";
    imgCont1.appendChild(img1);
    developer.addEventListener("animationend", () => {
      developer.remove();
      let product = document.createElement("div");
      product.className = "product";
      document.body.appendChild(product);
      let imgCont2 = document.createElement("div");
      imgCont2.className = "img";
      product.appendChild(imgCont2);
      let img2 = document.createElement("img");
      img2.src = "../Images/logo3.webp";
      imgCont2.appendChild(img2);
      product.addEventListener("animationend", () => {
        product.remove();
        skip.remove();
        window.scrollTo(0,0)
        if (!navigator.onLine) {
          let popUp = document.createElement("div");
          popUp.className = "popUp";
          popUp.classList.add("no-connection");
          let layer = document.createElement("div");
          layer.className = "layer";
          document.body.appendChild(popUp);
          document.body.appendChild(layer);
          let title = document.createElement("h4");
          title.textContent = theData["texts"]["no-connection-title"];
          popUp.appendChild(title);
          let des = document.createElement("p");
          des.className = "des";
          des.innerHTML = theData["texts"]["no-connection-des"];
          popUp.appendChild(des);
          let img = document.createElement("img");
          img.className = "img";
          img.src = "../Images/network.webp";
          popUp.appendChild(img);
          let restart = document.createElement("span");
          restart.className = "restart";
          restart.classList.add("btn");
          restart.textContent = theData["texts"]["no-connection-btn"];
          popUp.appendChild(restart);
          restart.addEventListener("click", () => {
            window.location.reload();
          });
        }else {
        if(!localStorage.getItem("Massary-userId")){

          firstStart(theData);
        }
      }
      });
    });
  });
}

function firstStart(theData) {
  setTimeout(()=>{
    document.getElementById("music-2").play();
  },4000)
  let firstPage = document.createElement("div");
  firstPage.className = "first-page";
  document.body.appendChild(firstPage);
  let popUp = document.createElement("div");
  popUp.className = "popUp";
  popUp.classList.add("first");

  firstPage.appendChild(popUp);

  let title = document.createElement("h4");
  title.textContent = theData["texts"]["first-1"]["title"];
  popUp.appendChild(title);
  let des = document.createElement("p");
  des.className = "des";
  des.innerHTML = theData["texts"]["first-1"]["content"];
  popUp.appendChild(des);
  let img = document.createElement("img");
  img.className = "img";
  img.src = "../Images/first-1.webp";
  popUp.appendChild(img);
  let next = document.createElement("span");
  next.className = "next";
  next.classList.add("btn");
  next.textContent = theData["texts"]["support-next"];
  popUp.appendChild(next);
  next.addEventListener("click", () => {
    popUp.classList.add("out");
    setTimeout(() => {
      popUp.remove();
      let popUp2 = document.createElement("div");
      popUp2.className = "popUp";
      popUp2.classList.add("first");

      firstPage.appendChild(popUp2);

      let title2 = document.createElement("h4");
      title2.textContent = theData["texts"]["first-2"]["title"];
      popUp2.appendChild(title2);
      let des2 = document.createElement("p");
      des2.className = "des";
      des2.innerHTML = theData["texts"]["first-2"]["content"];
      popUp2.appendChild(des2);
      let img2 = document.createElement("img");
      img2.className = "img";
      img2.src = "../Images/first-2.webp";
      popUp2.appendChild(img2);
      let next2 = document.createElement("span");
      next2.className = "next";
      next2.classList.add("btn");
      next2.textContent = theData["texts"]["support-next"];
      popUp2.appendChild(next2);
      next2.addEventListener("click", () => {
        popUp2.classList.add("out");
        setTimeout(() => {
          popUp2.remove();
          let popUp3 = document.createElement("div");
          popUp3.className = "popUp";
          popUp3.classList.add("first");

          firstPage.appendChild(popUp3);

          let title3 = document.createElement("h4");
          title3.textContent = theData["texts"]["first-3"]["title"];
          popUp3.appendChild(title3);
          let des3 = document.createElement("p");
          des3.className = "des";
          des3.innerHTML = theData["texts"]["first-3"]["content"];
          popUp3.appendChild(des3);
          let img3 = document.createElement("img");
          img3.className = "img";
          img3.src = "../Images/first-3.webp";
          popUp3.appendChild(img3);
          let next3 = document.createElement("span");
          next3.className = "next";
          next3.classList.add("btn");
          next3.textContent = theData["texts"]["support-next"];
          popUp3.appendChild(next3);
          next3.addEventListener("click", () => {
            popUp3.classList.add("out");
            setTimeout(() => {
              popUp3.remove();
              let popUp4 = document.createElement("div");
              popUp4.className = "popUp";
              popUp4.classList.add("first");

              firstPage.appendChild(popUp4);

              let title4 = document.createElement("h4");
              title4.textContent = theData["texts"]["first-4"]["title"];
              popUp4.appendChild(title4);
              let des4 = document.createElement("p");
              des4.className = "des";
              des4.innerHTML = theData["texts"]["first-4"]["content"];
              popUp4.appendChild(des4);
              let img4 = document.createElement("img");
              img4.className = "img";
              img4.src = "../Images/first-4.webp";
              popUp4.appendChild(img4);
              let next4 = document.createElement("span");
              next4.className = "next";
              next4.classList.add("btn");
              next4.textContent = theData["texts"]["support-next"];
              popUp4.appendChild(next4);
              next4.addEventListener("click", () => {
                popUp4.classList.add("out");
                setTimeout(() => {
                  popUp4.remove();
                  let popUp5 = document.createElement("div");
                  popUp5.className = "popUp";
                  popUp5.classList.add("user-data");
                  firstPage.appendChild(popUp5);
                  let title = document.createElement("h4");
                  title.textContent = theData["texts"]["first-5"]["title"];
                  popUp5.appendChild(title);
                  let nameInputs = document.createElement("div");
                  nameInputs.className = "names";
                  popUp5.appendChild(nameInputs);
                  let firstName = document.createElement("div");
                  firstName.className = "first-name";
                  nameInputs.appendChild(firstName);
                  let firstNameLabel = document.createElement("label");
                  firstNameLabel.textContent =
                    theData["texts"]["first-5"]["inputs"]["name-1-label"];
                  firstName.appendChild(firstNameLabel);

                  let firstNameInput = document.createElement("input");
                  firstNameInput.placeholder =
                    theData["texts"]["first-5"]["inputs"]["name-1-placeholder"];
                  firstName.appendChild(firstNameInput);

                  let secondName = document.createElement("div");
                  secondName.className = "second-name";
                  nameInputs.appendChild(secondName);

                  let secondNameLabel = document.createElement("label");
                  secondNameLabel.textContent =
                    theData["texts"]["first-5"]["inputs"]["name-2-label"];
                  secondName.appendChild(secondNameLabel);

                  let secondNameInput = document.createElement("input");
                  secondNameInput.placeholder =
                    theData["texts"]["first-5"]["inputs"]["name-2-placeholder"];
                  secondName.appendChild(secondNameInput);

                  let age = document.createElement("div");
                  age.className = "age";
                  popUp5.appendChild(age);

                  let ageLabel = document.createElement("label");
                  ageLabel.textContent =
                    theData["texts"]["first-5"]["inputs"]["age-label"];

                  age.appendChild(ageLabel);

                  let ageInput = document.createElement("input");
                  ageInput.placeholder =
                    theData["texts"]["first-5"]["inputs"]["age-placeholder"];
                  age.appendChild(ageInput);

                  let city = document.createElement("div");
                  city.className = "city";
                  popUp5.appendChild(city);

                  let cityLabel = document.createElement("label");
                  cityLabel.textContent =
                    theData["texts"]["first-5"]["inputs"]["city-label"];
                  city.appendChild(cityLabel);

                  let cityInput = document.createElement("input");
                  cityInput.placeholder =
                    theData["texts"]["first-5"]["inputs"]["city-placeholder"];
                  city.appendChild(cityInput);

                  let next5 = document.createElement("span");
                  next5.className = "next";
                  next5.classList.add("btn");
                  next5.textContent = theData["texts"]["support-next"];
                  popUp5.appendChild(next5);
                  next5.addEventListener("click", () => {
                    if (firstNameInput.value === "" || secondNameInput.value === "") {
                      document.getElementById("error").play();
                      let wrong = document.createElement("div");
                      wrong.className = "wrong";
                      wrong.textContent =
                        theData["texts"]["first-5"]["inputs"]["wrong"];
                      if (!document.querySelector(".wrong")) {
                        popUp5.appendChild(wrong);
                      } 
                    }else {
                        
                        localStorage.setItem("Massary-userId" , `MSR-${Date.now()}-${Math.floor(Math.random() * 10000)}`)
                        localStorage.setItem("Massary-userName" , firstNameInput.value)
                        localStorage.setItem("Massary-userSecondName" , secondNameInput.value)
                        localStorage.setItem("Massary-userAge" , ageInput.value)
                        localStorage.setItem("Massary-userCity" , cityInput.value)
                        sendUserDataWithDevice(`${firstNameInput.value} ${secondNameInput.value}` , ageInput.value , cityInput.value)
                      }
                  });
                }, 250);
              });
            }, 250);
          });
        }, 250);
      });
    }, 250);
  });
}

export function chooseLang(){
  let langBox = document.createElement("div")
  langBox.className = "lang-box"
  document.body.appendChild(langBox)
  let ar = document.createElement("div")
  ar.className = "ar"
  ar.textContent = "العربية"
  langBox.appendChild(ar)
  ar.addEventListener("click" , ()=>{
    localStorage.setItem("Massary-lang" , 'ar')
    localStorage.setItem("Massary-cust-lang" , 'on')
    window.location.reload()
  })


  let en = document.createElement("div")
  en.className = "en"
  en.textContent = "English"
  langBox.appendChild(en)
  en.addEventListener("click" , ()=>{
    localStorage.setItem("Massary-lang" , 'en')
    localStorage.setItem("Massary-cust-lang" , 'off')
    window.location.reload()
  })
}


