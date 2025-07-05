import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ResumeButton from './ResumeButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'Projects', 'About', 'Contact'];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSmoothScroll = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav
      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white sticky top-0 z-50 shadow-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ashutosh</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleSmoothScroll(link)}
              className="hover:underline hover:text-gray-100 transition"
              aria-label={`Go to ${link}`}
            >
              {link}
            </button>
          ))}
          <ResumeButton />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-purple-600 to-indigo-700 shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-4 text-white text-lg">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => handleSmoothScroll(link)}
                className="w-full text-left hover:underline"
                aria-label={`Navigate to ${link}`}
              >
                {link}
              </button>
            </li>
          ))}
          <li>
            <div onClick={() => setIsOpen(false)}>
              <ResumeButton isMobile={true} />
            </div>
          </li>
        </ul>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
