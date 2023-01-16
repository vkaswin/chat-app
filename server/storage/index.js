const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: "node-chat-app-88711.firebaseapp.com",
  projectId: "node-chat-app-88711",
  storageBucket: "node-chat-app-88711.appspot.com",
  messagingSenderId: "117512449188",
  measurementId: "G-RHRWSZ0863",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const folder = {
  "image/png": "image",
  "image/gif": "image",
  "image/jpeg": "image",
  "image/webp": "image",
  "video/mpeg": "video",
  "video/mp4": "video",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docs",
};

const fileUpload = async (files) => {
  let urls = [];
  try {
    for (let { originalname, buffer, mimetype } of files) {
      let metadata = {
        contentType: mimetype,
      };
      let folderName = folder[mimetype] || "other";
      originalname = `${folderName}/${originalname}`;
      let storageRef = ref(storage, originalname);
      let {
        metadata: { bucket, name },
      } = await uploadBytes(storageRef, buffer, metadata);
      urls.push(
        `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${folderName}%2F${name}?alt=media`
      );
    }
    return urls;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fileUpload };
