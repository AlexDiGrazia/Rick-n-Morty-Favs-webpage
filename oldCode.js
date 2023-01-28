const rick = fetch(
  "https://rickandmortyapi.com/api/character/17, 4, 60, 89, 118, 126, 141, 152, 656, 5, 191, 202, 2, 252, 254, 265, 274, 1, 3, 353, 372, 440, 382, 721, 383, 388"
);

let array = [];
let favoritesArray = [];
let favoritesData = [];

rick
  .then((data) => data.json())
  .then((data) => data.forEach((element) => makeArray(element)))
  .then((data) => array.forEach((person) => makeCard(person, ".main", '<span>♡</span>')))
  .then((data) => statusAlive())
  .then((data) => dead())
  .then((data) => human())
  .then((data) => alien())
  .then((data) => AllDataFav());

function makeArray(character) {
  array.push(character);
}

function makeCard(element, collection, button) {
  const card = document.createElement("div");
  card.className = "mortyCards";
  card.setAttribute("id", `${element.name}`);
  card.innerHTML = `
    <div class= "image-wrapper">
      <img src=${element.image} alt=${element.name}>
      <div class="overlay">
        <h6 class="someText">Species: ${element.species}</h6>
        <h6 class="someText">Origin: ${element.origin.name}</h6>
        <h6 class="someText">Status: ${element.status}</h6>
        <button onclick="favoritesClick()" class="before-like">${button}</button>
      </div>
    </div>
    <h3>${element.name}</h3>
  `;
 
  document.querySelector(collection).appendChild(card);
}

function favoritesClick() {
  const whereIsIt =
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  const cardClicked = event.target.parentElement.parentElement.parentElement.parentElement;
  const id = cardClicked.id;
  if (whereIsIt.classList.value.includes("main")) {
    switchCollections(
      id,
      array,
      favoritesArray
    ); 
    cardClicked.remove("div");
    document.querySelector(".favorites").appendChild(cardClicked);
    cardClicked.querySelector('.image-wrapper').querySelector('.overlay').querySelector('.before-like').remove('button');
    const xOutButton = document.createElement('button');
    xOutButton.setAttribute("onclick", "favoritesClick()");
    xOutButton.className = "before-like"
    xOutButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    cardClicked.querySelector('.image-wrapper').querySelector('.overlay').append(xOutButton);
  } else if (whereIsIt.classList.value.includes("favorites")) {
    switchCollections(
      id,
      favoritesArray,
      array
    );
    cardClicked.remove("div");
    document.querySelector(".main").appendChild(cardClicked);
    cardClicked.querySelector('.image-wrapper').querySelector('.overlay').querySelector('.before-like').remove('button');
    const heartButton = document.createElement('button');
    heartButton.setAttribute("onclick", "favoritesClick()");
    heartButton.className = "before-like"
    heartButton.innerHTML = `<span>♡</span>`;
    cardClicked.querySelector('.image-wrapper').querySelector('.overlay').append(heartButton);
  }
  allData();
  AllDataFav();
}

function switchCollections(cardId, whichArray, whereTo) {
  const characterToMove = whichArray.find((character) => character.name === cardId); 
  const index = whichArray.findIndex((object) => object.name === characterToMove.name); 
  whichArray.splice(index, 1);
  whereTo.push(characterToMove);
}

//Alphabetical sort
function alphabetize() {
  array.sort((a, b) => (a.name > b.name ? 1 : -1));
  favoritesArray.sort((a, b) => (a.name > b.name ? 1 : -1));
  deleteAll();
  array.forEach((person) => makeCard(person, ".main", '<span>♡</span>'));
  favoritesArray.forEach((person) => makeCard(person, ".favorites", `<i class="fa-solid fa-xmark"></i>`));
}

function zThroughA() {
  array.sort((a, b) => (a.name < b.name ? 1 : -1));
  favoritesArray.sort((a, b) => (a.name < b.name ? 1 : -1));
  deleteAll();
  array.forEach((person) => makeCard(person, ".main", '<span>♡</span>'));
  favoritesArray.forEach((person) => makeCard(person, ".favorites", `<i class="fa-solid fa-xmark"></i>`));
}

function deleteAll() {
  const mainCollection = document.querySelector(".main");
  const favCollection = document.querySelector(".favorites");
  mainCollection.innerHTML = "";
  favCollection.innerHTML = "";
}

function statusAlive() {
  const aliveMain = array.filter((person) => person.status === "Alive");
  document.querySelector(
    ".main-data"
  ).innerHTML = `Status Alive: ${aliveMain.length}`;
}

function dead() {
  const deadMain = array.filter((person) => person.status === "Dead");
  document.querySelector(
    ".main-data"
  ).innerHTML += `<br><br> Status Dead: ${deadMain.length}`;
}

