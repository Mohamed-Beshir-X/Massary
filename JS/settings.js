export function setSettings(theData) {
  let audios = Array.from(document.querySelectorAll("audio"))
let soundsName = ["info" , "done" , "buy", "lesson", "coin-spill", "pop", "plant", "error", "gift", "paper", "piano"]
let sounds =[]
let musics
function muteSounds(){
  audios.forEach((e)=>{
    for(let i =0; i<soundsName.length; i++){
      if(e.id === soundsName[i]){
        sounds.push(e)
      }
    }
    sounds.forEach((e)=>{
      e.muted = true
    })
  })
}

function unMuteSounds(){
  sounds.forEach((e)=>{
      e.muted = false
    })
}




function seeSettings(){
  // music setting ------------------------------------
  if(!localStorage.getItem(`Massary-cust-music`)){
    localStorage.setItem(`Massary-cust-music` , "on")
  }



   // sound settings --------------------------------------------

  if(!localStorage.getItem(`Massary-cust-sound`)){
    localStorage.setItem(`Massary-cust-sound` , "on")
  }

  if(localStorage.getItem("Massary-cust-sound") === 'on'){
    let toggleChildren = Array.from(document.querySelector(".body-container.cust .toggle-btn.sound").children)
    toggleChildren[1].classList.remove("active")
      toggleChildren[0].classList.add("active")
      toggleChildren[2].classList.remove("right")
      toggleChildren[2].classList.add("left")
  }

  if(localStorage.getItem("Massary-cust-sound") ==='off' ){
    let toggleChildren = Array.from(document.querySelector(".body-container.cust .toggle-btn.sound").children)
    toggleChildren[0].classList.remove("active")
      toggleChildren[1].classList.add("active")
      toggleChildren[2].classList.remove("left")
      toggleChildren[2].classList.add("right")
      muteSounds()
  }

   // lang settings --------------------------------------------



  if(localStorage.getItem("Massary-cust-lang") === 'on'){
    let toggleChildren = Array.from(document.querySelector(".body-container.cust .toggle-btn.lang").children)
    toggleChildren[1].classList.remove("active")
      toggleChildren[0].classList.add("active")
      toggleChildren[2].classList.remove("right")
      toggleChildren[2].classList.add("left")
  }

  if(localStorage.getItem("Massary-cust-lang") ==='off' ){
    let toggleChildren = Array.from(document.querySelector(".body-container.cust .toggle-btn.lang").children)
    toggleChildren[0].classList.remove("active")
      toggleChildren[1].classList.add("active")
      toggleChildren[2].classList.remove("left")
      toggleChildren[2].classList.add("right")
  }
}
seeSettings()




let toggleBtns = Array.from(document.querySelectorAll(".body-container.cust .toggle-btn"))
// toggleBtns.addEventListener("click" ,)
toggleBtns.forEach((e)=>{
  e.addEventListener("click" ,()=>{
    let toggleChildren = Array.from(e.children)
    let catg = e.classList[1]
    if(localStorage.getItem(`Massary-cust-${catg}`) === "on"){
      toggleChildren[0].classList.remove("active")
      toggleChildren[1].classList.add("active")
      toggleChildren[2].classList.remove("left")
      toggleChildren[2].classList.add("right")
      localStorage.setItem(`Massary-cust-${catg}` , 'off')
      if(catg === "lang"){
        localStorage.setItem("Massary-lang" , "en")
        window.location.reload()
      }
      if(catg === "sound"){
        muteSounds()
        console.log("Sound is muted bro,")
      }
    }else{
      toggleChildren[1].classList.remove("active")
      toggleChildren[0].classList.add("active")
      toggleChildren[2].classList.remove("right")
      toggleChildren[2].classList.add("left")
      localStorage.setItem(`Massary-cust-${catg}` , 'on')
      if(catg === "lang"){
        localStorage.setItem("Massary-lang" , "ar")
        window.location.reload()
      }
      if(catg === "sound"){
        unMuteSounds()
        
      }
    }
  })
})
  let deleteAcount = document.querySelector(".body-container.cust .content .delete")
deleteAcount.textContent = theData["texts"]['delete-acount-btn']
deleteAcount.addEventListener("click" , ()=>{
  document.getElementById("error").play()
  let popUp = document.createElement("div")
  popUp.classList.add("popUp")
  popUp.classList.add("delete-acount")
  let layer = document.createElement('div')
  layer.className ="layer"
  document.body.appendChild(popUp)
  document.body.appendChild(layer)
  let title = document.createElement("h4")
  title.textContent = theData['texts']['delete-acount-title']
  popUp.appendChild(title)
  let des = document.createElement("p")
  des.className = "des"
  des.textContent = theData['texts']["delete-acount-des"]
  popUp.appendChild(des)
  let sure = document.createElement("span")
  sure.className = "ok"
  sure.textContent = theData['texts']["delete-acount-ok"]
  popUp.appendChild(sure)
  
  sure.addEventListener('click' , ()=>{
    localStorage.clear()
    window.location.reload()
  })
  let close = document.createElement("i")
  close.className = "close"
  close.classList.add("fas")
  close.classList.add("fa-close")
  popUp.appendChild(close)
  close.addEventListener("click" , ()=>{
    popUp.classList.add("out")
    layer.remove()
    setTimeout(()=>{
      popUp.remove()
    },250)
  })
})
}


