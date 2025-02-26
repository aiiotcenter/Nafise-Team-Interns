"use client"
import { useEffect, useRef, useState } from "react";
import { ChatbotIcon } from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { CloseIcon } from "./components/CloseIcon";
import { ArrowDown } from "./components/ArrowDown";
import { usePathname } from "next/navigation";
import { Chatbottof } from "./components/Chatbottof";



export interface Message {
  role:string;
  text:string;

}
const page = () => {
  const[chatHistory,setChatHistory]=useState<Message[]>([]);
  const [showChatbot,setShowChatbot]=useState(false);
  const chatBodyRef=useRef<HTMLDivElement | null>(null);
  const pathname=usePathname();
  const pageName=pathname==='/'?'Home':pathname.replace("/","")
  
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const generateBotResponse=async (history:Message[])=>{
try{
    setChatHistory(prev => [...prev, { role: "model", text: "Thinking..." }]);


const formattedHistory=history.map(({role,text})=>({
  role,
  parts:[{ text }]
}));

const response=await fetch(process.env.NEXT_PUBLIC_API_URL! ,{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ contents: formattedHistory })
} );

const data=await response.json();
if (!response.ok) {
  const errorMessage = data.error?.message || "Something went wrong!";
  throw new Error(errorMessage);
}
const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: apiResponseText }
      ]);
    } catch (error) {
      // Handle errors and clean up "Thinking..." message
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: `Error: ${errorMessage}` }
      ]);
    


/*const updateHistory=(text:string,isError=false)=>{
    setChatHistory((prev)=>[...prev.filter((msg)=>msg.text !=="Thinking..."),{role:"model",text}])
  }*/

  /*const requestOptions={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({contents: formattedHistory })
  } */

  
    /*if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API endpoint not configured");
    }
    
   */

    // Validate response structure
    /*if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid API response structure");
    }*/

    
    /*updateHistory(apiResponseText);
  }catch(error ){
    let errorMessage = "Unknown error occurred";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    updateHistory(errorMessage, true);
  }*/
    }
  }
  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ''}`} >
      <button onClick={()=>setShowChatbot(prev =>!prev)} id="chatbot-toggler"
        className="material-symbols-rounded">
          {showChatbot ? <CloseIcon/>:<Chatbottof/>}
        
      </button>
      <div className="chatbot-popup">
        {/*chat header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatbottof/>
            <h2 className="logo-text">Chatbot</h2>          
          </div>
          <button onClick={()=>setShowChatbot(prev =>!prev)} className="material-symbols-outlined">
            <ArrowDown/>
          </button>
        </div>
        {/*chat body */}
        <div className="chat-body" ref={chatBodyRef}>
          <div className="message bot-message">
            <Chatbottof/>
            <p className="message-text">
              Hello  to {pageName} page 👋 <br /> How can I help you today ? 😊
            </p>
          </div>


          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>

          {/*chat footer */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}/>
        
            
          </div>

        </div>
      </div>
    
  )
}
export default page; 