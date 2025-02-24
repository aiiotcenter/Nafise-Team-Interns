import React, { useRef } from "react"
import { Message } from "../page";
import { SendIcon } from "./SendIcon";

interface Props {
  chatHistory:Message[];
  setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
  generateBotResponse:(history: Message[])=>void
  }

const ChatForm = ({setChatHistory,chatHistory,generateBotResponse}:Props ) => {
    const inputRef=useRef<HTMLInputElement>(null);
    
    const handleFormSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const userMessage=inputRef.current?.value.trim();
        if(!userMessage) return ;


        setChatHistory((history)=>[...history,{role:"user",text:userMessage}]);

        if (inputRef.current) {
            inputRef.current.value = "";
          }

      setTimeout(()=>{
        setChatHistory((history)=>[...history,{role:"model",text:"Thinking..."}]);
    
      generateBotResponse([...chatHistory,{role:"user",text:userMessage}]);},600);
    }

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
        <button type="submit" className="material-symbol-rounded"><SendIcon/></button>

    </form>
  )
}
export default ChatForm;