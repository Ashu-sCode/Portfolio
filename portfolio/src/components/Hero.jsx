import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { getResumeUrl } from "../utils/getResumeUrl";

const Hero = () => {
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      const url = await getResumeUrl();
      setResumeUrl(url);
    };
    fetchResume();
  }, []);

  return (
    <section
      id="home"
      className="scroll-mt-20 bg-gradient-to-br from-purple-500 to-indigo-600 text-white min-h-screen flex flex-col items-center justify-center text-center px-4"
      role="region"
      aria-label="Hero section introducing Ashutosh"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Hey, I'm <span className="text-white">Ashutosh</span> 👋
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-4 h-[40px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <span>I’m a </span>
        <span className="text-white">
          <Typewriter
            words={["Web Developer", "Problem Solver", "Tech Enthusiast"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </motion.h2>

      <motion.p
        className="text-lg md:text-xl text-white/90 max-w-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
       I’m a BCA student and passionate web developer who builds clean, responsive websites using React, Tailwind CSS, and Firebase. Whether it’s a freelance project or a full-time opportunity, I’m always excited to collaborate and bring ideas to life through thoughtful design and efficient code.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <a
          href="#contact"
          className="bg-white text-indigo-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          aria-label="Navigate to contact section"
        >
          Let’s Connect
        </a>

        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition"
            aria-label="View or download Ashutosh's resume"
            download
          >
            View Resume
          </a>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
