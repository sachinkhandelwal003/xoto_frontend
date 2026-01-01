import emailIcon from "../../assets/icons/Homeicons/email.png";
import addressIcon from "../../assets/icons/Homeicons/Career.png";
import phoneIcon from "../../assets/icons/Homeicons/phone.png";
import wave1 from "../../assets/img/wave/waveint2.png";

export default function ContactSection() {
  return (
    <section className="relative bg-[var(--color-body)] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* 🌊 Background Wave */}
      <div
        className="
          absolute 
          bottom-[-20px] sm:bottom-[-40px] md:bottom-[-70px] lg:bottom-[-110px] xl:bottom-[-150px]
          left-0 w-full z-0 overflow-hidden
        "
      >
        <img
          src={wave1}
          alt="wave"
          className="
            w-[200%] sm:w-[170%] md:w-[150%] lg:w-full
            -ml-[30%] sm:-ml-[15%] md:-ml-[8%] lg:ml-0
            scale-[1.4] sm:scale-[1.25] md:scale-[1.1] lg:scale-100
            opacity-90
          "
        />
      </div>

      {/* Content on top of wave */}
      <div className="relative z-10">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold text-center text-black mb-10 sm:mb-14 md:mb-16">
          Contact Information
        </h2>

        {/* Contact info cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 px-6">
          {/* Email */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="bg-[#5C039B] text-white rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <img
                src={emailIcon}
                alt="email icon"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                Email Us
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Feel free to contact us at
              </p>
              <p className="text-gray-800 font-medium text-sm sm:text-base mt-1">
                sales.support@xoto.ae <br />
                info@xoto.ae
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                We’ll respond promptly
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="bg-[#5C039B] text-white rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <img
                src={addressIcon}
                alt="address icon"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1">Address</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                1616, Parklane Tower, Business Bay, Dubai
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">UAE</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="bg-[#5C039B] text-white rounded-full p-3 sm:p-4 w-9 h-9 sm:w-14 sm:h-14 flex items-center justify-center">
              <img
                src={phoneIcon}
                alt="phone icon"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1">Phone</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                +971 50 918 0967
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Mon–Sat | 9AM–6PM
              </p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <iframe
            title="XOTIK LTD Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3610.5326639711025!2d55.2618832!3d25.1852532!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d0fe2e52c9%3A0x2efe28575bbe2f84!2sParkLane%20Tower%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1764576845571!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            className=" shadow-md w-[92%] sm:w-[88%] md:w-[80%] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] "
          ></iframe>
        </div>
      </div>
    </section>
  );
}
