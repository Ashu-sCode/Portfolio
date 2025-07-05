import React from "react";
import { Github } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ProjectCard = ({ title, description, tech, github, demo, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition border border-purple-100"
    >
      {/* Preview Image */}
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-indigo-700 mb-2">{title}</h3>

        {/* Markdown Description */}
        <div className="prose prose-sm text-gray-700 max-w-none mb-4">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex space-x-4 text-sm">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()} // Stop modal open
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
              onClick={(e) => e.stopPropagation()} // Stop modal open
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
