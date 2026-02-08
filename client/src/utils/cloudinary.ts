export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "student_tracker_unsigned"); // 👈 EXACT NAME
  formData.append("folder", "daily-activities");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dfxc0zk11/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url as string;
};
