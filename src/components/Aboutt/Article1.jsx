import React from 'react'
import bgImage from "../../assets/img/top-view-dubai 2.jpg";
const Article1 = () => {
  return (
    <div>
 <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
 <div className="hidden lg:block absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
      {/* content */}
      <div className="relative text-center px-6">
        <h1
          className="text-white font-extrabold heading-light"
          style={{
            
            fontSize: "50px",
            lineHeight: "76px",
            letterSpacing: "0px",
            textShadow: "0 4px 8px rgba(0,0,0,0.35)",
          }}
        >
          AI-Powered Disruptor In
          <br />
          Property Lifecycle
        </h1>

        <p
          className="text-white font-semibold mt-4 paragaph-light"
          style={{
            fontFamily: "'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontSize: "20px",
            lineHeight: "30px",
            textShadow: "0 2px 6px rgba(0,0,0,0.45)",
          }}
        >
          Driven by AI. Built for Everyone
        </p>
      </div>
    </section>
    </div>
  )
}

export default Article1