// ✅ Already looks good — just re-confirm this is what's running
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const getResumeUrl = async () => {
  const resumeRef = ref(storage, "resume/resume.pdf");
  try {
    const url = await getDownloadURL(resumeRef); // ✅ Proper download URL
    return url;
  } catch (error) {
    console.error("Resume not found:", error);
    return null;
  }
};
