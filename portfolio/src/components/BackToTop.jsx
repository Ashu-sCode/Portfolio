import React, { useEffect, useState } from "react";
import { ArrowUpCircle } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show/hide icon on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUpCircle className="w-7 h-7" />
      </button>
    )
  );
};

export default BackToTop;
