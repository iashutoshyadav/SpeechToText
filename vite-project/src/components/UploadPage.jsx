import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('service', 'openai');

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/transcription/upload', formData);
      const transcription = res.data.transcription;

      if (transcription) {
        navigate("/result", { state: { transcription } });
      } else {
        alert("No transcription returned.");
      }
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload">
      <h2>Upload Audio</h2>
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadPage;
