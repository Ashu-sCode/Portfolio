import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 3 * 1024 * 1024; // 3MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, WebP images allowed.");
  }

  if (file.size > maxSize) {
    throw new Error("Image too large (max 3MB).");
  }

  const storageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};


export const uploadResume = async (file) => {
  const storageRef = ref(storage, `resume/resume-${Date.now()}.pdf`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
