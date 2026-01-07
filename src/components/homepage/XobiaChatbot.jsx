import { useState, useRef, useEffect } from "react";
import { FiX, FiMic, FiSend } from "react-icons/fi";
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
  const [isHolding, setIsHolding] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const chatEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const holdTimerRef = useRef(null);
  const recordingTimerRef = useRef(null);

  /* ================= STOP ALL AUDIO FUNCTIONS ================= */
  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
      audioRef.current = null;
      setBotSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  const stopAllRecording = () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setRecordingTime(0);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }
      
      audioChunksRef.current = [];
    }
    
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    
    setIsHolding(false);
  };

  /* ================= CHAT CLOSE - COMPLETE CLEANUP ================= */
  const handleCloseChat = () => {
    stopAllAudio();
    stopAllRecording();
    setIsOpen(false);
  };

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

    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, voiceLoading]);

  /* ================= SAFE AUDIO PLAYER ================= */
  const playBotAudio = (url, messageId) => {
    stopAllAudio();
    
    const audio = new Audio(url);
    audioRef.current = audio;

    setBotSpeaking(true);
    setSpeakingMessageId(messageId);

    audio.play().catch((err) => {
      console.error("Audio play error:", err);
      setBotSpeaking(false);
      setSpeakingMessageId(null);
    });

    audio.onended = () => {
      setBotSpeaking(false);
      setSpeakingMessageId(null);
      audioRef.current = null;
    };

    audio.onerror = () => {
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
      stopAllRecording();
      playBotAudio(lastMessage.audioUrl, lastMessage.id);
    }
  }, [messages]);

  /* ================= CLEANUP WHEN UNMOUNTING ================= */
  useEffect(() => {
    return () => {
      stopAllAudio();
      stopAllRecording();
    };
  }, []);

  /* ================= SEND TEXT ================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    stopAllRecording();
    
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

  /* ================= SIMPLE RECORDING FUNCTIONS ================= */
  const handleMouseDown = () => {
    if (loading || voiceLoading) return;
    
    if (botSpeaking) {
      stopAllAudio();
    }
    
    setIsHolding(true);
    
    // Start recording after 300ms
    holdTimerRef.current = setTimeout(() => {
      startRecording();
    }, 300);
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    
    // If user released before 300ms, don't start recording
    if (!recording) {
      setIsHolding(false);
      return;
    }
    
    // If recording, stop and send
    if (recording) {
      stopRecordingAndSend();
    }
    
    setIsHolding(false);
  };

  const startRecording = async () => {
    try {
      stopAllAudio();
      
      if (recording) {
        mediaRecorderRef.current?.stop();
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

      recorder.onstop = async () => {
        // Send the recording
        if (audioChunksRef.current.length > 0) {
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
        }
        
        // Cleanup stream
        stream.getTracks().forEach((t) => {
          t.stop();
          t.enabled = false;
        });
        
        setRecordingTime(0);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      };

      recorder.start();
      setRecording(true);
      
      // Start recording timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Recording error:", error);
      setIsHolding(false);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "bot",
          type: "text",
          text: "Could not access microphone. Please check permissions.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  const stopRecordingAndSend = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              delay: 0.5
            }}
            whileInView={{
              y: [0, -10, 0],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4 bg-white border border-slate-100 py-2 pl-6 pr-2 rounded-full shadow-[0_15px_35px_-5px_rgba(0,0,0,0.2)]"
          >
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
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={handleCloseChat}
          ></div>

          <div className="fixed bottom-16 md:top-38 right-4 md:right-8 z-50 w-full max-w-sm md:max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[70vh] md:h-[550px] w-full">
              {/* Header with Close Button */}
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
                    onClick={handleCloseChat}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close chat"
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
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                      💡 Hold mic button to record voice message
                    </div>
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

                    {/* Loading Indicators */}
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

              {/* Input Area - SIMPLE */}
              <div className="border-t border-gray-200 p-3 md:p-4 bg-white">
                <div className="flex items-center gap-1 md:gap-2">
                  {/* Recording Button - SIMPLE */}
                  <button
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all relative ${
                      isHolding && !recording
                        ? "bg-gradient-to-r from-blue-200 to-purple-200 scale-110"
                        : recording
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-pulse"
                          : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 hover:from-blue-200 hover:to-purple-200"
                    }`}
                    disabled={loading || voiceLoading}
                    aria-label={recording ? "Recording in progress" : "Hold to record"}
                  >
                    {recording ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white"></div>
                      </div>
                    ) : (
                      <FiMic className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                    
                    {/* Recording indicator */}
                    {recording && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded-full shadow whitespace-nowrap">
                        ● {formatTime(recordingTime)}
                      </span>
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

                {/* Instructions - SIMPLE */}
                <div className="mt-2 text-center">
                  {isHolding && !recording && (
                    <div className="flex flex-col items-center">
                      <p className="text-xs text-purple-600 font-medium mb-1">
                        Keep holding to record...
                      </p>
                      <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 animate-pulse" style={{ animationDuration: '0.3s' }}></div>
                      </div>
                    </div>
                  )}

                  {recording && (
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xs text-purple-600 font-medium">
                        🎤 Recording... {formatTime(recordingTime)} • Release to send
                      </p>
                      <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 animate-pulse" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  )}

                  {!isHolding && !recording && (
                    <p className="text-xs text-gray-500">
                      💡 Hold mic button to record voice message
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default XobiaChatbot;