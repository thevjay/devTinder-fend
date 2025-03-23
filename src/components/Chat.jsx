import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chat = () => {
    const user = useSelector((store)=> store.user)
    const userId = user ? user._id : null;

    const [newMessage, setNewMessage] = useState("")
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);


    const fetchChatMessages = async() => {
      const chat = await axios.get(BASE_URL+'/chat/'+targetUserId,{
        withCredentials:true,
      })

      console.log(chat.data.messages);

      const chatMessage = chat?.data?.messages?.map((msg)=>{
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        }
      })

      setMessages(chatMessage)
    }

    useEffect(()=>{
      fetchChatMessages()
    },[])

    const sendMessage = () =>{
      const socket = createSocketConnection();

      socket.emit("sendMessage",{
        firstName:user.firstName,
        userId,
        targetUserId,
        text: newMessage
      })
      setNewMessage("")
    }

    useEffect(()=>{
      if(!userId) return;
      const socket = createSocketConnection();
      // As soon as the page loaded , the socket connection is made and joinChat event is emitted
      socket.emit("joinChat",{ 
        firstName: user.firstName,
        userId,
        targetUserId 
      });

      socket.on("messageReceived",({ firstName, lastName,text })=>{
        console.log(firstName+" "+ text)
        setMessages( (prevMsg) => [...prevMsg,{firstName,lastName,text}]);
        
      })

      return () => {
        socket.disconnect();
      };

    },[userId, targetUserId])

  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>{messages.map((msg,index)=>{
        return (
          <div 
              className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`} 
              key={index}
          >
            <div className="chat-header">
                {msg?.firstName + " " + (msg?.lastName) || "" }
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        )
      })}</div>

      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input 
          value={newMessage} 
          className='flex-1 border border-gray-500 text-white rounded-lg p-2' 
          onChange={(e)=>setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
      </div>
    </div>
  )
}

export default Chat
