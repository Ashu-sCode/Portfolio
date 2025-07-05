// src/firebase/firestore.js
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
