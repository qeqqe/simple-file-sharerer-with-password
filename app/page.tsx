"use client";
import { FormEventHandler, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (!password) {
      alert("Please enter a password");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { fileId } = await response.json();
      alert(`File uploaded successfully! Share this ID: ${fileId}`);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      alert(`Failed to upload file: ${error.message}`);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-red-300"
        id="whole-body"
      >
        <div
          className="min-h-[35vh] min-w-[300px] md:min-w-[50vw] bg-white opacity-100 transition-all duration-100 rounded-lg shadow-lg p-8"
          id="form-container"
        >
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Share Your Files
            </h1>

            <div className="flex flex-col gap-2">
              <label htmlFor="file" className="text-gray-700">
                Choose File
              </label>
              <input
                type="file"
                id="file"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                onChange={(e) => setFile(e.target.files?.[0])}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-400 to-red-400 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
              suppressHydrationWarning
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
