console.log('%c HI', 'color: firebrick')

let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  fetchDogBreeds();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => {json.message.forEach(img => addImage(img))});
}

function addImage(dogPicURL) {
  let container = document.querySelector('#dog-image-container');
  let img = document.createElement('img');
  img.src = dogPicURL;
  img.style = 'height: 100px;'
  container.appendChild(img);
}

function loadBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => {
      breeds = Object.keys(json.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function fetchDogBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl) 
    .then(response => response.json()) 
    .then(json => {
        breeds = Object.keys(json.message)
        breeds.forEach(breed => renderDogBreeds(breed));
        updateBreedLists();
    })
}

function updateBreedLists() {
    let breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', function(event) {
        let letter = event.target.value;
        newBreedsList = breeds.filter(breed => breed.startsWith(letter));
        updateLists(newBreedsList);
    })
}

function renderDogBreeds(dogBreed) {
    const dogUl = document.getElementById('dog-breeds');
    const createLi = document.createElement('li');
    createLi.innerText = dogBreed;
    dogUl.appendChild(createLi);
    createLi.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'firebrick';
}

function updateLists(breeds) {
    let newUl = document.getElementById('dog-breeds');
    newUl.innerText = '';
    breeds.forEach(breed => {
        let newLi = document.createElement('li');
        newLi.innerText = breed;
        newUl.appendChild(newLi);
        newLi.addEventListener('click', updateColor);
    });
}