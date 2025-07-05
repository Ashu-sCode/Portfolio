import React, { useState, useEffect } from "react";
import { getProjects } from "../firebase/firestore";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import ProjectModal from "../components/ProjectModal";

const getAllTags = (projects) => {
  const tags = new Set();
  projects.forEach((p) => p.tech?.forEach((t) => tags.add(t)));
  return ["All", ...Array.from(tags)];
};

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [allProjects, setAllProjects] = useState([]); // ✅ replaced static import
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // for animation delay
  };

  // Fetch from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setAllProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter projects when tag changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered =
        selectedTag === "All"
          ? allProjects
          : allProjects.filter((p) => p.tech?.includes(selectedTag));
      setFilteredProjects(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [selectedTag, allProjects]);

  const tags = getAllTags(allProjects);

  return (
    <section
      id="projects"
      className="scroll-mt-20 bg-gray-100 py-20 px-4 md:px-8"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`text-sm px-4 py-1 rounded-full font-medium border transition
              ${
                selectedTag === tag
                  ? "bg-purple-600 text-white border-purple-700 shadow-md"
                  : "bg-white text-purple-700 border-purple-200 hover:bg-purple-50"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Spinner or Project Cards */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                {...project}
                onClick={() => openModal(project)}
                description={project.description}
                tech={project.tech}
                github={project.github}
                demo={project.live}
                image={project.imageUrl}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No projects found for{" "}
          <span className="font-semibold">{selectedTag}</span>.
        </p>
      )}
      {/* Modal for project details */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />
      )}
    </section>
  );
};

export default Projects;
