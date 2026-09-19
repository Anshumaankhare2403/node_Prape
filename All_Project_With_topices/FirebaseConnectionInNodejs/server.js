// Previous browser/client SDK code (not needed for this server-side Admin SDK connection):
// import { initializeApp } from "firebase/app";
// const firebaseConfig = { /* browser configuration */ };
// const app = initializeApp(firebaseConfig);

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();
try {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });


  const db = getFirestore();

  console.log("✅ Firebase initialized!");

  // Actually test Firestore
  const snapshot = await db.collection("users").limit(1).get();

  console.log("🔥 Firebase connected successfully!");
  console.log(`📊 Firestore documents found: ${snapshot.size}`);

} catch (error) {
  console.log("❌ Firebase connection failed!");
  console.error(error.message);
}
