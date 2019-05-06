'use strict'

class CommentController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = CommentController
