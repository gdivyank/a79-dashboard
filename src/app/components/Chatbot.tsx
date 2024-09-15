import { useState } from "react";
import { createMessage } from "../api/conversation/route";
const Chatbot = ({ selectedRows }: { selectedRows: any[] }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    const userMessage = {
      content: input,
      role: "user",
      message_context: {
        tabular_data: JSON.stringify(selectedRows),
      },
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = await createMessage(userMessage);
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    setInput(""); 
  };
  const handleKeyDown = (e) => {
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
