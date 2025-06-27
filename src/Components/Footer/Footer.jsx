import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";
import navLogo from "../../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-4 sm:px-6 lg:px-16 xl:px-24 mt-10">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {/* Logo & Tagline */}
        <div>
          <img
            className="w-20 h-20 md:w-28 md:h-28 mb-3"
            src={navLogo}
            alt="Plant Care Tracker"
          />
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Your smart assistant for plant care & healthy greenery.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/allplants" className="hover:text-green-400 transition">
                All Plants
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-green-400 transition">
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm sm:text-base font-medium mb-1">
            Email: support@plantcare.com
          </p>
          <p className="text-sm sm:text-base font-medium mb-4">
            Phone: +880 1234-567890
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com/in/md-shakil-sarkar/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="mailto:support@plantcare.com"
              className="hover:text-green-400 transition"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm font-medium mt-10 pt-5 border-t border-green-700">
        © {new Date().getFullYear()} Plant Care Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
