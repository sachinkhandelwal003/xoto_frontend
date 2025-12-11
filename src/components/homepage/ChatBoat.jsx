import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ChatBoat = ({ onClose }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if widget script is loaded
    const check = setInterval(() => {
      if (window.customElements?.get("vapi-widget")) {
        setReady(true);
        clearInterval(check);
      }
    }, 200);

    return () => clearInterval(check);
  }, []);

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

      {/* Widget Body */}
      <div className="flex-1 overflow-hidden relative">
        {!ready ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            Loading assistant...
          </div>
        ) : (
          <vapi-widget
            public-key="0c5b3eb5-76fc-46ce-a227-889f321291f6"
            assistant-id="2e5fdf84-bb62-4ea7-a620-ae5cb40d264a"
            mode="chat"
            theme="light"
            style={{ width: "100%", height: "100%" }}
          ></vapi-widget>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBoat;
