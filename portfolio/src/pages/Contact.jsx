import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix form errors.");
      return;
    }

    toast.loading("Sending message...");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast.dismiss();
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.dismiss();
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 px-4 md:px-8">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-800">
            Got a project idea, collaboration, or just want to say hi? Drop me a
            message! 👇
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-indigo-600">
              <Mail /> <span>ashutosh7200@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-purple-600">
              <Linkedin />
              <a
                href="https://www.linkedin.com/in/ashutosh452/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Github />
              <a href="https://github.com/Ashu-sCode" target="_blank">
                GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-purple-500"
              }`}
            />
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
