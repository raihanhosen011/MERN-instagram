let users = []

function SocketServer(socket){
  // JOIN USER
  socket.on("joinUser", id => {
    users.push({id, socketId : socket.id})
  })

  // LIKES
  socket.on("likePost", post => {
    if(post){
        const ids = [...post.user[0].followers,post.user[0]._id]
        const clients = users.filter((user) => ids.includes(user.id))
  
        if(clients.length > 0){
          clients.forEach(client => {
            socket.to(`${client.socketId}`).emit("likeToClient", post)
        })
    }
  }
  })

  // COMMENT
  socket.on("createComment", post => {
    if(post){
      const ids = [...post.user[0].followers,post.user[0]._id]
      const clients = users.filter((user) => ids.includes(user.id))

      if(clients.length > 0){
        clients.forEach(client => {
           socket.to(`${client.socketId}`).emit("commentToClient", post)
        })
      }
    }
  })

  // CREATE NOTIFICATION 
  socket.on("createNotification", (data) => {
    if(data){
      const client = users.find((user) => data.recipients.includes(user.id) )
      client && socket.to(`${client.socketId}`).emit("notificationToClient", data)     
    }
  })

  // MESSAGE
  socket.on('message', msg => {
    if(msg){
      const user = users.find(user => user.id === msg.recipient)
      user && socket.to(`${user.socketId}`).emit('messageToClient', msg)
    }
  })
}

module.exports = SocketServer