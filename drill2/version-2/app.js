const scoreboard = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/GBP'
const API_URL = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/'
const getScores = document.querySelector('.scores')
const scoreArr = []

highScores()

function highScores() {
  fetch(scoreboard)
    .then(response => response.json())
    .then(response => {
      for (var i = 0; i < response.length; i++) {
        let info = response[i]
        let name = info.player_name
        let score = info.score
        let object = {name:name, score:score}

        scoreArr.push(object)
        scoreArr.sort(function(a, b){return b.score-a.score})

      }

      let data = scoreArr.slice(0,3)
      for (var i = 0; i < data.length; i++) {
        let info = data[i]
        let name = info.name
        let score = info.score
        let html = `
          <p class='score-card'>
            <span class='player-name'>${name}</span>
            <span class='score'>${score}</span>
          </p>
          `
        getScores.innerHTML += html
      }
    })
}

canvas.addEventListener('gameOver', restart)

function restart() {
  let game_name = 'GBP'
  let player_name = 'Conor'
  let date = ''
  let postObject =
  {
    game_name,
    player_name,
    score,
    date
  }

  postScore(postObject)

  alert(`Game over. Final score: ${score}. Click OK to restart`)
  refreshScores()
}

function postScore(data) {
  return fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    })
    .catch(function (error) {
      console.error
    })
}

function refreshScores() {
  let scoreUpdate = document.querySelectorAll('.score-card')
  for (var i = 0; i < scoreUpdate.length; i++) {
    scoreUpdate[i].remove()
  }
  highScores()
}
