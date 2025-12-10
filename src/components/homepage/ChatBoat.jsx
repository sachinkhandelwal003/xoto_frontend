import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ChatBoat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm Xoto. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Xoto received your message!" },
      ]);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full bg-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-purple-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
        <span>Xoto Assistant</span>

        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-purple-700 text-xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 no-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow ${
              msg.from === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBoat;
