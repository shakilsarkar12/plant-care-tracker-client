import React from "react";
import navLogo from "../../assets/footerLogo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-4 sm:px-5 md:px-8 lg:px-16 xl:px-24 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-8">
        <div className="sm:w-1/2 md:w-1/3">
          <div>
            <img
              className="w-20 h-20 md:w-40 md:h-40 -mt-2 mb-2"
              src={navLogo}
              alt="Plant Care Tracker"
            />
          </div>
          <p className="-mt-4 text-sm sm:text-lg text-white font-medium">
            Your smart assistant for plant care & healthy greenery.
          </p>
        </div>

        <div className="md:w-2/3 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Contact Us
            </h3>
            <p className="text-sm sm:text-base sm:font-medium">
              Email: support@plantcare.com
            </p>
            <p className="text-sm sm:text-base sm:font-medium">
              Phone: +880 1234-567890
            </p>
          </div>

          <div className="w-fit md:mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/"
                className="hover:text-green-400 transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com/"
                className="hover:text-green-400 transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                className="hover:text-green-400 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGKZZxwTGTLxVBrlPBhdNhpbDjsKwzXFCfJdPFXNcxXGHjwNNXZVHxjVLQKJXJMqgNXPSWQ"
                className="hover:text-green-400 transition"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm font-medium mt-8">
        © {new Date().getFullYear()} Plant Care Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
