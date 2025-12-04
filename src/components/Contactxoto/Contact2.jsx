import emailIcon from "../../assets/icons/Homeicons/email.png";
import addressIcon from "../../assets/icons/Homeicons/Career.png"; 
import phoneIcon from "../../assets/icons/Homeicons/Career.png";
import wave1 from "../../assets/img/wave/wave1.png";

export default function ContactSection() {
  return (
    <section className="relative bg-[#f5f5f5] py-20 overflow-hidden">

      {/* 🌊 BACKGROUND WAVE — sits behind everything */}
      <div  className="
          absolute 
          bottom-[-20px]        /* mobile */
          sm:bottom-[-40px]     /* small screens */
          md:bottom-[-70px]     /* medium screens */
          lg:bottom-[-110px]    /* large screens */
          xl:bottom-[-150px]    /* extra large */
          left-0 w-full z-0 overflow-hidden
        ">
        <img
          src={wave1}
          alt="wave"
          className="
            w-[180%] sm:w-[160%] md:w-[150%] lg:w-full
            -ml-[20%] sm:-ml-[10%] md:-ml-[6%] lg:ml-0
            scale-[1.5] sm:scale-[1.3] md:scale-[1.15] lg:scale-100
            opacity-90
          "
        />
      </div>

      {/* Content sits ABOVE wave */}
      <div className="relative z-10">

        {/* Heading */}
        <h2 className="text-5xl font-semibold text-center text-black heading-dark-1 mb-16">
          Contact Information
        </h2>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="bg-[#5C039B] text-white rounded-full p-4 w-14 h-14 flex items-center justify-center shrink-0">
              <img src={emailIcon} alt="email icon" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Email Us</h3>
              <p className="text-gray-600">Feel free to contact us at</p>
              <p className="text-gray-800 font-medium">
                sales.support@xoto.ae <br />
                info@xoto.ae
              </p>
              <p className="text-gray-600 text-sm">We’ll respond promptly</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="bg-[#5C039B] text-white rounded-full p-4 w-14 h-14 flex items-center justify-center shrink-0">
              <img src={addressIcon} alt="address icon" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Address</h3>
              <p className="text-gray-600">
                1616, Parklane Tower, Business Bay, Dubai
              </p>
              <p className="text-gray-600 text-sm">UAE</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="bg-[#5C039B] text-white rounded-full p-4 w-14 h-14 flex items-center justify-center shrink-0">
              <img src={phoneIcon} alt="phone icon" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Phone</h3>
              <p className="text-gray-600">+971 50 918 0967</p>
              <p className="text-gray-600 text-sm">Mon–Sat | 9AM–6PM</p>
            </div>
          </div>

        </div>

        {/* Google Map */}
        <div className="mt-20 flex justify-center">
          <iframe
            title="XOTIK LTD Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3610.5326639711025!2d55.2618832!3d25.1852532!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d0fe2e52c9%3A0x2efe28575bbe2f84!2sParkLane%20Tower%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1764576845571!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen=""
            className="rounded-xl shadow-md w-[90%] md:w-[80%] h-[350px] md:h-[500px] border"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
