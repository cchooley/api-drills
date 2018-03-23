const baseUrl = 'https://quiet-bayou-99554.herokuapp.com/api/v1/contacts'
const characterList = document.querySelector('#characters')

getCharacters()
function getCharacters() {

  fetch(baseUrl)
    .then(response => response.json())
    .then(response => {
      for (var i = 0; i< response.data.length; i++) {
        var person = response.data[i]

        var name = person.name
        var image = person.imageURL
        var phone = person.phone
        var message = person.message

        var html = `
        <li>
          <img src="${image}">
          <span>${name}</span>
          <span>${phone}</span>
          <p>${message}</p>
          <a href='contact.html?character=${name}'>Leave ${name} a message</a>
        </li>
        `
        characterList.innerHTML += html
      }
    })
}
