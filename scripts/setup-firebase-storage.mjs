/**
 * Configuration unique du bucket Firebase Storage pour les capsules vidéo.
 * ----------------------------------------------------------------------
 * Autorise le navigateur (espace privé) à téléverser les vidéos directement
 * dans le bucket via les URL signées (CORS), puis vérifie l'accès Firestore.
 *
 * À lancer une fois, après avoir activé Firestore et Storage dans Firebase :
 *   node --env-file=.env scripts/setup-firebase-storage.mjs
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const ORIGINS = ["https://jajomphe.ca", "https://www.jajomphe.ca", "http://localhost:3000"];

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const bucket = getStorage(app).bucket(process.env.FIREBASE_STORAGE_BUCKET);
const [exists] = await bucket.exists();
if (!exists) {
  console.error(`✗ Bucket introuvable : ${bucket.name} — activez Storage dans la console Firebase.`);
  process.exit(1);
}
await bucket.setCorsConfiguration([
  {
    origin: ORIGINS,
    method: ["GET", "PUT", "HEAD"],
    responseHeader: ["Content-Type", "Content-Range", "Accept-Ranges"],
    maxAgeSeconds: 3600,
  },
]);
console.log(`✓ CORS configuré sur ${bucket.name} pour ${ORIGINS.join(", ")}`);

try {
  await getFirestore(app).collection("capsules").limit(1).get();
  console.log("✓ Firestore accessible");
} catch (err) {
  console.error("✗ Firestore inaccessible —", err.message);
  process.exit(1);
}
