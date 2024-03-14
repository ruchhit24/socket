import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'


const server = express()

const server2 = createServer(server)

const io = new Server(server2 , {
    cors : {
        origin : 'http://localhost:5173',
        methods : ['GET' , 'POST'],
        credentials : true
    }
})

io.on('connection',(socket)=>{
  console.log(`User connected with id =  ${socket.id}`)
  socket.emit("event1" , "welcome from backend")
  socket.broadcast.emit("welcome",`${socket.id} has joined the group!!`)
})

io.on('disconnect' , ()=>{
    console.log(`user with id ${socket.id} is disconnected!!`)
})


server.get('/',(req,res)=>{
    res.send('hello world')
})

const port = 3000;

server2.listen(port,()=>{
    console.log(`server is listening at ${port}`)
})