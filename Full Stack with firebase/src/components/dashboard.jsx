import React from 'react'
import Navbar from './navbar'
import MySubmissions from './allSubmission'
import Footer from './footer'
import { ThreeDMarqueeDemoSecond } from './3dmarqueeEffect'
import ChatBotToggle from './ChatBot/chatBot'

const Dashboard = () => {
  return (
    <>
    <div>
        <div className='bg-black'><Navbar/></div>
        
      <ThreeDMarqueeDemoSecond/>
      <MySubmissions/>
      <Footer/>
      <ChatBotToggle/>
    </div>
    </>
  )
}

export default Dashboard
