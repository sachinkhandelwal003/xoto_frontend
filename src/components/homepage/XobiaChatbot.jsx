import { useState, useRef, useEffect } from "react";
import { FiX, FiMic, FiSend, FiVolume2 } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import xobiaAvatar from "../../assets/img/girlimage.png";
import { motion, AnimatePresence } from "framer-motion";
import { getChatSessionId } from "../../utils/createSessionID";
const API = "https://xoto.ae";

function XobiaChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [botSpeaking, setBotSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);


  const chatEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🔥 SINGLE AUDIO CONTROLLER
  const audioRef = useRef(null);

  /* ================= FETCH OLD MESSAGES ================= */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const session_id = getChatSessionId();
        const res = await fetch(
          `${API}/api/ai/chat/get-all-messages?session_id=${session_id}`
        );
        const data = await res.json();

        const formatted = data.map((msg) => ({
          id: msg._id,
          role: msg.sender === "user" ? "user" : "bot",
          text: msg.text || "",
          audioUrl: msg.audioUrl || null,
          type: msg.audioUrl ? "audio" : "text",
          autoPlay: false,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formatted);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, voiceLoading]);

  /* ================= SAFE AUDIO PLAYER ================= */
 const playBotAudio = (url, messageId) => {
  // 🔇 Stop previous audio
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = "";
    audioRef.current = null;
  }

  const audio = new Audio(url);
  audioRef.current = audio;

  // 🔥 Mark only THIS message as speaking
  setBotSpeaking(true);
  setSpeakingMessageId(messageId);

  audio.play().catch(() => {});

  audio.onended = () => {
    setBotSpeaking(false);
    setSpeakingMessageId(null);
    audioRef.current = null;
  };
};

  /* ================= AUTOPLAY BOT AUDIO ================= */
 useEffect(() => {
  const lastMessage = messages[messages.length - 1];

  if (
    lastMessage?.role === "bot" &&
    lastMessage?.type === "audio" &&
    lastMessage?.audioUrl &&
    lastMessage?.autoPlay
  ) {
    playBotAudio(lastMessage.audioUrl, lastMessage.id);
  }
}, [messages]);

  /* ================= CHAT CLOSE = FORCE STOP ================= */
 useEffect(() => {
  if (!isOpen && audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = "";
    audioRef.current = null;
    setBotSpeaking(false);
    setSpeakingMessageId(null);
  }
}, [isOpen]);
  /* ================= COMPONENT UNMOUNT CLEANUP ================= */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  /* ================= SEND TEXT ================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      type: "text",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", userMsg.text);
      formData.append("session_id", getChatSessionId());

      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: data.ai?.text || data.text || "",
          audioUrl: data.ai?.audioUrl || null,
          type: data.ai?.audioUrl ? "audio" : "text",
          autoPlay: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "bot",
          type: "text",
          text: "Sorry, something went wrong.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

  /* ================= SEND VOICE ================= */
  const sendAudioMessage = async (audioBlob) => {
    try {
      setVoiceLoading(true);

      const formData = new FormData();
      formData.append("audio", audioBlob, "voice.webm");
      formData.append("session_id", getChatSessionId());

      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: data.ai?.text || "",
          audioUrl: data.ai?.audioUrl || null,
          type: "audio",
          autoPlay: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "bot",
          type: "text",
          text: "Could not process voice message.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setVoiceLoading(false);
    }
  };

  /* ================= RECORD ================= */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "user",
          type: "voice-sent",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      await sendAudioMessage(blob);
      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const SpeakingIndicator = () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-purple-600">
        Xobia is speaking
      </span>
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );

 

