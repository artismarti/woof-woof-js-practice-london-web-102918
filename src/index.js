const pupsURL = 'http://127.0.0.1:3000/pups'
// WHY IS THIS NULL IN THE CODE BUT GETS THE VALUE IN CONSOLE? FML.
let filterBtn = document.getElementById('good-dog-filter')

function fetchPups() {
  fetch(`${pupsURL}`)
  .then(response => response.json())
  .then(pups => showPups(pups))
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
    <button type="button" name="button">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
    `
    dogBar.appendChild(pupSpan)
  })
}

//DON't KNOW HOW TO INVOKE THIS
// TRIED NOT WRAPPING IN FUNCTION
//WORKS FINE IN CONSOLE. FML
const goodBadBtnListner = () => {
  let pupSpans = document.querySelectorAll('span')
  pupSpans.forEach((pupSpan) => {
    goodBadBtn = pupSpan.querySelector("button")
    goodBadBtn.addEventListener('click', () => console.log("togglePupGoodness"))
  })
}

function togglePupGoodness() {
  console.log("I AM HERE");
  if ((goodBadBtn.innerText) === "Good Dog!") {
    goodBadBtn.innerText = "Bad Dog!"
    updatePupGoodness(goodBadBtn.innerText)
  } else {
    goodBadBtn.innerText = "Good Dog!"
    updatePupGoodness(goodBadBtn.innerText)
  }
}

function updatePupGoodness(goodBad) {
  console.log(("UPDATE????"));
  fetch(`${pupsURL}`, {
    method: 'PATCH',
    headers:{
    'Content-Type': 'application/json',
    Accept: "application/json"
    },
    body: JSON.stringify({
      isGoodDog: `${goodBad}`
    })
  })
}

const filterPups = () => {
console.log("FILTER");
  const filterBtn = document.getElementById('good-dog-filter')
  let onOff = filterBtn.innerText.split(' ')
  onOff = onOff[onOff.length-1]

  let pupSpans = document.querySelectorAll('span')
  pupSpans.forEach((pupSpan) => {
    goodBadBtn = pupSpan.querySelector("button")
    if ((goodBadBtn.innerText === "Bad Dog!") && (onOff === 'ON')) {
      filterBtn = 'Filter good dogs: OFF'
    }  else {
      filterBtn = 'Filter good dogs: ON'
      pupSpan.style.display = 'none';
    }
  })
}

fetchPups()
goodBadBtnListner()

filterBtn.addEventListener('click', filterPups)
