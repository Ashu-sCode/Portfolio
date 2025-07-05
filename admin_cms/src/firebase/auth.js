// src/firebase/auth.js
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

// auth.js
export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("Login error:", err);
    throw err; // rethrow so component catches
  }
};

export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
};

export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
