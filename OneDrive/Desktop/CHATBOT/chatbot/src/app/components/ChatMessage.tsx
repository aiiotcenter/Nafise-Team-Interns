import { ChatbotIcon } from "./ChatbotIcon"
import { Message } from "../page";

interface ChatMessageProps {
    chat: Message ;
}

const ChatMessage = ({chat}:ChatMessageProps) => {
    return (
        <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError?"error":"" }`}>
            {chat.role === "model" && <ChatbotIcon />}
            <p className='message-text'> {chat.text}</p>
        </div>
    )
}


export default ChatMessage