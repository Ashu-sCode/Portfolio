// src/components/ProjectList.jsx
import { useEffect, useState } from "react";
import { getProjects } from "../firebase/firestore";
import { deleteProject } from "../firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/firebase";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // ...inside your component
  const handleDelete = async (id, imageUrl) => {
    const result = await MySwal.fire({
      title: "Delete this project?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id); // 🔥 Trigger animation

    // Wait for animation duration (300ms)
    setTimeout(async () => {
      try {
        toast.loading("Deleting...");

        // Delete image from Firebase Storage
        const imagePath = decodeURIComponent(
          imageUrl.split("/o/")[1].split("?")[0]
        );
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);

        // Delete Firestore document
        await deleteProject(id);

        // Remove from local state
        setProjects((prev) => prev.filter((p) => p.id !== id));

        toast.dismiss();
        toast.success("Project deleted!");
      } catch (err) {
        toast.dismiss();
        console.error("Error deleting project:", err);
        toast.error("Failed to delete project");
      } finally {
        setDeletingId(null);
      }
    }, 300); // matches animation duration
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((proj, i) => (
        <div
          key={proj.id}
          style={{ transitionDelay: `${i * 75}ms` }}
          className={`
      border rounded p-4 shadow-sm bg-white
      transition-all duration-500 ease-out transform
      ${
        deletingId === proj.id
          ? "opacity-0 translate-x-10 scale-95"
          : "animate-slide-in opacity-100"
      }
    `}
        >
          <img
            src={proj.imageUrl}
            alt={proj.title}
            className="h-40 w-full object-cover rounded mb-2"
          />
          <h3 className="font-semibold text-lg">{proj.title}</h3>
          <p className="text-sm text-gray-600">{proj.tech?.join(", ")}</p>
          <div className="mt-2 space-x-2 text-sm">
            <a
              href={proj.github}
              target="_blank"
              className="text-blue-600 underline"
            >
              GitHub
            </a>
            <a
              href={proj.live}
              target="_blank"
              className="text-green-600 underline"
            >
              Live
            </a>
            <button
              onClick={() => handleDelete(proj.id, proj.imageUrl)}
              className="mt-4 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
