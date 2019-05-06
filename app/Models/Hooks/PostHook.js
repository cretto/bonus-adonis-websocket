'use strict'

const Ws = use('Ws')

const PostHook = (exports = module.exports = {})

PostHook.method = async modelInstance => {}

PostHook.sendWs = async post => {
  const topic = Ws.getChannel('posts').topic('posts')
  if (topic) {
    await post.loadMany(['user', 'comments'])
    topic.broadcast('new', post)
  }
}
