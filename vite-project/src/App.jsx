import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/ResultPage";
import VoiceRecorder from './components/VoiceRecorder';
import Footer from "./components/Footer";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
      <Footer/>
      
    </Router>
  );
}

export default App;
