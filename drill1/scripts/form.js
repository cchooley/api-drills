let API_URL = 'https://quiet-bayou-99554.herokuapp.com/api/v1/contacts'
let transmit = document.querySelector('form')
let submitted = document.querySelector('p')
let params = (new URL(document.location)).searchParams
let name = params.get("character")
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

  if (message === '' || character === '') {
    submitted.innerText = 'Your request wasnt formatted correctly; are you stuck in the upside-down?'
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
  })
  .then(response => response.json())
  .then(response => {
    submitted.innerText = response.data.message
  })
}
