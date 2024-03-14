 import React, { useEffect, useMemo, useState } from 'react'
 import {io} from 'socket.io-client'
 import Container from '@mui/material/Container'
import { Box, Stack, Typography } from '@mui/material'

 const App = () => {
  const socket = useMemo(() => io('http://localhost:3000'),[]);

  const [msg,setMsg] = useState('');
  const[socketId , setSocketId] = useState('')
  const [roomId,setRoomId] = useState('')
  const[receivedMsg , setReceivedMsg] = useState ([])
  const [roomName,setRoomName] = useState('')

  useEffect(()=>{
   socket.on("connect",()=>{
    console.log('connected on frontend with userid',socket.id)
    setSocketId(socket.id)
   })

   socket.on("event1",(data)=>{
    console.log(data)
   })

   socket.on('welcome',(data)=>{
    console.log(data)
   })

   socket.on('received-msg',(data)=>{
    console.log(data)
    setReceivedMsg((prev) => [...prev,data] )
   })

   return ()=>{
    socket.disconnect()
   }
   
  },[])

  const handleSubmit = (e)=>{
  e.preventDefault()
  socket.emit('e1',{msg , roomId })
  setMsg('')
  }

  const handleRoom = (e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName)

  }

   return (
     <Container maxWidth='sm' sx={{ display : 'flex' , alignItems : 'center' , placeItems : 'center'}}>
        <Box>
        <Typography variant='h5'>{socketId}</Typography>
        <Typography variant='h4'>
        welcome to socket.io
       </Typography>
       <form onSubmit={handleRoom} >
         <label id='roomname'>Room Name</label>
         <input type='text' value={roomName} onChange={(e)=> setRoomName(e.target.value)}></input>
         <button type='submit'>Join</button>
       </form>
       <form onSubmit={handleSubmit}>
       <label id='roomKiIdDo' value>roomKiIdDo : </label>
        <input type='text' value={roomId} onChange={(e)=> setRoomId(e.target.value)} />
        <br/>
        <label id='message'>message : </label>
        <input type='text' value={msg} onChange={(e)=> setMsg(e.target.value)} />
        <button type='submit'>send</button>
       </form>
       <Stack>
          {
            receivedMsg.map((m,i)=>(
              <div key={i}>
                {m}
              </div>
             ) )
          }
       </Stack>
        </Box>
     </Container>
   )
 }
 
 export default App