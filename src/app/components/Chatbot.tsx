import { useState } from "react";
import { RowData } from "../types";

// Define types for message and API response
interface Message {
  content: string;
  role: string;
  message_context?: {
    tabular_data?: string;
  };
}

interface BotResponse {
  id: number;
  content: string;
  message_context?: {tabular_data : string};
}

const Chatbot = ({ selectedRows }: { selectedRows: RowData[] }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    const userMessage: Message = {
      content: input,
      role: "user",
      message_context: {
        tabular_data: JSON.stringify(selectedRows),
      },
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Call the API endpoint
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const botResponse: BotResponse = await response.json();
      const botMessage: Message = {
        content: botResponse.content,
        role: "bot",
        message_context: botResponse.message_context,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput(""); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(); 
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add this event listener
            placeholder="Ask A79"
          />
          <div onClick={handleSendMessage} className="send-icon">
            <img
              src={"icons/send-icon.svg"}
              alt="Send"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
