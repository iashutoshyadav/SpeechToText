import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VoiceRecorder from '../components/VoiceRecorder';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';


function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('service', 'openai');

    setLoading(true);
    try {
      console.log("Uploading to:", `${API_BASE_URL}/api/transcription/upload`);
      console.log("File:", file);

      const res = await axios.post(`${API_BASE_URL}/api/transcription/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
  const handleRecordingComplete = (audioBlob) => {
    const recordedFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
    setFile(recordedFile);
  };

  return (
    <div className="upload">
      <h1>Transcribe Audio to Text</h1>
      <p className="subtitle">
        Transcribe speech and voice recordings to text in no time. Free AI audio-to-text converter.
      </p>

      <div className="upload-box">
        <h2>Upload your file</h2>
        <p>Click Choose File button to get started or drag and drop files to upload.</p>

        <div className="file-recorder-container">
          <div className="choose-file">
            <label htmlFor="file-upload" className="custom-file-upload">
              <FontAwesomeIcon icon={faFileArrowUp} style={{ marginRight: '8px' }} />
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="voice-recorder">
            <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
          </div>
        </div>

        {file && (
          <button onClick={handleUpload} className="upload-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>
    </div>

  );
}

export default UploadPage;
