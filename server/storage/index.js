const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAc6KdGErlxfmNxaoU4pUyujHDQIfFyQh8",
  authDomain: "chat-app-d7a32.firebaseapp.com",
  projectId: "chat-app-d7a32",
  storageBucket: "chat-app-d7a32.appspot.com",
  messagingSenderId: "727648611633",
  appId: "1:727648611633:web:f3b9b31212973c61a09410",
  measurementId: "G-Q56PB18YMH",
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
