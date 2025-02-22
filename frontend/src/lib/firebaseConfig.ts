import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAtZqJB23VaF838-mBoeiW94ZEAHnaTCdw",
    authDomain: "timenest2025.firebaseapp.com",
    databaseURL: "https://timenest2025-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "timenest2025",
    storageBucket: "timenest2025.firebasestorage.app",
    messagingSenderId: "993843354426",
    appId: "1:993843354426:web:f35f508e026cd46b1b0e03",
    measurementId: "G-5CGBD8WM94"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
