"use client";

import { useState } from "react";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [fileId, setFileId] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const blob = new Blob([new Uint8Array(data.file.data)], {
        type: data.mimetype,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-red-300"
        id="whole-body"
      >
        <div
          className="min-h-[15vh] min-w-[300px] md:min-w-[50vw] bg-white opacity-100 transition-all duration-100 rounded-lg shadow-lg p-8"
          id="form-container"
        >
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Download File
            </h1>

            <div className="flex flex-col gap-2">
              <label htmlFor="fileId" className="text-gray-700">
                File ID
              </label>
              <input
                type="text"
                id="fileId"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter file ID"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
