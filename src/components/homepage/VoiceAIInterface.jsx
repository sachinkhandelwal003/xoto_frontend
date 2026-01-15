import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import GlobeAnimation from "./GlobeAnimation";
import { motion } from "framer-motion";

const PUBLIC_KEY = "84eaf008-b5f6-410a-abae-033778db7132";
const ASSISTANT_ID = "25802ec9-95e5-41b4-8478-5b7c6e2fb36a";

function VoiceAIInterface({ onClose }) {
  const vapiRef = useRef(null);
  const [callActive, setCallActive] = useState(false);
  const [status, setStatus] = useState("Tap to Speak"); // Initial Status

  useEffect(() => {
    const vapi = new Vapi(PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setStatus("Listening...");
      setCallActive(true);
    });

    vapi.on("call-end", () => {
      setStatus("Tap to Speak"); // Wapas Idle state par
      setCallActive(false);
    });

    vapi.on("speech-start", () => {
      setStatus("AI Speaking...");
    });

    vapi.on("speech-end", () => {
      setStatus("Listening...");
    });

    // NOTE: Maine auto-start hata diya hai taaki user mic press kare tab start ho.
    // Agar aap chahte hain aate hi start ho jaye, to niche wali line uncomment kar dein:
    // vapi.start(ASSISTANT_ID);

    return () => {
      vapi.stop();
    };
  }, []);

  const toggleCall = () => {
    if (callActive) {
      vapiRef.current.stop(); // Active hai to band karo (Idle)
    } else {
      vapiRef.current.start(ASSISTANT_ID); // Band hai to start karo (Listening)
    }
  };

  const handleClose = () => {
    vapiRef.current?.stop();
    onClose();
  };

  const isSpeaking = status === "AI Speaking...";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
      className="absolute inset-0 z-[50]"
    >
      {/* --- HEADER --- */}
      <div style={styles.header}>
        {/* Back Button (Stroke Black for White bg) */}
        <button style={styles.glassButton} onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        {/* Title */}
        <div style={styles.headerTitleContainer}>
          <span style={styles.headerTitle}>Xobia Voice</span>
        </div>
        
        {/* Placeholder */}
        <div style={{ width: "36px", height: "36px" }}></div>
      </div>

      {/* --- CENTER GLOBE --- */}
      <div style={styles.mainContent}>
        <div style={styles.globeWrapper}>
           <GlobeAnimation isSpeaking={isSpeaking} />
        </div>
        <p className={`text-sm mt-4 font-medium tracking-wide animate-pulse ${callActive ? "text-purple-600" : "text-gray-400"}`}>
          {status}
        </p>
      </div>

      {/* --- FOOTER (MIC) --- */}
      <div style={styles.footer}>
        <button 
          onClick={toggleCall}
          style={{
            ...styles.micButton,
            ...(callActive ? styles.micActiveScale : {})
          }}
        >
          <div style={{
             ...styles.micIconContainer,
             ...(isSpeaking ? styles.micSpeakingPulse : {})
          }}>
             {/* Mic Icon */}
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff", // ✅ White Background
    color: "#333", // Dark text
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    zIndex: 10,
  },
  headerTitleContainer: {
    background: "rgba(0, 0, 0, 0.05)", // Slight grey background for pill
    padding: "6px 16px",
    borderRadius: "30px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  headerTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#333", // Dark Text
    letterSpacing: "0.5px",
  },
  glassButton: {
    background: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.1)", // Light border
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 5,
    marginTop: "-20px"
  },
  globeWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "scale(0.9)", 
    // Purple shadow instead of pink
    filter: "drop-shadow(0 0 30px rgba(147, 51, 234, 0.2))"
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "30px",
    zIndex: 10,
  },
  micButton: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "none",
    // Purple Gradient
    background: "linear-gradient(180deg, #a855f7 0%, #7e22ce 100%)", 
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 25px rgba(126, 34, 206, 0.3)",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  micActiveScale: {
    transform: "scale(1.1)",
    // Stronger Purple Shadow when active
    boxShadow: "0 0 50px rgba(126, 34, 206, 0.6)",
    border: "3px solid #f3e8ff"
  },
  micIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  micSpeakingPulse: {
     animation: "micPulseAnimation 1s infinite alternate ease-in-out",
  }
};

export default VoiceAIInterface;