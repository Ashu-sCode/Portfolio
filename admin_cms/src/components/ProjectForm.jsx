import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { db, storage } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";



// ✂️ Sanitize input (basic)
const sanitizeInput = (input) =>
  input.replace(
    /[<>&"'`]/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
      }[char])
  );

const ProjectForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: sanitizeInput(value) });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.tech) newErrors.tech = "Tech stack is required";
    if (!form.github || !form.github.startsWith("http"))
      newErrors.github = "Valid GitHub URL required";
    if (!form.live || !form.live.startsWith("http"))
      newErrors.live = "Valid Live link required";
    // if (!form.image) newErrors.image = "Screenshot image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please select an image before uploading.");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    toast.loading("Uploading project...");

    try {
      const imageRef = ref(
        storage,
        `projects/${Date.now()}-${form.image.name}`
      );
      await uploadBytes(imageRef, form.image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "projects"), {
        title: form.title,
        description: form.description,
        tech: form.tech.split(",").map((t) => t.trim()),
        github: form.github,
        live: form.live,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      toast.dismiss();
      toast.success("Project uploaded!");
      setForm({
        title: "",
        description: "",
        tech: "",
        github: "",
        live: "",
        image: null,
      });
      setImagePreview(null);
    } catch (err) {
      toast.dismiss();
      toast.error("Upload failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Description with live Markdown preview */}
      <div>
        <textarea
          name="description"
          placeholder="Project Description (Markdown supported)"
          value={form.description}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.description ? "border-red-500" : ""
          }`}
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
        <div className="mt-2 p-2 border rounded bg-gray-50">
          <strong className="block mb-1 text-gray-700">Preview:</strong>
          <div className="prose prose-sm">
            <ReactMarkdown>{form.description}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <input
          type="text"
          name="tech"
          placeholder="Tech Stack (comma-separated)"
          value={form.tech}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.tech ? "border-red-500" : ""
          }`}
        />
        {errors.tech && <p className="text-sm text-red-600">{errors.tech}</p>}
      </div>

      {/* GitHub */}
      <div>
        <input
          type="url"
          name="github"
          placeholder="GitHub Link"
          value={form.github}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.github ? "border-red-500" : ""
          }`}
        />
        {errors.github && (
          <p className="text-sm text-red-600">{errors.github}</p>
        )}
      </div>

      {/* Live */}
      <div>
        <input
          type="url"
          name="live"
          placeholder="Live Project Link"
          value={form.live}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.live ? "border-red-500" : ""
          }`}
        />
        {errors.live && <p className="text-sm text-red-600">{errors.live}</p>}
      </div>

      {/* Image Upload + Preview */}
      <div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.image ? "border-red-500" : ""
          }`}
        />
        {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-40 object-cover rounded border"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Uploading..." : "Upload Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
