import React, { createContext, useState } from 'react'
import run from '../gemini';

export const datacontext = createContext()
function UserContext({children}) {
  let[speaking,setSpeaking] = useState(false)
  let[prompt,setPrompt] = useState("listening...")
  let [response,setResponse] = useState(false)

  function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume=1;
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
  }
async function aiResponse(prompt) {
  let text = await run(prompt)
  let newText = text.split("**")&&text.split("*")&&text.replace("google","Abhishek Shaw")&&text.replace("Google","Abhishek Shaw")
  setPrompt(newText)
  speak(newText);
  setResponse(true)
  setTimeout(() => {
    setSpeaking(false)
  }, 6000)
  
}
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new speechRecognition()
recognition.onresult=(e)=>{
  let currentIndex = e.resultIndex
  let transcript = e.results[currentIndex][0].transcript
  setPrompt(transcript)
  takeCommand(transcript.toLowerCase())
}

async function takeCommand(command) {
  const sites = [
    { name: "youtube", url: "https://www.youtube.com/", speakText: "Opening YouTube" },
    { name: "instagram", url: "https://www.instagram.com/", speakText: "Opening Instagram" },
    { name: "linkedin", url: "https://www.linkedin.com/", speakText: "Opening LinkedIn" },
    { name: "google", url: "https://www.google.com/", speakText: "Opening Google" },
    { name: "facebook", url: "https://www.facebook.com/", speakText: "Opening Facebook" },
    { name: "twitter", url: "https://www.twitter.com/", speakText: "Opening Twitter" },
    { name: "github", url: "https://github.com/", speakText: "Opening GitHub" },
    { name: "stackoverflow", url: "https://stackoverflow.com/", speakText: "Opening Stack Overflow" },
    // ✅ Add more sites here if you want!
  ];

  let found = false;

  // ✅ Open site command
  for (const site of sites) {
    if (command.includes("open") && command.includes(site.name)) {
      window.open(site.url, "_blank");
      speak(site.speakText);
      setResponse(true)
      setPrompt(`${site.speakText}...`);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
      found = true;
      break;
    }
  }

  // ✅ Play song by name
  if (!found && command.includes("play")) {
    let songName = command.split("play")[1].trim();
    if (songName.length > 0) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`;
      window.open(searchUrl, "_blank");
      speak(`Playing ${songName} on YouTube`);
      setResponse(true)
      setPrompt(`Playing ${songName} on YouTube...`);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
      found = true;
    }
  }

  // ✅ Date command
  if (!found && command.includes("date")) {
    const date = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    speak(`Today is ${date}`);
    setResponse(true)
    setPrompt(`Today is ${date}`);
    setTimeout(()=>{
      setSpeaking(false);
    },5000)
    found = true;
  }

  // ✅ Time command
  if (!found && command.includes("time")) {
    const time = new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(`The current time is ${time}`);
    setResponse(true)
    setPrompt(`The current time is ${time}`);
    setTimeout(()=>{
      setSpeaking(false);
    },5000)
    
    found = true;
  }

  // ✅ Weather command (dummy, replace with real API if needed)
  if (!found && command.includes("weather")) {
    const weather = "It's sunny and 25 degrees Celsius."; // Replace with real API later
    speak(weather);
    setResponse(true)
    setPrompt(weather);
    setSpeaking(false);
    found = true;
  }

  // ✅ Fallback to AI response
  if (!found) {
    aiResponse(command);
  }
}

  let value = { recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse
  }
  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
      </div>
  )
}

export default UserContext