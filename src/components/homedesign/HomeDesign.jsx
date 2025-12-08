import React from "react";
import { Link, useNavigate } from "react-router-dom";
import houseimage from "../../assets/img/home/house1.png";
import wave1 from "../../assets/img/wave/wave1.png";

const HomeDesign = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[var(--color-body)] pt-0 pb-10 overflow-hidden">
      <div className="w-full relative">

        {/* Background Wave Image */}
        <div className="absolute bottom-[-150px] left-0 w-full z-0">
          <img src={wave1} alt="wave" className="w-full pointer-events-none select-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">

          {/* LEFT SIDE TEXT */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="heading-light text-black">
              Your Space, <br />
              <span>Redefined Instantly.</span>
            </h2>

            <p className="paragraph-light-1" style={{ color: "var(--color-grey)" }}>
              Upload your villa layout and let <span>Xoto AI</span>
              craft stunning outdoor and design options — tailored to your taste.
            </p>

            <Link
              to="/schedule/estimate"
              className="bg-[var(--color-primary)] text-white px-15 py-3 rounded-lg font-semibold"
            >
              Get Free Estimate Now
            </Link>
          </div>

          {/* RIGHT SIDE — HOUSE IMAGE WITH CLICKABLE MAP */}
          <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0 px-4 sm:px-8">
            <img
              src={houseimage}
              alt="House Map"
              useMap="#house-map"
              className="w-full max-w-5xl object-cover drop-shadow-2xl select-none"
            />

            {/* IMAGE MAP */}
            <map name="house-map">
              {/* Image Perfection */}
              <area
                coords="80,420,280,500"
                shape="rect"
                alt="Image Perfection"
                title="Image Perfection"
                onClick={() => navigate("/image-perfection")}
                style={{ cursor: "pointer" }}
              />

              {/* Virtual Design Studio */}
              <area
                coords="100,250,300,330"
                shape="rect"
                alt="Virtual Design Studio"
                title="Virtual Design Studio"
                onClick={() => navigate("/virtual-design")}
                style={{ cursor: "pointer" }}
              />

              {/* Exterior Upgrade */}
              <area
                coords="330,40,520,120"
                shape="rect"
                alt="Exterior Upgrade"
                title="Exterior Upgrade"
                onClick={() => navigate("/exterior-upgrade")}
                style={{ cursor: "pointer" }}
              />

              {/* Interior Transformation */}
              <area
                coords="640,230,850,310"
                shape="rect"
                alt="Interior Transformation"
                title="Interior Transformation"
                onClick={() => navigate("/interior-transformation")}
                style={{ cursor: "pointer" }}
              />

              {/* Smart Furniture Swap */}
              <area
                coords="600,350,820,430"
                shape="rect"
                alt="Smart Furniture Swap"
                title="Smart Furniture Swap"
                onClick={() => navigate("/smart-furniture")}
                style={{ cursor: "pointer" }}
              />

              {/* Landscaping */}
             <area
  alt="Landscaping"
  title="Landscaping"
  coords="300,520,550,630"
  shape="rect"
  onClick={() => navigate('/landscaping')}
  style={{ cursor: "pointer" }}
/>

            </map>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDesign;
