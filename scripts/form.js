let API_URL = 'https://quiet-bayou-99554.herokuapp.com/api/v1/contacts'
let transmit = document.querySelector('form')
let submitted = document.querySelector('p')
let params = (new URL(document.location)).searchParams
let name = params.get("character");

hideElement(submitted)
let nameValue = document.querySelector('#character')
nameValue.value = name

transmit.addEventListener('submit', (event) => {
  event.preventDefault()
  let messageData = new FormData(transmit)
  let character = messageData.get('character')
  let message = messageData.get('message')

  let sendData =
    {
      data: {
        character,
        message
      }
    }
  postData(sendData)
})


function postData(data) {
  return fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
  }).then(response => response.json())
    .then(response => {
      showResponse(submitted)
  })
    .catch(error => {
      errorResponse(submitted)
  })
}

function hideElement(element) {
  element.style.display = 'none'
}

function showResponse(element) {
  element.style.display = ''
}

function errorResponse(element) {
  element.style.innerText = 'Your request wasnt formatted correctly; are you stuck in the upside-down?'
}
