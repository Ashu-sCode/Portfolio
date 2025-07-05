import React from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import { logout } from "../firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ResumeManager from "../components/ResumeManager";
const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      const toastId = toast.loading("Logging out...");
      try {
        await logout();
        toast.dismiss(toastId);
        toast.success("Logged out successfully!");
        setTimeout(() => navigate("/"), 500);
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Logout failed");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Resume Upload Section */}
        <ResumeManager />

        {/* Upload Form */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Upload New Project
          </h2>
          <ProjectForm />
        </div>

        {/* Project List */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">
            Uploaded Projects
          </h2>
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
