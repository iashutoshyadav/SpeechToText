import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { transcription } = location.state || {};

  return (
    <div className="result-page">
      <h2>Transcription Result</h2>
      <h4>Converted Audio to Text:</h4>
      <p style={{ color: transcription === "Transcription failed" ? "red" : "black" }}>
        {transcription || "No result available"}
      </p>
      <button onClick={() => navigate('/')}>Transcribe Another</button>
    </div>
  );
};

export default Result;
