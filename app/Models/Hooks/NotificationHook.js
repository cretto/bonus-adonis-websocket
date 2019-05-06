'use strict'

const Ws = use('Ws')

const NotificationHook = (exports = module.exports = {})

NotificationHook.method = async modelInstance => {}

NotificationHook.sendWs = async notification => {
  const topic = Ws.getChannel('notification:*').topic(
    `notification:${notification.user_id}`
  )

  topic && topic.broadcast('message', notification)
}
