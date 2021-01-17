const express = require("express");
const app = express();
const moment = require('moment') 

const { addUser, removeUser, getUser,getOneUser } = require("./user");

const server = app.listen(7070);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    console.log(`client connection ${name} and ${room}`);

    const { error, user } = addUser({ id: socket.id, name, room });
    
    if(!error){
        socket.emit('message',{user:'Admin',text:`${user.name}, welcome to the room`, time:moment().format('h:mm a')})
        socket.broadcast.to(user.room).emit('message',{user:'Admin',text:`${user.name}, has joined!`, time:moment().format('h:mm a')})
        socket.join(user.room);

    }else{
        console.log(error)

    } 


  });


  socket.on('sendMessage',(message)=>{
      const user = getOneUser(socket.id);
      io.to(user.room).emit('message',{user: user.name , text:message, time:moment().format('h:mm a')})
  })

  socket.on("disconnect", () => {
      removeUser(socket.id)
      socket.emit('message',{user:'Admin',text:`user left`})
  });
});

app.get("/", (req, res, next) => {
  res.json({
    msg: "mes",
  });
});
