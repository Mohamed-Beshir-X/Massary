export function dreamRemover() {
  localStorage.removeItem("Massary-tempDreamTitle");
  localStorage.removeItem("Massary-tempDreamDes");
  localStorage.removeItem("Massary-tempF1");
  localStorage.removeItem("Massary-tempF2");
  localStorage.removeItem("Massary-tempF3");
  localStorage.removeItem("Massary-tempDreamDate");
}
export function addDream(theData) {
  let add = document.querySelector(".body-container .dream .add");
  add.addEventListener("click", () => {
    let box = document.createElement("div");
    let layer = document.createElement("div");
    layer.className = "layer";
    box.className = "dream-box";
    document.body.appendChild(layer);
    document.body.appendChild(box);
    let theTitle = document.createElement("h3");

    theTitle.textContent = theData['texts']["dream-head"];
    box.appendChild(theTitle);
    let boxTitle = document.createElement("input");
    boxTitle.placeholder = theData['texts']["dream-title"];
    box.appendChild(boxTitle);

    let des = document.createElement("textarea");
    des.placeholder =
      theData['texts']["dream-des"]
    box.appendChild(des);

    let filter1 = document.createElement("div");
    filter1.className = "type";
    box.appendChild(filter1);
    let spanOne1 = document.createElement("span");
    spanOne1.dataset.type = "Educational";
    spanOne1.textContent = theData['texts']["dream-type-1-edu"];
    filter1.appendChild(spanOne1);

    let spanOne2 = document.createElement("span");
    spanOne2.dataset.type = "Career";
    spanOne2.textContent = theData['texts']["dream-type-1-car"];
    filter1.appendChild(spanOne2);

    let spanOne3 = document.createElement("span");
    spanOne3.dataset.type = "Financial";
    spanOne3.textContent = theData['texts']["dream-type-1-fin"];
    filter1.appendChild(spanOne3);

    let spanOne4 = document.createElement("span");
    spanOne4.dataset.type = "Self-Development";
    spanOne4.textContent = theData['texts']["dream-type-1-self"];
    filter1.appendChild(spanOne4);

    let spanOne5 = document.createElement("span");
    spanOne5.dataset.type = "Social / Impact";
    spanOne5.textContent = theData['texts']["dream-type-1-soc"];
    filter1.appendChild(spanOne5);

    let spanOne6 = document.createElement("span");
    spanOne6.dataset.type = "Spiritual";
    spanOne6.textContent = theData['texts']["dream-type-1-sprc"];
    filter1.appendChild(spanOne6);

    let spanOne7 = document.createElement("span");
    spanOne7.dataset.type = "Other";
    spanOne7.textContent = theData['texts']["dream-type-1-other"];
    filter1.appendChild(spanOne7);

    let filter2 = document.createElement("div");
    filter2.className = "time";
    box.appendChild(filter2);

    let spanTwo1 = document.createElement("span");
    spanTwo1.dataset.type = "Short-term";
    spanTwo1.textContent = theData['texts']["dream-type-2-shr"];
    filter2.appendChild(spanTwo1);

    let spanTwo2 = document.createElement("span");
    spanTwo2.dataset.type = "Medium-term";
    spanTwo2.textContent = theData['texts']["dream-type-2-mid"];
    filter2.appendChild(spanTwo2);

    let spanTwo3 = document.createElement("span");
    spanTwo3.dataset.type = "Long-term";
    spanTwo3.textContent = theData['texts']["dream-type-2-long"];
    filter2.appendChild(spanTwo3);

    let filter3 = document.createElement("div");
    filter3.className = "clearly";
    box.appendChild(filter3);

    let spanThree1 = document.createElement("span");
    spanThree1.dataset.type = "Blurry";
    spanThree1.textContent = theData['texts']["dream-type-3-shr"];
    filter3.appendChild(spanThree1);

    let spanThree2 = document.createElement("span");
    spanThree2.dataset.type = "Partially Clear";
    spanThree2.textContent = theData['texts']["dream-type-3-mid"];
    filter3.appendChild(spanThree2);

    let spanThree3 = document.createElement("span");
    spanThree3.dataset.type = "Very Clear";
    spanThree3.textContent = theData['texts']["dream-type-3-clear"];
    filter3.appendChild(spanThree3);

    let date = document.createElement("div");
    date.className = "date";
    box.appendChild(date);

    let close = document.createElement("i");
    close.className = "close";
    close.classList.add("fas");
    close.classList.add("fa-close");
    close.addEventListener("click", () => {
      localStorage.removeItem("Massary-tempDreamTitle");
      localStorage.removeItem("Massary-tempDreamDes");
      localStorage.removeItem("Massary-tempF1");
      localStorage.removeItem("Massary-tempF2");
      localStorage.removeItem("Massary-tempF3");
      localStorage.removeItem("Massary-tempDreamDate");
      box.classList.add("out");
      layer.remove();
      setTimeout(() => {
        box.remove();
      }, 250);
    });
    custumizeFilters();
    box.appendChild(close);
    let addPlant = document.createElement("div");
    addPlant.className = "ok";
    addPlant.textContent = theData["texts"]["dream-button"];
    box.appendChild(addPlant);
    document.getElementById("pop").play();
    addPlant.addEventListener("click", () => {
      if (
        boxTitle.value != "" &&
        des.value != "" &&
        localStorage.getItem("Massary-tempF1") &&
        localStorage.getItem("Massary-tempF2") &&
        localStorage.getItem("Massary-tempF3")
      ) {
        localStorage.setItem("Massary-tempDreamTitle", boxTitle.value);
        localStorage.setItem("Massary-tempDreamDes", des.value);
        createAdream(theData);
        document.getElementById("plant").play();
        setTimeout(() => {
          box.remove();
        });
        layer.remove();
        box.classList.add("out");
        saveDream();
      } else {
        if (boxTitle.value === "") {
          if (document.querySelector(".wrong.title")) {
            document.querySelector(".wrong.title").remove();
          }
          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("title");
          wrong.textContent = theData["texts"]["dream-error-title"];
          box.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.title")) {
            document.querySelector(".wrong.title").remove();
          }
        }
        if (des.value === "") {
          if (document.querySelector(".wrong.des")) {
            document.querySelector(".wrong.des").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("des");

          wrong.textContent = theData["texts"]["dream-error-des"];
          box.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.des")) {
            document.querySelector(".wrong.des").remove();
          }
        }
        if (!localStorage.getItem("Massary-tempF1")) {
          if (document.querySelector(".wrong.f1")) {
            document.querySelector(".wrong.f1").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("f1");

          wrong.textContent = theData["texts"]["dream-error-type1"];
          box.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.f1")) {
            document.querySelector(".wrong.f1").remove();
          }
        }
        if (!localStorage.getItem("Massary-tempF2")) {
          if (document.querySelector(".wrong.f2")) {
            document.querySelector(".wrong.f2").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("f2");

          wrong.textContent = theData["texts"]["dream-error-type2"];
          box.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.f2")) {
            document.querySelector(".wrong.f2").remove();
          }
        }
        if (!localStorage.getItem("Massary-tempF3")) {
          if (document.querySelector(".wrong.f3")) {
            document.querySelector(".wrong.f3").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("f3");

          wrong.textContent = theData["texts"]["dream-error-type3"];
          box.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.f3")) {
            document.querySelector(".wrong.f3").remove();
          }
        }
        document.getElementById("error").play();
      }
      clickOnDreamBoxAndEdit(theData);
    });
  });
}
export function custumizeFilters(theData) {
  let filter1 = Array.from(document.querySelectorAll(".dream-box .type span"));
  filter1.forEach((e) => {
    console.log(e);
    e.addEventListener("click", () => {
      for (let i = 0; i < filter1.length; i++) {
        filter1[i].classList.remove("active");
      }
      e.classList.add("active");
      localStorage.setItem("Massary-tempF1", e.textContent);
    });
  });
  let filter2 = Array.from(document.querySelectorAll(".dream-box .time span"));

  filter2.forEach((e) => {
    e.addEventListener("click", () => {
      for (let i = 0; i < filter2.length; i++) {
        filter2[i].classList.remove("active");
      }
      e.classList.add("active");
      localStorage.setItem("Massary-tempF2", e.textContent);
    });
  });
  let filter3 = Array.from(
    document.querySelectorAll(".dream-box .clearly span")
  );
  console.log(filter3);
  filter3.forEach((e) => {
    console.log(e);
    e.addEventListener("click", () => {
      for (let i = 0; i < filter3.length; i++) {
        filter3[i].classList.remove("active");
      }
      e.classList.add("active");
      localStorage.setItem("Massary-tempF3", e.textContent);
    });
  });
}
export function createAdream(theData) {
  let dreamBox = document.createElement("div");
  dreamBox.className = "box-small";
  document
    .querySelector(".body-container .dream .container")
    .appendChild(dreamBox);
  let title = document.createElement("h4");
  title.className = "box-small-title";
  title.id = `Massary-dream${
    Array.from(document.querySelectorAll(".body-container .dream .box-small"))
      .length
  }`;
  title.textContent = localStorage.getItem("Massary-tempDreamTitle");

  dreamBox.appendChild(title);
  let des = document.createElement("p");
  des.className = "box-small-des";
  des.id = `Massary-dream${
    Array.from(document.querySelectorAll(".body-container .dream .box-small"))
      .length
  }`;
  des.textContent = localStorage.getItem("Massary-tempDreamDes");

  dreamBox.appendChild(des);
  let filters = document.createElement("div");
  filters.className = "filters";
  filters.classList.add("box-small-filters");
  dreamBox.appendChild(filters);
  let f1 = document.createElement("span");
  f1.textContent = localStorage.getItem("Massary-tempF1");

  filters.appendChild(f1);
  let f2 = document.createElement("span");
  f2.textContent = localStorage.getItem("Massary-tempF2");

  filters.appendChild(f2);
  let f3 = document.createElement("span");
  f3.textContent = localStorage.getItem("Massary-tempF3");

  filters.appendChild(f3);
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = document.createElement("div");
  date.className = "date";
  date.textContent = `${day}/${month}/${year}`;
  localStorage.setItem("Massary-tempDreamDate", date.textContent);
  dreamBox.appendChild(date);
  dreamBox.id = `Massary-dream${
    Array.from(document.querySelectorAll(".body-container .dream .box-small"))
      .length
  }`;
  let confgBox = document.createElement("div");
  confgBox.className = "confg";
  dreamBox.appendChild(confgBox);
  let edit = document.createElement("i");
  edit.className = "edit";
  edit.classList.add("fas");
  edit.classList.add("fa-edit");
  edit.classList.add("box-smal-edit");
  edit.addEventListener("click", () => {
    let dream = JSON.parse(localStorage.getItem(dreamBox.id));
    let popUp = document.createElement("div");
    popUp.className = "dream-box";
    popUp.id = dreamBox.id;
    let layer = document.createElement("div");
    layer.className = "layer";
    document.body.appendChild(popUp);
    document.body.appendChild(layer);
    let title = document.createElement("h3");
    title.textContent = theData["texts"]["dream-head-edit"];
    popUp.appendChild(title);
    let dreamName = document.createElement("input");
    dreamName.value = dream.titel;
    dreamName.placeholder = theData['texts']["dream-title"];
    popUp.appendChild(dreamName);
    let des = document.createElement("textarea");
    des.value = dream.des;
    des.placeholder =
      theData['texts']["dream-des"]
    popUp.appendChild(des);
    let filter1 = document.createElement("div");
    filter1.className = "type";
    popUp.appendChild(filter1);
    let spanOne1 = document.createElement("span");
    spanOne1.dataset.type = "Educational";
    spanOne1.textContent = theData['texts']["dream-type-1-edu"];
    if (dream.f1 === spanOne1.textContent) {
      localStorage.setItem("Massary-tempF1", spanOne1.textContent);
      spanOne1.classList.add("active");
    }
    filter1.appendChild(spanOne1);

    let spanOne2 = document.createElement("span");
    spanOne2.dataset.type = "Career";
    spanOne2.textContent = theData['texts']["dream-type-1-car"];
    if (dream.f1 === spanOne2.textContent) {
      spanOne2.classList.add("active");
      localStorage.setItem("Massary-tempF1", spanOne2.textContent);
    }
    filter1.appendChild(spanOne2);

    let spanOne3 = document.createElement("span");
    spanOne3.dataset.type = "Financial";
    spanOne3.textContent = theData['texts']["dream-type-1-fin"];
    if (dream.f1 === spanOne3.textContent) {
      spanOne3.classList.add("active");
      localStorage.setItem("Massary-tempF1", spanOne3.textContent);
    }
    filter1.appendChild(spanOne3);

    let spanOne4 = document.createElement("span");
    spanOne4.dataset.type = "Self-Development";
    spanOne4.textContent = theData['texts']["dream-type-1-self"];
    if (dream.f1 === spanOne4.textContent) {
      spanOne4.classList.add("active");
      localStorage.setItem("Massary-tempF1", spanOne4.textContent);
    }
    filter1.appendChild(spanOne4);

    let spanOne5 = document.createElement("span");
    spanOne5.dataset.type = "Social / Impact";
    spanOne5.textContent = theData['texts']["dream-type-1-soc"];
    if (dream.f1 === spanOne5.textContent) {
      spanOne5.classList.add("active");
      localStorage.setItem("Massary-tempF1", spanOne5.textContent);
    }
    filter1.appendChild(spanOne5);

    let spanOne6 = document.createElement("span");
    spanOne6.dataset.type = "Spiritual";
    spanOne6.textContent = theData['texts']["dream-type-1-sprc"];
    if (dream.f1 === spanOne6.textContent) {
      spanOne6.classList.add("active");
      localStorage.setItem("Massary-tempF1", spanOne6.textContent);
    }
    filter1.appendChild(spanOne6);

    let spanOne7 = document.createElement("span");
    spanOne7.dataset.type = "Other";
    spanOne7.textContent = theData['texts']["dream-type-1-other"];
    if (dream.f1 === spanOne7.textContent) {
      spanOne7.classList.add("active");
      localStorage.setItem("Massary-tempF1", spanOne7.textContent);
    }
    filter1.appendChild(spanOne7);

    let filter2 = document.createElement("div");
    filter2.className = "time";
    popUp.appendChild(filter2);

    let spanTwo1 = document.createElement("span");
    spanTwo1.dataset.type = "Short-term";
    spanTwo1.textContent = theData['texts']["dream-type-2-shr"];
    if (dream.f2 === spanTwo1.textContent) {
      spanTwo1.classList.add("active");
      localStorage.setItem("Massary-tempF2", spanTwo1.textContent);
    }
    filter2.appendChild(spanTwo1);

    let spanTwo2 = document.createElement("span");
    spanTwo2.dataset.type = "Medium-term";
    spanTwo2.textContent = theData['texts']["dream-type-2-mid"];
    if (dream.f2 === spanTwo2.textContent) {
      spanTwo2.classList.add("active");
      localStorage.setItem("Massary-tempF2", spanTwo2.textContent);
    }
    filter2.appendChild(spanTwo2);

    let spanTwo3 = document.createElement("span");
    spanTwo3.dataset.type = "Long-term";
    spanTwo3.textContent = theData['texts']["dream-type-2-long"];
    if (dream.f2 === spanTwo3.textContent) {
      spanTwo3.classList.add("active");
      localStorage.setItem("Massary-tempF2", spanTwo3.textContent);
    }
    filter2.appendChild(spanTwo3);

    let filter3 = document.createElement("div");
    filter3.className = "clearly";
    popUp.appendChild(filter3);

    let spanThree1 = document.createElement("span");
    spanThree1.dataset.type = "Blurry";
    spanThree1.textContent = theData['texts']["dream-type-3-shr"];
    if (dream.f3 === spanThree1.textContent) {
      spanThree1.classList.add("active");
      localStorage.setItem("Massary-tempF3", spanThree1.textContent);
    }
    filter3.appendChild(spanThree1);

    let spanThree2 = document.createElement("span");
    spanThree2.dataset.type = "Partially Clear";
    spanThree2.textContent = theData['texts']["dream-type-3-mid"];
    if (dream.f3 === spanThree2.textContent) {
      spanThree2.classList.add("active");
      localStorage.setItem("Massary-tempF3", spanThree2.textContent);
    }
    filter3.appendChild(spanThree2);

    let spanThree3 = document.createElement("span");
    spanThree3.dataset.type = "Very Clear";
    spanThree3.textContent = theData['texts']["dream-type-3-clear"];
    if (dream.f3 === spanThree3.textContent) {
      spanThree3.classList.add("active");
      localStorage.setItem("Massary-tempF3", spanThree3.textContent);
    }
    filter3.appendChild(spanThree3);
    custumizeFilters();
    let close = document.createElement("i");
    close.className = "close";
    close.classList.add("fas");
    close.classList.add("fa-close");
    document.getElementById("pop").play();
    close.addEventListener("click", () => {
      localStorage.removeItem("Massary-tempDreamTitle");
      localStorage.removeItem("Massary-tempDreamDes");
      localStorage.removeItem("Massary-tempF1");
      localStorage.removeItem("Massary-tempF2");
      localStorage.removeItem("Massary-tempF3");

      popUp.classList.add("out");
      layer.remove();
      setTimeout(() => {
        popUp.remove();
      }, 250);
    });
    custumizeFilters();
    popUp.appendChild(close);
    let addPlant = document.createElement("div");
    addPlant.className = "ok";
    addPlant.textContent = theData["texts"]["dream-button"];
    popUp.appendChild(addPlant);
    addPlant.addEventListener("click", () => {
      if (dreamName.value != "" && des.value != "") {
        document.querySelector(`#${dreamBox.id} h4`).textContent =
          dreamName.value;
        document.querySelector(`#${dreamBox.id} p`).textContent = des.value;
        dream.titel = dreamName.value;
        dream.des = des.value;
        dream.f1 = localStorage.getItem("Massary-tempF1");
        dream.f2 = localStorage.getItem("Massary-tempF2");
        dream.f3 = localStorage.getItem("Massary-tempF3");
        let filtersArray = Array.from(
          document.querySelectorAll(
            `.body-container #${dreamBox.id} .filters span`
          )
        );
        for (let i = 0; i < filtersArray.length; i++) {
          filtersArray[i].textContent = localStorage.getItem(
            `Massary-tempF${i + 1}`
          );
          console.log(filtersArray[i]);
          console.log(localStorage.getItem(`Massary-tempF${i + 1}`));
        }
        localStorage.removeItem("Massary-tempF1");
        localStorage.removeItem("Massary-tempF2");
        localStorage.removeItem("Massary-tempF3");
        localStorage.setItem(dreamBox.id, JSON.stringify(dream));

        setTimeout(() => {
          popUp.remove();
        });
        layer.remove();
        popUp.classList.add("out");
      } else {
        if (dreamName.value === "") {
          if (document.querySelector(".wrong.title")) {
            document.querySelector(".wrong.title").remove();
          }
          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("title");
          wrong.textContent = theData["texts"]["dream-error-title"];
          popUp.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.title")) {
            document.querySelector(".wrong.title").remove();
          }
        }
        if (des.value === "") {
          if (document.querySelector(".wrong.des")) {
            document.querySelector(".wrong.des").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("des");

          wrong.textContent = theData["texts"]["dream-error-des"];
          popUp.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.des")) {
            document.querySelector(".wrong.des").remove();
          }
        }
        if (!localStorage.getItem("Massary-tempF1")) {
          if (document.querySelector(".wrong.f1")) {
            document.querySelector(".wrong.f1").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("f1");

          wrong.textContent = theData["texts"]["dream-error-type1"];
          popUp.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.f1")) {
            document.querySelector(".wrong.f1").remove();
          }
        }
        if (!localStorage.getItem("Massary-tempF2")) {
          if (document.querySelector(".wrong.f2")) {
            document.querySelector(".wrong.f2").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("f2");

          wrong.textContent = theData["texts"]["dream-error-type2"];
          popUp.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.f2")) {
            document.querySelector(".wrong.f2").remove();
          }
        }
        if (!localStorage.getItem("Massary-tempF3")) {
          if (document.querySelector(".wrong.f3")) {
            document.querySelector(".wrong.f3").remove();
          }

          let wrong = document.createElement("span");
          wrong.className = "wrong";
          wrong.classList.add("f3");

          wrong.textContent = theData["texts"]["dream-error-type3"];
          popUp.appendChild(wrong);
        } else {
          if (document.querySelector(".wrong.f3")) {
            document.querySelector(".wrong.f3").remove();
          }
        }
      }
    });
  });
  confgBox.appendChild(edit);

  let del = document.createElement("i");
  del.className = "delete";
  del.classList.add("fas");
  del.classList.add("fa-trash");
  confgBox.appendChild(del);
  del.addEventListener("click", () => {
    let popUp = document.createElement("div");
    popUp.className = "popUp";
    popUp.classList.add("delete-dream")
    document.body.appendChild(popUp);
    let layer = document.createElement("div");
    layer.className = "layer";
    document.body.appendChild(layer);
    let titlee = document.createElement("h4");
    titlee.textContent = theData['texts']["dream-del-head"]
    
    popUp.appendChild(titlee);
    let des = document.createElement("p");
    des.className = "des";
    des.textContent = theData['texts']["dream-del"];
    let temp =des.textContent.replace("DREAM" , title.textContent)
    des.textContent = temp
    popUp.appendChild(des);
    let ok = document.createElement("span");
    ok.className = "ok";
    ok.textContent = theData['texts']["dream-del-btn"]
    popUp.appendChild(ok);
    let close = document.createElement("i");
    close.className = "close";
    close.classList.add("fas");
    close.classList.add("fa-close");
    popUp.appendChild(close);
    document.getElementById("info").play();
    close.addEventListener("click", () => {
      popUp.classList.add("out");
      layer.remove();
      setTimeout(() => {
        popUp.remove();
      }, 250);
    });
    ok.addEventListener("click", () => {
      let number =
        Array.from(
          document.querySelectorAll(
            ".body-container .dream .container .box-small"
          )
        ).indexOf(dreamBox) + 1;
      localStorage.setItem(
        `del-Massary-dream${number}`,
        `Massary-dream${number}`
      );
      dreamBox.classList.add("hidden");
      popUp.classList.add("out");
      layer.remove();
      setTimeout(() => {
        popUp.remove();
      }, 250);
      emptyNursery();
    });
    let img = document.createElement("img");
    img.src = "Images/thinking2.webp";
    img.className = "remove";
    popUp.appendChild(img);

    clickOnDreamBoxAndEdit(theData);
  });
  clickOnDreamBoxAndEdit(theData);
  if (document.querySelector(".body-container .dream .container .empty")) {
    document.querySelector(".body-container .dream .container .empty").remove();
  }
}
export function saveDream(theData) {
  let dream = {
    titel: localStorage.getItem("Massary-tempDreamTitle"),
    des: localStorage.getItem("Massary-tempDreamDes"),
    f1: localStorage.getItem("Massary-tempF1"),
    f2: localStorage.getItem("Massary-tempF2"),
    f3: localStorage.getItem("Massary-tempF3"),
    date: localStorage.getItem("Massary-tempDreamDate"),
  };
  let container = Array.from(
    document.querySelectorAll(".body-container .dream .container .box-small")
  );
  let dreamStorageArray = []
  for(let i =0 ; i<localStorage.length; i++){
    if(localStorage.key(i).slice(0, 13) === "Massary-dream"){
      dreamStorageArray.push(localStorage.key(i))
    }
  }
  localStorage.setItem(
    `Massary-dream${dreamStorageArray.length + 1}`,
    JSON.stringify(dream)
  );

  localStorage.removeItem("Massary-tempDreamTitle");
  localStorage.removeItem("Massary-tempDreamDes");
  localStorage.removeItem("Massary-tempF1");
  localStorage.removeItem("Massary-tempF2");
  localStorage.removeItem("Massary-tempF3");
  localStorage.removeItem("Massary-tempDreamDate");
  clickOnDreamBoxAndEdit(theData);
}
export function returnDream(theData) {
  let list = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).slice(0, 13) === "Massary-dream") {
      list.push(localStorage.key(i));
    }
  }
  list.sort();
  for (let i = 0; i < list.length; i++) {
    let dream = JSON.parse(localStorage.getItem(list[i]));
    let dreamBox = document.createElement("div");
    dreamBox.className = "box-small";
    document
      .querySelector(".body-container .dream .container")
      .appendChild(dreamBox);
    let title = document.createElement("h4");
    title.className = "box-small-title";

    title.textContent = dream.titel;
    dreamBox.id = list[i];
    dreamBox.appendChild(title);
    let des = document.createElement("p");
    des.textContent = dream.des;
    des.className = "box-small-des";
    des.id = `Massary-dream${
      Array.from(document.querySelectorAll(".body-container .dream .box-small"))
        .length
    }`;

    dreamBox.appendChild(des);
    let filters = document.createElement("div");
    filters.className = "filters";
    filters.classList.add("box-small-filters");
    dreamBox.appendChild(filters);
    let f1 = document.createElement("span");
    f1.textContent = dream.f1;

    filters.appendChild(f1);
    let f2 = document.createElement("span");
    f2.textContent = dream.f2;

    filters.appendChild(f2);
    let f3 = document.createElement("span");
    f3.textContent = dream.f3;

    filters.appendChild(f3);
    let date = document.createElement("div");
    date.className = "date";
    date.textContent = dream.date;
    dreamBox.appendChild(date);

    let confgBox = document.createElement("div");
    confgBox.className = "confg";
    dreamBox.appendChild(confgBox);
    let edit = document.createElement("i");
    edit.className = "edit";
    edit.classList.add("fas");
    edit.classList.add("fa-edit");
    edit.classList.add("box-small-edit");

    confgBox.appendChild(edit);

    let del = document.createElement("i");

    del.className = "delete";
    del.classList.add("fas");
    del.classList.add("fa-trash");
    confgBox.appendChild(del);
    del.addEventListener("click", () => {
      document.getElementById("info").play();
      let popUp = document.createElement("div");
      popUp.className = "popUp";
      popUp.classList.add("delete-dream")
      document.body.appendChild(popUp);
      let layer = document.createElement("div");
      layer.className = "layer";
      document.body.appendChild(layer);
      let title = document.createElement("h4");
      title.textContent = theData['texts']["dream-del-head"]
      popUp.appendChild(title);
      let des = document.createElement("p");
      des.className = "des";
      des.textContent = theData['texts']["dream-del"];
    let temp =des.textContent.replace("DREAM" , dream.titel)
    des.textContent = temp
      popUp.appendChild(des);
      let ok = document.createElement("span");
      ok.className = "ok";
      ok.textContent = theData['texts']["dream-del-btn"]
      popUp.appendChild(ok);
      let close = document.createElement("i");
      close.className = "close";
      close.classList.add("fas");
      close.classList.add("fa-close");
      popUp.appendChild(close);
      close.addEventListener("click", () => {
        popUp.classList.add("out");
        layer.remove();
        setTimeout(() => {
          popUp.remove();
        }, 250);
      });
      ok.addEventListener("click", () => {
        localStorage.setItem(`del-${list[i]}`, list[i]);
        dreamBox.classList.add("hidden");
        dreamBox.remove();
        popUp.classList.add("out");
        layer.remove();
        setTimeout(() => {
          popUp.remove();
        }, 250);
      });
      let img = document.createElement("img");
      img.src = "Images/thinking2.webp";
      img.className = "remove";
      popUp.appendChild(img);
    });
    let delList = [];
    for (let k = 0; k < localStorage.length; k++) {
      if (localStorage.key(k).slice(0, 3) === "del") {
        delList.push(localStorage.key(k));
      }
    }
    for (let l = 0; l < delList.length; l++) {
      if (list[i] === delList[l].slice(4)) {
        dreamBox.classList.add("hidden");
      }
    }
    title.id = `Massary-dream${
      Array.from(document.querySelectorAll(".body-container .dream .box-small"))
        .length
    }`;
  }
}

