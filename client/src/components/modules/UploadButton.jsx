// UploadButton.js
import React, { useState } from "react";

const UploadButton = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);

      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:5371/api/upload-audio", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onUploadSuccess(data.audioUrl); // Pass audio URL back to parent component
          setLoading(false);
        } else {
          setError("Failed to upload audio.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error uploading audio:", err);
        setError("Error uploading audio.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="audio-upload">
      <h3>Upload MP3 Audio</h3>
      <input
        type="file"
        accept="audio/mp3"
        onChange={handleAudioUpload}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadButton;
