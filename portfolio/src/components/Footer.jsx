import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-6 px-4 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Name and Year */}
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">Ashutosh © {year}</p>
          <p className="text-sm text-white/80">
            Crafted with 💻 using React, Tailwind, and EmailJS
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-5 text-white text-xl">
          <a
            href="https://github.com/ashu-sCode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/ashutosh452"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:ashutosh72004@gmail.com"
            className="hover:text-gray-300 transition"
          >
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
