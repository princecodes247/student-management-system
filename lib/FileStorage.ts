import { UPLOADFLY_API_KEY } from "@env";

export async function uploadFile(file) {
  const uploadEndpoint = "https://api.uploadfly.cloud/upload";
  try {
    // Create a new FormData object
    const formData = new FormData();

    // Append the file to the FormData object with the key 'file'
    formData.append("file", file);

    // Make the POST request using the fetch API
    const response = await fetch(uploadEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${UPLOADFLY_API_KEY}`,
      },
      body: formData,
    });

    return response.json();
    // Handle response
  } catch (error) {
    // Handle error
  }
}
