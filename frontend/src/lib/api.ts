export async function uploadFile(formData: FormData) {
    try {
      const response = await fetch("/api/capsules/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("File upload failed");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }
  