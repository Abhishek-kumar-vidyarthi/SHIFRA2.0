import React, { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"
import { FaMicrophone } from "react-icons/fa";
import { datacontext } from './context/UserContext';

function App() {
  let {recognition,speaking,setSpeaking,prompt,setPrompt,response} = useContext(datacontext)

  return (
    <div className='main'>
      <img src={va} alt="" id='shifra' />
      <span>I'm Shifra, Your Advanced Virtual Assistant</span>
      {!speaking ?
      <button onClick={()=>{
      setPrompt("listening...")
      setSpeaking(true)
      recognition.start()}}>Click here <FaMicrophone /></button>
      :
      <div className='response'>
        {!response ? 
        <img src={speakimg} alt="" id="speak"/> : 
        <img src={aigif} alt="" id="aigif"/>
        }

<p>{prompt}</p>
      </div>
      }
      
    </div>
  )
}

export default App
