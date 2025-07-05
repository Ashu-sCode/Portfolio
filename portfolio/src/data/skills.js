import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaNode,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiMysql,
  SiPostman,
  SiFirebase,
} from "react-icons/si";

import { BiLogoVisualStudio } from "react-icons/bi";

export const skills = {
  Frontend: [
    { name: "HTML", icon: FaHtml5, description: "Markup for web structure" },
    { name: "CSS", icon: FaCss3Alt, description: "Design and layout styling" },
    {
      name: "JavaScript",
      icon: FaJs,
      description: "Dynamic behavior and interactivity",
    },
    {
      name: "React",
      icon: FaReact,
      description: "Build reusable UI components",
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      description: "Utility-first CSS framework",
    },
  ],

  Backend: [
    {
      name: "PHP",
      icon: FaPhp,
      description: "Server-side scripting for web apps",
    },
    {
      name: "MySQL",
      icon: SiMysql,
      description: "Relational database management system",
    },
    {
      name: "Node.js",
      icon: FaNode,
      description: "JavaScript runtime for backend logic",
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      description:
        "Backend-as-a-Service (Auth, Firestore, Storage, Hosting)",
    },
  ],

  Tools: [
    {
      name: "Git",
      icon: FaGitAlt,
      description: "Track and manage code changes",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      description: "Collaborate and host repositories",
    },
    {
      name: "VS Code",
      icon: BiLogoVisualStudio,
      description: "Lightweight yet powerful code editor",
    },
    {
      name: "Postman",
      icon: SiPostman,
      description: "Test, debug, and document APIs",
    },
  ],
};
