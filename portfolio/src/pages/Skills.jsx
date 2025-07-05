import React from 'react';
import { skills } from '../data/skills';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';

const Skills = () => {
  return (
    <section
      id="skills"
      className="scroll-mt-20 bg-white py-20 px-4 md:px-8"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills & Technologies
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {Object.entries(skills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-purple-50 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-4">{category}</h3>
            <ul className="grid grid-cols-3 gap-4">
              {items.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <Tooltip.Provider key={idx} delayDuration={200}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <li className="flex flex-col items-center text-center cursor-default group">
                          <div className="text-4xl text-indigo-600 group-hover:scale-110 transition">
                            <Icon />
                          </div>
                          <span className="text-sm mt-1 text-gray-700 font-medium">{skill.name}</span>
                        </li>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="top"
                          className="z-50 bg-indigo-600 text-white text-sm px-3 py-1 rounded shadow-md animate-fadeIn"
                        >
                          {skill.description}
                          <Tooltip.Arrow className="fill-indigo-600" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
