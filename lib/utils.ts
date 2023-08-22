import FileSystem from "expo-file-system";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertFileToBase64(uri: string) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => {
      console.log("Error: ", error);
      reject(error);
    };
    reader.readAsDataURL(uri);
  });
}

export function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result.split(",")[1];
      resolve(base64Data);
    };

    reader.onerror = () => {
      reject(new Error("Error reading blob data"));
    };

    reader.readAsDataURL(blob);
  });
}
