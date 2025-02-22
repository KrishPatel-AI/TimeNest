import { realtimeDB } from "./firebaseConfig";
import { ref, set, get } from "firebase/database";

// Save User Profile
export const saveUserProfile = async (userId: string, email: string) => {
  try {
    await set(ref(realtimeDB, `users/${userId}`), {
      email,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get User Profile
export const getUserProfile = async (userId: string) => {
  try {
    const snapshot = await get(ref(realtimeDB, `users/${userId}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    throw new Error(error.message);
  }
};
