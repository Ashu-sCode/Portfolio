import React, { useEffect, useState } from "react";
import { getResumeUrl } from "../utils/getResumeUrl";

const ResumeButton = ({ isMobile = false }) => {
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      const url = await getResumeUrl();
      setResumeUrl(url);
    };
    fetchResume();
  }, []);

  if (!resumeUrl) return null;

  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        isMobile
          ? "block bg-white text-indigo-700 text-center py-2 rounded-md font-semibold"
          : "bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-gray-100 transition font-semibold"
      }`}
    >
      Resume
    </a>
  );
};

export default ResumeButton;