return (
    <>
      {/* Floating Chat Button */}
    <AnimatePresence>
  {!isOpen && (
    <motion.button
      // 1. Entrance: Comes from top of screen to fixed bottom position
      initial={{ y: -1000, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 60, 
        damping: 15, 
        delay: 0.5 // Adjust delay as needed
      }}
      // 2. Continuous Floating Effect
      whileInView={{
        y: [0, -10, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(139, 92, 246, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      // 3. Premium Solid Styling
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4 bg-white border border-slate-100 py-2 pl-6 pr-2 rounded-full shadow-[0_15px_35px_-5px_rgba(0,0,0,0.2)]"
    >
      {/* Text on Left */}
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase tracking-widest text-purple-500 font-bold">
          AI Expert
        </span>
        <span className="text-slate-900 font-extrabold text-sm md:text-base">
          Talk with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Xobia</span>
        </span>
      </div>

      {/* Image on Right with Purple Ring */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-blue-500 rounded-full p-[1px] shadow-lg">
        <div className="w-full h-full animate-come-up  rounded-full ">
          <img 
            src={xobiaAvatar} 
            alt="Xobia" 
            className="w-full h-55px object-cover animate-entrance-bottom scale-110 mt-1" 
          />
        </div>
        {/* Active Status */}
        <span className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
    </motion.button>
  )}
</AnimatePresence>
      {/* Chat Widget - HEADER SE BAHUT NICHE */}
      {isOpen && (
        <>
          {/* Backdrop - Only for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* CHAT WIDGET - BAHUT NICHE (md:top-48 se aur neeche) */}
          <div className="fixed bottom-16 md:top-38 right-4 md:right-8 z-50 w-full max-w-sm md:max-w-md mx-auto">
            {/* Expanded View Only - No Minimized View */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[70vh] md:h-[550px] w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <BsRobot className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base md:text-lg">Talk with Xobia</h2>
                    <p className="text-xs md:text-sm text-white/80">Your AI design & property assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <FiX className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <BsRobot className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1 md:mb-2">Hi, I'm Xobia! 👋</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 max-w-xs">
                      Ask me about home designs, properties, or anything else!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[90%] md:max-w-[85%] rounded-2xl px-3 py-2 md:px-4 md:py-3 ${
                            m.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100"
                          }`}
                        >
 {/* USER VOICE */}
{m.role === "user" && m.type === "voice-sent" && (
  <p className="text-xs font-medium text-white/90">
    🎙️ Voice note sent
  </p>
)}

{/* BOT AUDIO */}
{m.role === "bot" && m.type === "audio" && (
  <>
    {botSpeaking && speakingMessageId === m.id ? (
      <SpeakingIndicator />
    ) : (
      <p className="text-sm font-medium text-gray-600">
        ✅ Voice reply delivered
      </p>
    )}
  </>
)}

{/* TEXT */}
{m.type === "text" && (
  <p className="text-xs md:text-sm md:text-base">
    {m.text}
  </p>
)}

                          {/* Timestamp */}
                          <div className={`flex items-center justify-end mt-1 md:mt-2 ${
                            m.role === "user" ? "text-blue-100" : "text-gray-500"
                          }`}>
                            <span className="text-[10px] md:text-xs">{m.timestamp}</span>
                            {m.role === "user" && (
                              <span className="ml-1 md:ml-2 text-[10px] md:text-xs">✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Loading Indicator for Text */}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] md:max-w-[70%] bg-white rounded-2xl rounded-bl-none p-3 md:p-4 shadow-md border border-gray-100">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                            <span className="text-xs md:text-sm text-gray-600 font-medium">Generating response...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Loading Indicator for Voice Processing */}
                    {voiceLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] md:max-w-[70%] bg-white rounded-2xl rounded-bl-none p-3 md:p-4 shadow-md border border-gray-100">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                            <span className="text-xs md:text-sm text-gray-600 font-medium">Analyzing voice input...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area - REMOVED "ENTER TO SEND" HINT */}
              <div className="border-t border-gray-200 p-3 md:p-4 bg-white">
                <div className="flex items-center gap-1 md:gap-2">
                  {/* Recording Button */}
                  <button
                    onClick={recording ? stopRecording : startRecording}
                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
                      recording
                        ? "bg-red-500 hover:bg-red-600 animate-pulse text-white"
                        : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 hover:from-blue-200 hover:to-purple-200"
                    }`}
                    disabled={loading || voiceLoading}
                    aria-label={recording ? "Stop recording" : "Start recording"}
                  >
                    {recording ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white"></div>
                      </div>
                    ) : (
                      <FiMic className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>

                  {/* Text Input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      disabled={loading || recording || voiceLoading}
                      rows={1}
                      className="w-full px-3 py-2 md:px-4 md:py-3 pr-10 md:pr-12 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs md:text-sm disabled:opacity-50"
                    />
                    
                    {/* Send Button */}
                    {input.trim() && (
                      <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading || voiceLoading}
                        className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-1.5 md:p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                      >
                        <FiSend className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Recording Indicator */}
                {recording && (
                  <div className="mt-2 md:mt-3 flex items-center justify-center">
                    <div className="flex items-center gap-1 md:gap-2 bg-red-50 text-red-600 px-2 py-1 md:px-4 md:py-2 rounded-full">
                      <div className="flex gap-0.5 md:gap-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                      <span className="text-xs md:text-sm font-medium">Recording... Click to stop</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default XobiaChatbot;