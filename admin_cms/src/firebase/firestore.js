import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export const addProject = async (data) => {
  try {
    return await addDoc(collection(db, "projects"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to add project:", err);
    throw err;
  }
};

export const getProjects = async () => {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Failed to get projects:", err);
    throw err;
  }
};

export const deleteProject = async (id) => {
  try {
    return await deleteDoc(doc(db, "projects", id));
  } catch (err) {
    console.error("Failed to delete project:", err);
    throw err;
  }
};


export const updateResume = async (url) => {
  const docRef = doc(db, 'meta', 'resume');
  return await setDoc(docRef, { url, updatedAt: serverTimestamp() });
};
