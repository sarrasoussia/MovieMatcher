import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './WebcamPage.css';

const WebcamPage = () => {
  const [emotion, setEmotion] = useState(null);
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      const response = await axios.post('http://localhost:5000/detect_emotion', { image: imageSrc });
      setEmotion(response.data.emotion);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="webcamContainer">
      <h1 className="heading">Facial Emotion Detection</h1>
      <div className="webcamWrapper">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
      </div>
      <div className="resultDiv">
      <button onClick={capture} className="captureButton">
        Detect Emotion
      </button>
      {emotion && <p className="emotionResult">Detected Emotion: <span className='emotion'>{ emotion}</span> </p>}
      </div>
    </div>
  );
};

export default WebcamPage;