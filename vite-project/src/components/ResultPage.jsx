import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { transcription } = location.state || {};

  return (
    <div class="result-page">
      <div class="result-box">
        <h2>Transcription Result</h2>
        <h4>Converted Audio to Text:</h4>
        <div class="scroll">
          <p style={{ color: transcription === "Transcription failed" ? "red" : "black" }}>
            {transcription || "No result available"}
          </p>
        </div>
        <button onClick={() => navigate('/')}>Transcribe Another</button>
      </div>
    </div>

  );
};

export default Result;
