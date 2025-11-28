import emailIcon from "../../assets/icons/Homeicons/email.png";
import addressIcon from "../../assets/icons/Homeicons/Career.png"; 
import phoneIcon from "../../assets/icons/Homeicons/Career.png";

export default function ContactSection() {
  return (
    <section className="bg-[#f5f5f5] py-16">
      {/* Heading */}
      <h2 className="text-5xl font-semibold text-center mb-12">
        Contact Information
      </h2>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="bg-[#5C039B] text-white rounded-full p-4 shrink-0 w-14 h-14 flex items-center justify-center">
            <img src={emailIcon} alt="email icon" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Email Us</h3>
            <p className="text-gray-600">Feel free to contact us at</p>
            <p className="text-gray-800 font-medium">info@xotikltd.com</p>
            <p className="text-gray-600 text-sm">We’ll respond promptly</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="bg-[#5C039B] text-white rounded-full p-4 shrink-0 w-14 h-14 flex items-center justify-center">
            <img src={addressIcon} alt="address icon" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Address</h3>
            <p className="text-gray-600">A-21, Business Bay Tower, Dubai</p>
            <p className="text-gray-600 text-sm">UAE</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="bg-[#5C039B] text-white rounded-full p-4 shrink-0 w-14 h-14 flex items-center justify-center">
            <img src={phoneIcon} alt="phone icon" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Phone</h3>
            <p className="text-gray-600">+91 7878909689</p>
            <p className="text-gray-600 text-sm">Mon–Sat | 9AM–6PM</p>
          </div>
        </div>

      </div>

      {/* Google Map */}
      <div className="mt-16 flex justify-center">
        <iframe
          title="XOTIK LTD Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.820969606218!2d75.78727027523847!3d26.87734947667366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db69c602469ed%3A0x9395d07b39cdd8b5!2sGanesh%20Glory!5e0!3m2!1sen!2sin!4v1706799612345!5m2!1sen!2sin"
          width="1000"
          height="600"
          loading="lazy"
          allowFullScreen=""
          className="rounded-xl shadow-md w-[90%] md:w-[80%] border"
        ></iframe>
      </div>

    </section>
  );
}
