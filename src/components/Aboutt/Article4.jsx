import React from 'react'
import roomImage from '../../assets/img/ui-ux-design_1197721-139046 1.png'

const Article4= () => {
  return (
    <div>
       <section className="ai-dna-section bg-[linear-gradient(to_bottom,#5C039B,#03A4F4) h-[500px]]
">
      <div className="ai-dna-container">

        {/* LEFT SIDE */}
        <div className="ai-dna-left">
          <h2 className="ai-dna-title">AI In Our DNA</h2>

          <p className="ai-dna-body">
            At XOTO, artificial intelligence powers every touchpoint, making
            property discovery, design, financing, and management smarter,
            faster, and more personalized for every stakeholder.
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="ai-dna-right">
          <img src={roomImage} alt="3D Room" className="ai-dna-img" />
        </div>
      </div>

      <style>{`
        /* Import DM Sans */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .ai-dna-section {
          width: 100%;
          background: linear-gradient(180deg, #00A7FF 0%, #296EF0 40%, #5C1BB0 100%);
          padding: 60px 0;
          color: #fff;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .ai-dna-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        /* Left Block */
        .ai-dna-left {
          flex: 1;
          max-width: 550px;
        }

        /* Figma EXACT VALUES */
        .ai-dna-title {
          font-size: 60px;
          font-weight: 600;
          line-height: 55px;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          color: #fff;
        }

        .ai-dna-body {
          font-size: 24px;
          font-weight: 500;
          line-height: 33px;
          letter-spacing: 0;
          color: #fff;
          max-width: 520px;
        }

        /* Right image */
        .ai-dna-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        .ai-dna-img {
          width: 520px;
          max-width: 100%;
          object-fit: contain;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ai-dna-title { font-size: 48px; line-height: 45px; }
          .ai-dna-body { font-size: 20px; line-height: 30px; }
          .ai-dna-img { width: 420px; }
        }

        @media (max-width: 768px) {
          .ai-dna-container {
            flex-direction: column;
            text-align: left;
          }
          .ai-dna-title { font-size: 40px; line-height: 38px; }
          .ai-dna-body { font-size: 18px; line-height: 26px; }
          .ai-dna-img { width: 320px; margin-top: 20px; }
        }
      `}</style>
    </section>
    </div>
  )
}

export default Article4;