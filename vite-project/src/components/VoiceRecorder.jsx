import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';


const VoiceRecorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => audioChunks.current.push(event.data);
    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      audioChunks.current = [];
      onRecordingComplete(audioBlob);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div class="voice-recorder">
      {/* <h3 class="voice"> Voice Recorder</h3> */}
      {!recording ? (
        <button onClick={startRecording} class="start-btn">
          <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '8px' }} />
          Start Recording</button>
      ) : (
        <button onClick={stopRecording} class="stop-btn">
          <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '8px' }} />
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default VoiceRecorder;
