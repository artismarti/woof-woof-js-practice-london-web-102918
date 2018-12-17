const pupsURL = 'http://127.0.0.1:3000/pups'
const filterBtn = document.getElementById('good-dog-filter')
let pupSpans
let isFilterOn = false


function fetchPups() {
  fetch(`${pupsURL}`)
  .then(response => response.json())
  .then(pups => {
    showPups(pups)
    init();
  })
}

const showPups = (pups) => {
  let dogBar
  pups.forEach((pup) => {
    dogBar = document.getElementById('dog-bar')
    let pupSpan = document.createElement('span')
    pupSpan.id = pup.id
    pupSpan.innerHTML = `
    <img src="${pup.image}" alt="Puppy Image">
    <h2>${pup.name}</h2>
    <button type="button" name="button" data-pup_id="${pup.id}">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
    `
    dogBar.appendChild(pupSpan)
  })
}
const init = () => {
  pupSpans = document.querySelectorAll('span');

  pupSpans.forEach((pupSpan) => {
    let goodBadBtn = pupSpan.querySelector("button")
    goodBadBtn.addEventListener('click', togglePupGoodness)
  })
}

function togglePupGoodness(event) {
  const goodBadBtn = event.target
  if ((goodBadBtn.innerText) === "Good Dog!") {
    goodBadBtn.innerText = "Bad Dog!"
    updatePupGoodness(goodBadBtn)
  } else {
    goodBadBtn.innerText = "Good Dog!"
    updatePupGoodness(goodBadBtn)
  }
}

function updatePupGoodness(goodBad) {
  let isGoodDog
  (goodBad.innerText === 'Bad Dog!')? isGoodDog = false : isGoodDog = true
  fetch(`${pupsURL}/${goodBad.dataset.pup_id}`, {
    method: 'PATCH',
    headers:{
    'Content-Type': 'application/json',
    "Accept": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: isGoodDog
    })
  })
}

const filterPups = () => {
  if (!isFilterOn) {
    isFilterOn = true
    filterBtn.innerText = 'Filter good dogs: ON'
    pupSpans.forEach((pupSpan) => {
      // if Filter is OFF:
        // change filter text to ON
        // change visibility of Bad Dogs to none
        if (pupSpan.querySelector('button').innerText === 'Bad Dog!'){
          pupSpan.style.display = 'none';
        }
      })
    } else {
      isFilterOn = false
      filterBtn.innerText = 'Filter good dogs: OFF'
      pupSpans.forEach((pupSpan) => {
        pupSpan.style.display = '';
      })
    }
  }

fetchPups()

filterBtn.addEventListener('click', filterPups)
