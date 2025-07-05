import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase/firebase";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ResumeManager = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const storageRef = ref(storage, "resume/resume.pdf");

  useEffect(() => {
    getDownloadURL(storageRef)
      .then(setResumeUrl)
      .catch(() => setResumeUrl(null)); // Resume not found
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      return toast.error("Please select a valid PDF file");
    }

    try {
      toast.loading("Uploading...");
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setResumeUrl(url);
      toast.dismiss();
      toast.success("Resume uploaded!");
    } catch (err) {
      toast.dismiss();
      toast.error("Upload failed");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "Delete Resume?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      toast.loading("Deleting...");
      await deleteObject(storageRef);
      setResumeUrl(null);
      toast.dismiss();
      toast.success("Resume deleted!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Resume Manager</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left side: Preview + delete if resume exists */}
        {resumeUrl ? (
          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              📄 Preview Resume
            </a>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              🗑️ Delete
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No resume uploaded yet.</p>
        )}

        {/* Right side: Upload input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="bg-white border border-gray-300 text-sm p-2 rounded cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ResumeManager;
