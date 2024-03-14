 import React, { useEffect } from 'react'
 import {io} from 'socket.io-client'


 const App = () => {
  const socket = io('http://localhost:3000')

  useEffect(()=>{
   socket.on("connect",()=>{
    console.log('connected on frontend with userid',socket.id)
   })

   socket.on("event1",(data)=>{
    console.log(data)
   })

   socket.on('welcome',(data)=>{
    console.log(data)
   })

   return ()=>{
    socket.disconnect()
   }
   
  },[])

   return (
     <div>App</div>
   )
 }
 
 export default App