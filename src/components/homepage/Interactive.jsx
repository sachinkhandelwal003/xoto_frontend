import { Link } from "react-router-dom";
import wave2 from "../../assets/img/wave/wave2.png";
import interImage from "../../assets/img/inter.png";

export default function InteractiveBuilderSection() {
  return (
    <section className="relative bg-[var(--color-body)] pt-16 lg:pt-24 overflow-hidden ">
      {/* Wave */}
      <div className="absolute left-0 w-full bottom-[-120px] lg:bottom-[-500px]">
        <img src={wave2} alt="" className="w-full pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl heading-dark-1 text-black">
            Bring your vision to <br /> life with our interactive builder
          </h2>

          <p className="text-xl text-[#547593] max-w-md mx-auto lg:mx-0">
            Upload your space or choose a template, and get instant AI-powered
            design previews.
          </p>

          <Link to="/aiPlanner/landscape">
            <button className="bg-[var(--color-primary)] px-10 py-3 text-lg text-white rounded-md shadow-lg">
              Take a first step
            </button>
          </Link>
        </div>

        {/* Image */}
        <div>
          <img
            src={interImage}
            alt="Interactive builder preview"
            className="w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
