;(function ($) {
  let ws = start()

  const posts = ws.subscribe('posts')

  posts.on('new', post => $('.posts').prepend(Template.post(post)))
  posts.on('likes', likes => $likes(likes))

  const notification = ws.subscribe(`notification:${userId}`)
  notification.on('message', notification =>
    $('.notification > ul').prepend(Template.notification(notification))
  )

  const comments = ws.subscribe('comments')
  comments.on('new', ({ comment }) => {
    $(`.posts .comments[data-post-id="${comment.post_id}"] ul`).append(
      Template.comment(comment)
    )
  })

  ajax('/posts', null, 'get')
    .then(posts => {
      posts.forEach(post => {
        $('.posts').append(Template.post(post))
        post.comments.forEach(comment => {
          $(`.posts .comments[data-post-id="${post.id}"] ul`).append(
            Template.comment(comment)
          )
        })
      })
    })
    .catch(e => {
      console.log(e)
    })

  $('#publish-post').on('click', async () => {
    const content = $('#post').val()
    $('#post').val('')

    if (!content) {
      alert('Escreva alguma coisa para postar!')
      return
    }

    await ajax('/posts', {
      content
    })
  })

  $('body').on('click', '.comment-post', async function (e) {
    e.preventDefault()
    const id = e.target.dataset.postId
    const content = $(
      `.comment-area .group textarea[data-post-id="${id}"]`
    ).val()

    $(`.comment-area .group textarea[data-post-id="${id}"]`).val('')

    if (!content) {
      alert('Escreva alguma coisa para postar!')
      return
    }

    await ajax(`/posts/${id}/comments`, { content })
  })

  $('body').on('click', '.like-post', async function (e) {
    e.preventDefault()
    const id = $(this).data('id')
    await ajax(`/posts/${id}/likes`)
  })
})(jQuery)