function human() {
  const humanMain = array.filter((person) => person.species === "Human");
  document.querySelector(
    ".main-data"
  ).innerHTML += `<br><br> Species Human: ${humanMain.length}`;
}

function alien() {
  const alienMain = array.filter((person) => person.species === "Alien");
  document.querySelector(
    ".main-data"
  ).innerHTML += `<br><br> Species Alien: ${alienMain.length}`;
}

function allData() {
  statusAlive();
  dead();
  human();
  alien();
}

function AllDataFav() {
  statusAliveFav();
  deadFav();
  humanFav();
  alienFav();
}

function statusAliveFav() {
  const aliveFav = favoritesArray.filter((person) => person.status === "Alive");
  document.querySelector(
    ".favorite-data"
  ).innerHTML = `Status Alive: ${aliveFav.length}`;
}

function deadFav() {
  const deadFav = favoritesArray.filter((person) => person.status === "Dead");
  document.querySelector(
    ".favorite-data"
  ).innerHTML += `<br><br> Status Dead: ${deadFav.length}`;
}

function humanFav() {
  const humanFav = favoritesArray.filter(
    (person) => person.species === "Human"
  );
  document.querySelector(
    ".favorite-data"
  ).innerHTML += `<br><br> Species Human: ${humanFav.length}`;
}

function alienFav() {
  const alienFav = favoritesArray.filter(
    (person) => person.species === "Alien"
  );
  document.querySelector(
    ".favorite-data"
  ).innerHTML += `<br><br> Species Alien: ${alienFav.length}`;
}


function goToFavoritesCollection() {
  document.querySelector('.favorites-collection').style.display = 'block';
}

function returnToMainCollection() {
  document.querySelector('.favorites-collection').style.display = 'none';
}

function openDataDropDown(id, button) {
  document.getElementById(id).classList.add('translateY-down');
  document.getElementById(button).innerHTML = "Close Data";
  document.getElementById(button).setAttribute("onclick", `closeDataDropDown('${id}', '${button}')`);
}

function closeDataDropDown(id, button) {
  document.getElementById(id).classList.remove('translateY-down');
  document.getElementById(button).innerHTML = "See Data";
  document.getElementById(button).setAttribute("onclick", `openDataDropDown('${id}', '${button}')`);
}

function sliderTabOpen() {
  if(document.querySelector('.data-dropdown-slider-main-collection').classList.value.includes('translateX-left')) {
    document.querySelector('.data-dropdown-slider-main-collection').classList.remove('translateX-left');
  }
  if(document.querySelector('.data-dropdown-slider-fav-collection').classList.value.includes('translateX-left')) {
    document.querySelector('.data-dropdown-slider-fav-collection').classList.remove('translateX-left');
  }
 Array.from(document.querySelectorAll('.tab-slide-function'))
 .forEach((button) => button.style.transform = "none");
 Array.from(document.querySelectorAll('.slider-tab-open'))
  .forEach((button) => button.innerHTML =`<i class="fa-solid fa-chevron-left"></i>`);
  Array.from(document.querySelectorAll('.slider-tab-open'))
  .forEach((button) => button.setAttribute("onclick", "sliderTabClose()"));
}

function sliderTabClose() {
  Array.from(document.querySelectorAll('.tab-slide-function'))
  .forEach((button) => button.style.transform = "translateX(-232px)");
  if(document.getElementById('main-data-menu').classList.value.includes('translateY-down')) {
    closeDataDropDown('main-data-menu', 'main-data-dropdown')
    document.getElementById('main-data-menu').classList.add('translateX-left');
  }
  if(document.getElementById('fav-data-menu').classList.value.includes('translateY-down')) {
    closeDataDropDown('fav-data-menu', 'fav-data-dropdown')
    document.getElementById('fav-data-menu').classList.add('translateX-left');
  }
  Array.from(document.querySelectorAll('.slider-tab-open'))
  .forEach((button) => button.innerHTML =`<i class="fa-solid fa-chevron-right"></i>`);
  Array.from(document.querySelectorAll('.slider-tab-open'))
  .forEach((button) => button.setAttribute("onclick", "sliderTabOpen()"));
 }

 document.querySelector('.favorites-collection').addEventListener("scroll", (evt) => {
  if(evt.target.scrollTop > 220) {
      sliderTabClose();
   } else {
    Array.from(document.querySelectorAll('.tab-slide-function'))
  .forEach((button) => button.style.transform = "none");
  document.querySelector('.slider-tab-open').innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
  sliderTabOpen();
   }
  })
 

 function onScrollHide() {
  window.onscroll = function() {
   if(window.pageYOffset > 220) {
    sliderTabClose();
   } else {
    Array.from(document.querySelectorAll('.tab-slide-function'))
  .forEach((button) => button.style.transform = "none");
  document.querySelector('.slider-tab-open').innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
  sliderTabOpen();
   }
  }
 }
 onScrollHide();






