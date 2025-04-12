// components/Footer.tsx
import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-10 bg-gradient-to-br from-[#1a1a2e] to-black text-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand + Vibe */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            anti<span className="text-indigo-500">Resume</span>
          </h2>
          <p className="text-sm text-gray-400">
            Where your <span className="text-white">proof</span> replaces your paper. 
            Built for rebels, dreamers, and doers.
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="text-white font-semibold mb-1">Quick Links</h3>
          <a href="#features" className="hover:text-indigo-400 transition">Features</a>
          <a href="#challenges" className="hover:text-indigo-400 transition">Challenges</a>
          <a href="#about" className="hover:text-indigo-400 transition">About Us</a>
          <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-white font-semibold mb-1">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter className="text-xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} antiResume. Built with grit and gradients by Aditya 💻🔥
      </div>
    </footer>
  );
};

export default Footer;
