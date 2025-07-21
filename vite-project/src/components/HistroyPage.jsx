import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryPage() {
  const [transcriptions, setTranscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transcription')
      .then(res => setTranscriptions(res.data))
      .catch(err => console.error("Failed to fetch:", err));
  }, []);

  return (
    <div className="history">
      <h2>Transcription History</h2>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Text</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transcriptions.map((t, i) => (
            <tr key={i}>
              <td>{t.filename}</td>
              <td>{t.transcription}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
