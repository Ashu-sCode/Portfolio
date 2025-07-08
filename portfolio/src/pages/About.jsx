import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Code2, Dumbbell, BookOpen } from "lucide-react";

const cards = [
  {
    icon: <Code2 size={28} />,
    title: "Full Stack Developer",
    desc: "I build performant web apps using React, Tailwind, PHP, and Firebase.",
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Lifelong Learner",
    desc: "Continuously learning through self-study and hands-on projects in web technologies.",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Problem Solver",
    desc: "I enjoy turning complex challenges into clean, maintainable solutions.",
    color: "bg-green-100 text-green-800 border-green-300",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-20 relative z-10 bg-gray-50 py-20 px-4 md:px-8"
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Illustration */}
        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <img
            src="/dev-working.svg"
            alt="Working Developer"
            className="w-full h-auto drop-shadow-xl"
          />
        </motion.div>

        {/* Right: Typewriter & Info Cards */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Typewriter Intro */}
          <div className="text-xl md:text-2xl font-semibold text-indigo-700">
            <Typewriter
              words={[
                "Hi, I'm Ashutosh",
                "Full Stack Web Developer",
                "Passionate about solving real-world problems",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`p-4 border rounded-2xl shadow-sm transition ${card.color}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-xl">{card.icon}</div>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                </div>
                <p className="text-sm text-gray-700">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
