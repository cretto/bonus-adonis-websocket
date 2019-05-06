let online

const urlParams = new URLSearchParams(window.location.search)

const token = urlParams.get('token')
const userId = urlParams.get('id')

if (!token || !userId) {
  alert('Você precisa passar o token e o id do usuário!')
}

function start () {
  let ws = adonis.Ws('ws://localhost:3333')

  ws = ws.withJwtToken(token)

  ws = ws.connect()

  ws.on('open', () => {
    online = true
  })

  ws.on('error', () => {
    online = false
  })

  return ws
}

function ajax (url, data, method = 'post') {
  return new Promise((resolve, reject) => {
    $.ajax(`http://localhost:3333${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      dataType: 'json',
      data
    })
      .done(data => resolve(data))
      .fail(e => reject(e))
  })
}

function $likes (likes, type = 'post') {
  console.log(likes)
  $(`span[data-${type}-id="${likes.id}"]`).text(likes.count)
}
