'use strict'

const Ws = use('Ws')
const Like = use('App/Models/LikePost')
const Notification = use('App/Models/Notification')

const LikePostHook = (exports = module.exports = {})

LikePostHook.method = async modelInstance => {}

LikePostHook.sendWs = async like => {
  const topic = Ws.getChannel('posts').topic('posts')
  if (topic) {
    const [{ 'count(*)': count }] = await Like.query()
      .where('post_id', like.post_id)
      .count()
    topic.broadcast('likes', { count, id: like.post_id })
  }
}

LikePostHook.notifyUser = async likePost => {
  const post = await likePost.post().fetch()
  if (post.user_id !== likePost.user_id) {
    const user = await likePost.user().fetch()
    await Notification.create({
      user_id: post.user_id,
      content: `<b>${user.username}</b> curtiu seu post`
    })
  }
}
