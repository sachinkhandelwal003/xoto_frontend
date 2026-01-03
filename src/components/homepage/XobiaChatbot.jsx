import { useState, useRef, useEffect } from "react";
import { FiX, FiMic, FiSend, FiVolume2 } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

const API = "https://xoto.ae";

function XobiaChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const chatEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recording, setRecording] = useState(false);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API}/api/ai/chat/get-all-messages`);
        const data = await res.json();

        const formatted = data.map((msg) => ({
          id: msg._id,
          role: msg.sender === "user" ? "user" : "bot",
          text: msg.text,
          audioUrl: msg.audioUrl,
          type: msg.type || "text",
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

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, voiceLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: `${Date.now()}-${Math.random()}`,
      role: "user",
      text: input,
      audioUrl: null,
      type: "text",
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

      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const aiResponse = {
        id: `${Date.now()}-${Math.random()}`,
        role: "bot",
        text: data.ai?.text || data.text || "I'm here to help!",
        audioUrl: data.ai?.audioUrl || data.audioUrl || null,
        type: data.ai?.audioUrl ? "audio" : "text",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          role: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again.",
          type: "text",
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

  const sendAudioMessage = async (audioBlob) => {
    try {
      setVoiceLoading(true);
      
      const formData = new FormData();
      formData.append("audio", audioBlob, "voice.webm");

      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        body: formData,
      });

      const raw = await res.text();

      if (!res.ok) {
        console.error("Backend error:", raw);
        throw new Error("Backend error");
      }

      const data = JSON.parse(raw);

      const aiResponse = {
        id: Date.now() + 1,
        role: "bot",
        text: data.ai?.text || data.text || "I received your voice message!",
        audioUrl: data.ai?.audioUrl || data.audioUrl || null,
        type: (data.ai?.audioUrl || data.audioUrl) ? "audio" : "text",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("Audio upload failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Sorry, I couldn't process your voice message. Please try again.",
          type: "text",
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const webmBlob = new Blob(audioChunksRef.current, {
            type: mimeType
          });

          if (webmBlob.size < 1000) {
            console.error("❌ Empty or too short audio");
            return;
          }

          const audioUrl = URL.createObjectURL(webmBlob);

          const voiceMessage = {
            id: Date.now(),
            role: "user",
            audioUrl,
            type: "audio",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          };

          setMessages(prev => [...prev, voiceMessage]);

          await sendAudioMessage(webmBlob);

          stream.getTracks().forEach((t) => t.stop());
          audioChunksRef.current = [];

        } catch (err) {
          console.error("Recording stop error:", err);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Please allow microphone access to record voice messages.");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Chat with Xobia"
        >
          <div className="relative">
            <BsRobot className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          <span className="font-semibold text-xs md:text-sm">Chat with Xobia</span>
        </button>
      )}

      {/* Chat Widget - HEADER SE BAHUT NICHE */}
      {isOpen && (
        <>
          {/* Backdrop - Only for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* CHAT WIDGET - BAHUT NICHE (md:top-48 se aur neeche) */}
          <div className="fixed bottom-16 md:top-32 right-2 md:right-8 z-50 w-full max-w-sm md:max-w-md mx-auto">
            {/* Expanded View Only - No Minimized View */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[70vh] md:h-[550px] w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <BsRobot className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base md:text-lg">Chat with Xobia</h2>
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
                          {/* Audio Message */}
                          {m.type === "audio" ? (
                            <div className="space-y-1 md:space-y-2">
                              {/* Audio Player */}
                              <div className="flex items-center gap-2 md:gap-3 bg-gray-100 rounded-lg p-1 md:p-2">
                                <button 
                                  className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    const audio = new Audio(m.audioUrl);
                                    audio.play();
                                  }}
                                >
                                  <FiVolume2 className="w-3 h-3 md:w-4 md:h-4" />
                                </button>
                                <audio
                                  controls
                                  src={m.audioUrl}
                                  className="flex-1 h-6 md:h-8"
                                  controlsList="nodownload"
                                />
                              </div>
                            </div>
                          ) : (
                            /* Text Message */
                            <div>
                              <p className="text-xs md:text-sm md:text-base">{m.text}</p>
                            </div>
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