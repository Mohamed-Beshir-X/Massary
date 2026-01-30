export function clickSupport(theData){
  let supportBtn = document.querySelector(".support-btn")
supportBtn.addEventListener("click" , (e)=>{
  e.preventDefault()
  let layer = document.createElement("div")
  layer.className = "layer"
  document.body.appendChild(layer)
  let popUp = document.createElement("div")
  popUp.className = "popUp"
  popUp.classList.add("support")
  document.body.appendChild(popUp)
  // document.body.getElementById("pop").play()
  document.getElementById("pop").play()
  let h4 = document.createElement("h4")
  h4.textContent = theData['texts']["suport-head"]
  popUp.appendChild(h4)
  let des = document.createElement("p")
  des.className = "des"
  des.innerHTML = theData['texts']['support']
popUp.appendChild(des)

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

let img = document.createElement("img")
img.className = "img"
img.src = "Images/support.webp"
popUp.appendChild(img)
let next = document.createElement("span")
next.className = "next"
next.textContent = theData["texts"]['support-next']
popUp.appendChild(next)
next.addEventListener("click" , ()=>{
  popUp.classList.add("out")
  setTimeout(()=>{
    popUp.remove()
    let pop2 = document.createElement("div")
  pop2.className = "popUp"
  pop2.classList.add("support")
  pop2.classList.add("support2")
  document.body.appendChild(pop2)
document.getElementById("pop").play()
  let choose = document.createElement("h4")
  choose.textContent = theData["texts"]["money-head"]
  pop2.appendChild(choose)
  let des2 = document.createElement("p")
  des2.className = "des"
  des2.innerHTML = theData["texts"]["money-des"]

pop2.appendChild(des2)

let close = document.createElement("i")
close.className = "close"
close.classList.add("fas")
close.classList.add("fa-close")
pop2.appendChild(close)
close.addEventListener("click" , ()=>{
  pop2.classList.add("out")
  layer.remove()
  setTimeout(()=>{
    pop2.remove()
  },250)
})
let money = document.createElement("div")
money.className = "money"
pop2.appendChild(money)
let numberOfPrices = 5
for(let i =0; i<numberOfPrices; i++){
  let price= document.createElement("span")
  price.className = `price`
  if(i === 0){
    price.textContent = "50 EGP"
    price.setAttribute("data-price" , "50")
  }
  if(i === 1){
    price.textContent = "100 EGP"
    price.setAttribute("data-price" , "100")
  }
  if(i === 2){
    price.textContent = "250 EGP"
    price.setAttribute("data-price" , "250")
  }
  if(i === 3){
    price.textContent = "500 EGP"
    price.setAttribute("data-price" , "500")
  }
  if(i === 4){
    price.textContent = "1000 EGP"
    price.setAttribute("data-price" , "1000")
  }

  money.appendChild(price)
}
let priceArray = Array.from(document.querySelectorAll(".money .price"))
priceArray.forEach((e)=>{
  e.addEventListener("click" , (k)=>{
    for(let i = 0 ; i<priceArray.length; i++){
    if(priceArray[i].classList.contains("active")){
      priceArray[i].classList.remove("active")
    }
  }
  e.classList.add("active")
  sessionStorage.setItem("Massary-price" , e.dataset.price)
  })
  
})

let next2 = document.createElement("span")
next2.className = "next"
next2.textContent = theData["texts"]['support-next']
pop2.appendChild(next2)
let wrong
next2.addEventListener("click" , ()=>{
  let temp = false
  for(let i = 0; i < priceArray.length; i++){
    if(priceArray[i].classList.contains("active")){
      temp = true
    }
  }
  if(temp === false){
    wrong = document.createElement("span")
    wrong.className = "wrong"
    wrong.textContent = theData["texts"]['money-error']
    money.appendChild(wrong)
    document.getElementById("error").play()
  }else{
    
    pop2.classList.add("out")
    setTimeout(()=>{
      pop2.remove()
      let popUp = document.createElement("div")
    popUp.className = "popUp"
    popUp.classList.add("money")
    document.body.appendChild(popUp)
    let title = document.createElement("h3")
    title.textContent = "للأمان حول من محفظتك يدويا لهذا الرقم"
    popUp.appendChild(title)
    let copyArea = document.createElement("div")
    copyArea.className = "copy-area"
    let copyText = document.createElement("p")
    copyText.textContent = `01210058113`
    copyArea.appendChild(copyText)
    popUp.appendChild(copyArea)
    let wallets = document.createElement("div")
    wallets.className = "wallets"
    popUp.appendChild(wallets)
    let vodafone = document.createElement("span")
    vodafone.className = "vodafone"
    vodafone.classList.add("active")
    vodafone.textContent = "فودافون كاش"
    wallets.appendChild(vodafone)
    let etislate = document.createElement("span")
    etislate.className = "etislate"
    etislate.textContent = "اتصالات كاش"
    wallets.appendChild(etislate)
    let orange = document.createElement("span")
    orange.className = "orange"
    orange.textContent = "اورانج كاش"
    wallets.appendChild(orange)
    let we = document.createElement("span")
    we.className = "we"
    we.textContent = "وي باي"
    wallets.appendChild(we)
    
    
    let close = document.createElement("i")
    close.className = "close"
    close.classList.add("fas")
    close.classList.add("fa-close")
    close.addEventListener("click" , ()=>{
      
      layer.remove()
      popUp.classList.add("out")
      setTimeout(()=>{
        popUp.remove()
      },250)
    })
    popUp.appendChild(close)
    },250)
    
  }
  console.log(temp)
})

  },250)
})
})
}