export function clickOnDreamBoxAndEdit(theData) {
  window.onclick = function (e) {
    let dream = "";
    if (
      e.target.classList.contains("box-small") ||
      e.target.classList.contains("box-small-des") ||
      e.target.classList.contains("box-small-title")
    ) {
      if (e.target.classList.contains("box-small")) {
        dream = JSON.parse(localStorage.getItem(e.target.id));
      } else {
        dream = JSON.parse(localStorage.getItem(e.target.parentElement.id));
      }
      let popUp = document.createElement("div");
      popUp.className = "box-small";
      popUp.classList.add("preview");
      let layer = document.createElement("div");
      layer.className = "layer";
      document.body.appendChild(layer);
      document.body.appendChild(popUp);
      let title = document.createElement("h4");
      title.textContent = dream.titel;
      popUp.appendChild(title);
      let des = document.createElement("p");
      des.className = "des";
      des.textContent = dream.des;
      popUp.appendChild(des);
      let filters = document.createElement("div");
      filters.className = "filters";
      popUp.appendChild(filters);
      let f1 = document.createElement("span");
      f1.textContent = dream.f1;
      filters.appendChild(f1);
      let f2 = document.createElement("span");
      f2.textContent = dream.f2;
      filters.appendChild(f2);
      let f3 = document.createElement("span");
      f3.textContent = dream.f3;
      filters.appendChild(f3);
      let date = document.createElement("div");
      date.className = "date";
      date.textContent = dream.date;
      popUp.appendChild(date);
      let close = document.createElement("i");
      close.className = "close";
      close.classList.add("fas");
      close.classList.add("fa-close");
      document.getElementById("pop").play();
      close.addEventListener("click", () => {
        popUp.classList.add("out");
        layer.remove();
        setTimeout(() => {
          popUp.remove();
        }, 250);
      });
      popUp.appendChild(close);
    }
    if (e.target.classList.contains("box-small-edit")) {
      let dream = JSON.parse(
        localStorage.getItem(e.target.parentElement.parentElement.id)
      );
      let popUp = document.createElement("div");
      popUp.className = "dream-box";
      popUp.id = e.target.parentElement.parentElement.id;
      let layer = document.createElement("div");
      layer.className = "layer";
      document.body.appendChild(popUp);
      document.body.appendChild(layer);
      let title = document.createElement("h3");
      title.textContent = theData["texts"]["dream-head-edit"];
      popUp.appendChild(title);
      let dreamName = document.createElement("input");
      dreamName.value = dream.titel;
      dreamName.placeholder = theData['texts']["dream-title"];
      popUp.appendChild(dreamName);
      let des = document.createElement("textarea");
      des.value = dream.des;
      des.placeholder =
        theData['texts']["dream-des"]
      popUp.appendChild(des);
      let filter1 = document.createElement("div");
      filter1.className = "type";
      popUp.appendChild(filter1);
      let spanOne1 = document.createElement("span");
      spanOne1.dataset.type = "Educational";
      spanOne1.textContent = theData['texts']["dream-type-1-edu"];
      if (dream.f1 === spanOne1.textContent) {
        localStorage.setItem("Massary-tempF1", spanOne1.textContent);
        spanOne1.classList.add("active");
      }
      filter1.appendChild(spanOne1);

      let spanOne2 = document.createElement("span");
      spanOne2.dataset.type = "Career";
      spanOne2.textContent = theData['texts']["dream-type-1-car"];
      if (dream.f1 === spanOne2.textContent) {
        spanOne2.classList.add("active");
        localStorage.setItem("Massary-tempF1", spanOne2.textContent);
      }
      filter1.appendChild(spanOne2);

      let spanOne3 = document.createElement("span");
      spanOne3.dataset.type = "Financial";
      spanOne3.textContent = theData['texts']["dream-type-1-fin"];
      if (dream.f1 === spanOne3.textContent) {
        spanOne3.classList.add("active");
        localStorage.setItem("Massary-tempF1", spanOne3.textContent);
      }
      filter1.appendChild(spanOne3);

      let spanOne4 = document.createElement("span");
      spanOne4.dataset.type = "Self-Development";
      spanOne4.textContent = theData['texts']["dream-type-1-self"];
      if (dream.f1 === spanOne4.textContent) {
        spanOne4.classList.add("active");
        localStorage.setItem("Massary-tempF1", spanOne4.textContent);
      }
      filter1.appendChild(spanOne4);

      let spanOne5 = document.createElement("span");
      spanOne5.dataset.type = "Social / Impact";
      spanOne5.textContent = theData['texts']["dream-type-1-soc"];
      if (dream.f1 === spanOne5.textContent) {
        spanOne5.classList.add("active");
        localStorage.setItem("Massary-tempF1", spanOne5.textContent);
      }
      filter1.appendChild(spanOne5);
      
      let spanOne6 = document.createElement("span");
      spanOne6.dataset.type = "Spiritual";
      
      spanOne6.dataset.type = "Spiritual";
      spanOne6.textContent = theData['texts']["dream-type-1-sprc"];
      if (dream.f1 === spanOne6.textContent) {
        spanOne6.classList.add("active");
        localStorage.setItem("Massary-tempF1", spanOne6.textContent);
      }
      filter1.appendChild(spanOne6);

      let spanOne7 = document.createElement("span");
      spanOne7.dataset.type = "Other";
      spanOne7.textContent = theData['texts']["dream-type-1-other"];
      if (dream.f1 === spanOne7.textContent) {
        spanOne7.classList.add("active");
        localStorage.setItem("Massary-tempF1", spanOne7.textContent);
      }
      filter1.appendChild(spanOne7);

      let filter2 = document.createElement("div");
      filter2.className = "time";
      popUp.appendChild(filter2);

      let spanTwo1 = document.createElement("span");
      spanTwo1.dataset.type = "Short-term";
      spanTwo1.textContent = theData['texts']["dream-type-2-shr"];
      if (dream.f2 === spanTwo1.textContent) {
        spanTwo1.classList.add("active");
        localStorage.setItem("Massary-tempF2", spanTwo1.textContent);
      }
      filter2.appendChild(spanTwo1);

      let spanTwo2 = document.createElement("span");
      spanTwo2.dataset.type = "Medium-term";
      spanTwo2.textContent = theData['texts']["dream-type-2-mid"];
      if (dream.f2 === spanTwo2.textContent) {
        spanTwo2.classList.add("active");
        localStorage.setItem("Massary-tempF2", spanTwo2.textContent);
      }
      filter2.appendChild(spanTwo2);

      let spanTwo3 = document.createElement("span");
      spanTwo3.dataset.type = "Long-term";
      spanTwo3.textContent = theData['texts']["dream-type-2-long"];
      if (dream.f2 === spanTwo3.textContent) {
        spanTwo3.classList.add("active");
        localStorage.setItem("Massary-tempF2", spanTwo3.textContent);
      }
      filter2.appendChild(spanTwo3);

      let filter3 = document.createElement("div");
      filter3.className = "clearly";
      popUp.appendChild(filter3);

      let spanThree1 = document.createElement("span");
      spanThree1.dataset.type = "Blurry";
      spanThree1.textContent = theData['texts']["dream-type-3-shr"];
      if (dream.f3 === spanThree1.textContent) {
        spanThree1.classList.add("active");
        localStorage.setItem("Massary-tempF3", spanThree1.textContent);
      }
      filter3.appendChild(spanThree1);

      let spanThree2 = document.createElement("span");
      spanThree2.dataset.type = "Partially Clear";
      spanThree2.textContent = theData['texts']["dream-type-3-mid"];
      if (dream.f3 === spanThree2.textContent) {
        spanThree2.classList.add("active");
        localStorage.setItem("Massary-tempF3", spanThree2.textContent);
      }
      filter3.appendChild(spanThree2);

      let spanThree3 = document.createElement("span");
      spanThree3.dataset.type = "Very Clear";
      spanThree3.textContent = theData['texts']["dream-type-3-clear"];
      if (dream.f3 === spanThree3.textContent) {
        spanThree3.classList.add("active");
        localStorage.setItem("Massary-tempF3", spanThree3.textContent);
      }
      filter3.appendChild(spanThree3);
      custumizeFilters();
      let close = document.createElement("i");
      close.className = "close";
      close.classList.add("fas");
      close.classList.add("fa-close");
      close.addEventListener("click", () => {
        localStorage.removeItem("Massary-tempDreamTitle");
        localStorage.removeItem("Massary-tempDreamDes");
        localStorage.removeItem("Massary-tempF1");
        localStorage.removeItem("Massary-tempF2");
        localStorage.removeItem("Massary-tempF3");

        popUp.classList.add("out");
        layer.remove();
        setTimeout(() => {
          popUp.remove();
        }, 250);
      });
      custumizeFilters();
      popUp.appendChild(close);
      let addPlant = document.createElement("div");
      addPlant.className = "ok";
      addPlant.textContent = theData["texts"]["dream-button"];
      popUp.appendChild(addPlant);
      document.getElementById("pop").play();
      addPlant.addEventListener("click", () => {
        if (dreamName.value != "" && des.value != "") {
          document.querySelector(
            `#${e.target.parentElement.parentElement.id} h4`
          ).textContent = dreamName.value;
          document.querySelector(
            `#${e.target.parentElement.parentElement.id} p`
          ).textContent = des.value;
          dream.titel = dreamName.value;
          dream.des = des.value;
          dream.f1 = localStorage.getItem("Massary-tempF1");
          dream.f2 = localStorage.getItem("Massary-tempF2");
          dream.f3 = localStorage.getItem("Massary-tempF3");
          let filtersArray = Array.from(
            document.querySelectorAll(
              `.body-container #${e.target.parentElement.parentElement.id} .filters span`
            )
          );
          for (let i = 0; i < filtersArray.length; i++) {
            filtersArray[i].textContent = localStorage.getItem(
              `Massary-tempF${i + 1}`
            );
            console.log(filtersArray[i]);
            console.log(localStorage.getItem(`Massary-tempF${i + 1}`));
          }
          localStorage.removeItem("Massary-tempF1");
          localStorage.removeItem("Massary-tempF2");
          localStorage.removeItem("Massary-tempF3");
          localStorage.setItem(
            e.target.parentElement.parentElement.id,
            JSON.stringify(dream)
          );
          document.getElementById("plant").play();
          setTimeout(() => {
            popUp.remove();
          });
          layer.remove();
          popUp.classList.add("out");
        } else {
          if (dreamName.value === "") {
            if (document.querySelector(".wrong.title")) {
              document.querySelector(".wrong.title").remove();
            }
            let wrong = document.createElement("span");
            wrong.className = "wrong";
            wrong.classList.add("title");
            wrong.textContent = theData["texts"]["dream-error-title"];
            popUp.appendChild(wrong);
          } else {
            if (document.querySelector(".wrong.title")) {
              document.querySelector(".wrong.title").remove();
            }
          }
          if (des.value === "") {
            if (document.querySelector(".wrong.des")) {
              document.querySelector(".wrong.des").remove();
            }

            let wrong = document.createElement("span");
            wrong.className = "wrong";
            wrong.classList.add("des");

            wrong.textContent = theData["texts"]["dream-error-des"];
            popUp.appendChild(wrong);
          } else {
            if (document.querySelector(".wrong.des")) {
              document.querySelector(".wrong.des").remove();
            }
          }
          if (!localStorage.getItem("Massary-tempF1")) {
            if (document.querySelector(".wrong.f1")) {
              document.querySelector(".wrong.f1").remove();
            }

            let wrong = document.createElement("span");
            wrong.className = "wrong";
            wrong.classList.add("f1");

            wrong.textContent = theData["texts"]["dream-error-type1"];
            popUp.appendChild(wrong);
          } else {
            if (document.querySelector(".wrong.f1")) {
              document.querySelector(".wrong.f1").remove();
            }
          }
          if (!localStorage.getItem("Massary-tempF2")) {
            if (document.querySelector(".wrong.f2")) {
              document.querySelector(".wrong.f2").remove();
            }

            let wrong = document.createElement("span");
            wrong.className = "wrong";
            wrong.classList.add("f2");

            wrong.textContent = theData["texts"]["dream-error-type2"];
            popUp.appendChild(wrong);
          } else {
            if (document.querySelector(".wrong.f2")) {
              document.querySelector(".wrong.f2").remove();
            }
          }
          if (!localStorage.getItem("Massary-tempF3")) {
            if (document.querySelector(".wrong.f3")) {
              document.querySelector(".wrong.f3").remove();
            }

            let wrong = document.createElement("span");
            wrong.className = "wrong";
            wrong.classList.add("f3");

            wrong.textContent = theData["texts"]["dream-error-type3"];
            popUp.appendChild(wrong);
          } else {
            if (document.querySelector(".wrong.f3")) {
              document.querySelector(".wrong.f3").remove();
            }
          }
        }
      });
    }
  };
}
export function emptyNursery(theData) {
  let array = Array.from(
    document.querySelectorAll(".body-container .dream .container .box-small")
  );
  let childrenArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!array[i].classList.contains("hidden")) {
      childrenArray.push(array[i]);
    }
    console.log(childrenArray);
  }
  if (childrenArray.length === 0) {
    const emptyDreamMessages = Array.from(theData["texts"]["dreams-empty"])
    let words = document.createElement("div");
    words.className = "empty";
    words.innerHTML =
      emptyDreamMessages[Math.floor(Math.random() * emptyDreamMessages.length)];
    document
      .querySelector(".body-container .dream .container")
      .appendChild(words);
  }

}
