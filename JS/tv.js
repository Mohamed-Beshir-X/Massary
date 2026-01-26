export async function fetchFeed() {
  const response = await fetch(
  `https://momo6011.github.io/massary-tv-feed/feed_1.json?ts=${Date.now()}`,
  { cache: "no-store" } 
);
  const videos = await response.json();
  console.log(videos)
  let dataArray = Array.from(videos)
  console.log(dataArray)
  for(let i =0 ; i < dataArray.length; i++){
    let card = document.createElement("div")
    card.className = "card"
    document.querySelector(".body-container.massary-tv .cards").appendChild(card)
    let img = document.createElement("img")
    card.appendChild(img)
    img.src = dataArray[i].thumbnail
    let title = document.createElement("h3")
    title.textContent = dataArray[i].title
    card.appendChild(title)
    let platform =document.createElement("i")
    platform.className = "platform"
    platform.classList.add("fa-brands")
    platform.classList.add("fa-youtube")
    card.appendChild(platform)
    let info = document.createElement("div")
    info.className= "info"
    card.appendChild(info)
    let theChannel = document.createElement("span")
    theChannel.className = "channel"
    theChannel.textContent = dataArray[i].channel
    info.appendChild(theChannel)
    let videoDate = dataArray[i].date
    let dateObj = new Date(videoDate)
    let formattedDate = dateObj.toLocaleDateString('ar-EG' ,  {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    let date = document.createElement("div")
    date.className = "date"
    date.textContent = formattedDate
    info.appendChild(date)
    let watch = document.createElement("a")
    watch.className = "watch"
    watch.href = dataArray[i].link
    watch.textContent = "شاهد اللآن"
    watch.target = "_blank"
    card.appendChild(watch)
  }
}
