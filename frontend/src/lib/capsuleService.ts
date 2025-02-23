// import { db } from "./firebaseConfig";
// import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// // Collection Reference
// const capsulesCollection = collection(db, "capsules");

// // Create Capsule
// export const createCapsule = async (userId: string, title: string, content: string, unlockDate: string) => {
//   try {
//     const docRef = await addDoc(capsulesCollection, {
//       userId,
//       title,
//       content,
//       unlockDate,
//       createdAt: new Date().toISOString(),
//     });
//     return docRef.id;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Get All Capsules
// export const getCapsules = async () => {
//   try {
//     const querySnapshot = await getDocs(capsulesCollection);
//     return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Update Capsule
// export const updateCapsule = async (capsuleId: string, updatedData: any) => {
//   try {
//     const capsuleDoc = doc(db, "capsules", capsuleId);
//     await updateDoc(capsuleDoc, updatedData);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Delete Capsule
// export const deleteCapsule = async (capsuleId: string) => {
//   try {
//     await deleteDoc(doc(db, "capsules", capsuleId));
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
