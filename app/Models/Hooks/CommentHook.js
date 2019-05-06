'use strict'

const Ws = use('Ws')

const CommentHook = (exports = module.exports = {})

CommentHook.method = async modelInstance => {}

CommentHook.sendWs = async comment => {
  const topic = Ws.getChannel('comments').topic('comments')
  if (topic) {
    await comment.load('user')
    topic.broadcast('new', { comment })
  }
}
