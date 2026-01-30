export function setTheLibrary(theData) {
  document.querySelector(".lib-img h3").textContent =
    "these books written by Mr.zeytouna for you";
}
export function filter(theData) {
  let filterElements = Array.from(document.querySelectorAll(".filter span"));
  filterElements.forEach((e) => {
    e.addEventListener("click", () => {
      for (let i = 0; i < filterElements.length; i++) {
        filterElements[i].classList.remove("active");
      }
      e.classList.add("active");
      let books = document.querySelectorAll(".books .book");
      books.forEach((k) => {
        if (k.dataset["filter"] === e.dataset["filter"]) {
          console.log(k);
          k.classList.remove("hidden");
        } else {
          k.classList.add("hidden");
          if (e.dataset["filter"] === "all") {
            k.classList.remove("hidden");
          }
        }
      });
    });
  });
}
export function makeBooks(theData) {
  let objectNumbers = Object.keys(theData["books"]).length;

  for (let i = 1; i <= objectNumbers; i++) {
    let book = document.createElement("div");
    book.className = "book";
    book.id = `book_ar_${i}`
    let imgHandle = document.createElement("div");
    imgHandle.className = "img";
    book.appendChild(imgHandle);
    let bookImg = document.createElement("img");
    bookImg.src = `Images/book${i}.webp`;
    imgHandle.appendChild(bookImg);
    let booksContainer = document.querySelector(".body-container .books");
    let title = document.createElement("h4");
    title.textContent = theData["books"][`book_ar_${i}`]["title"];
    book.appendChild(title);
    let des = document.createElement("p");
    des.textContent = theData["books"][`book_ar_${i}`]["description"];
    book.appendChild(des);
    let link = document.createElement("a");
    let imgIcon = document.createElement("img");
    imgIcon.src = "Images/coins.webp";
    let price = document.createElement("span");
    price.textContent = theData["books"][book.id]["price"];
    link.appendChild(imgIcon);
    link.appendChild(price);
    link.addEventListener("click", () => {
      if (
        +price.textContent <=
        +document.querySelector(".header .score span").textContent
      ) {
        let tempPrice =
          localStorage.getItem("Massary-coins") - +price.textContent;
        localStorage.setItem("Massary-coins", tempPrice);
        document.querySelector(".header .score span").textContent = tempPrice;
        imgIcon.remove();
        price.textContent = "Download";
        let icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add("fa-download");
        link.prepend(icon);
        link.classList.add("download");
        // هنخزن اللينك في متغير عشان نستخدمه جوه الـ function
        let currentBookUrl = theData['books']['book_ar_' + i]['url'];

        // بنلغي الـ href عشان م يفتحش صفحة جديدة
        link.href = 'javascript:void(0)';

        // بنبرمج الضغطة عشان تنفذ التحميل في الخلفية
        link.onclick = function (e) {
          e.preventDefault();
          // هنا بنادي دالة التحميل اللي بتستخدم إضافة cordova
          downloadFile(currentBookUrl, 'book_ar_' + i + '.pdf');
        };
        localStorage.setItem(`Massary-book${i}`, i - 1);
        document.getElementById("buy").play();
      } else {
        if (link.classList.contains("download")) {
          return;
        }
        let popUp = document.createElement("div");
        let layer = document.createElement("div");
        let close = document.createElement("i");
        let head = document.createElement("h4");
        let des = document.createElement("p");
        let img = document.createElement("img");
        close.classList.add("close");
        close.textContent = theData["texts"]["popUp-btn"];
        des.className = "des";
        head.textContent = theData['texts']['library-coins'];
        des.innerHTML = theData["texts"]['library-coins-des']
        img.src = "Images/no_coins.webp";
        document.getElementById("info").play();
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
        popUp.classList.add("coins");
        document.body.appendChild(popUp);
        popUp.appendChild(close);
        popUp.appendChild(img);
        popUp.appendChild(head);
        popUp.appendChild(des);
        document.body.appendChild(layer);
      }
    });
    book.appendChild(link);
    booksContainer.appendChild(book);
    book.setAttribute("data-filter", theData[`books`][`book_ar_${i}`]["class"]);
    // console.log(book.dataset["filter"])
  }
}

export function seeBooks(theData) {
  let list = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).slice(0, 12) === "Massary-book") {
      list.push(localStorage.key(i));
    }
  }
  let link = Array.from(document.querySelectorAll(".books .book a"));
  let iconImg = Array.from(document.querySelectorAll(".books .book a img"));
  let price = Array.from(document.querySelectorAll(".books .book a span"));
  for (let i = 0; i < list.length; i++) {
    let index = +localStorage.getItem(list[i]);
    let books = Array.from(document.querySelectorAll('.books .book a'));

    books[index].classList.add('download');
    if (iconImg[index]) iconImg[index].remove();
    price[index].textContent = 'Download';

    let icon = document.createElement('i');
    icon.classList.add('fas', 'fa-download');
    link[index].prepend(icon);
    link[index].classList.add('download');

    // الجزء اللي هيخفي اللينك ويمنع فتحه في المتصفح
    let bookUrl = theData['books'][books[index].parentElement.id]['url'];

    // بنخلي الـ href مجرد شباك عشان ميروحش لصفحة تانية
    link[index].href = '#';

    link[index].onclick = function (e) {
      e.preventDefault(); // بيمنع فتح المتصفح تماماً
      downloadFile(bookUrl, 'Book_' + index + '.pdf'); // بننادي دالة التحميل
    };
  }
}



function downloadFile(url, fileName) {
  // بنشيك الأول إن إضافة cordova موجودة
  if (typeof FileTransfer === 'undefined') {
    alert('إضافة التحميل مش شغالة، اتأكد من تثبيت cordova-plugin-file-transfer');
    return;
  }

  var fileTransfer = new FileTransfer();
  var uri = encodeURI(url);
  // المسار اللي هيتسيف فيه الملف جوه الموبايل
  var fileURL = cordova.file.externalDataDirectory + fileName;

  fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
      alert('تم تحميل الكتاب بنجاح في مجلد التطبيق');
      console.log('File saved to: ' + entry.toURL());
    },
    function(error) {
      alert('حصل مشكلة في التحميل، جرب تاني');
      console.log('Error Code: ' + error.code);
    },
    false,
    {}
  );

}
