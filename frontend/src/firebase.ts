// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-41277.firebaseapp.com",
  projectId: "blog-app-41277",
  storageBucket: "blog-app-41277.appspot.com",
  messagingSenderId: "608421641121",
  appId: "1:608421641121:web:cf4bdcea1aa572400d69e0",
  measurementId: "G-8B08S263K5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImages = async (
  files: File[],
  userId: string
): Promise<string[]> => {
  const uploadPromises = files.map(async (file) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `cars/${userId}/${fileName}`);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  });

  return Promise.all(uploadPromises);
};
