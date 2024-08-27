import React, { useState } from 'react'
import Rosconnect from './components/RosConnection'
import './App.css'
import CameraData from './components/CameraData';
import VoiceRecorder from './components/Voicemicro';

function App() {
  // Definicion de variables de entrada
  const [ros, setRos] = useState(null); 

  return (
    <>
      <div>
        {/* <h1>ROS2 Monitoring Application</h1> */}
        <Rosconnect setRos={setRos}/>
        {ros &&
          <CameraData ros={ros} />
        }
        <VoiceRecorder />
      </div>
    </>
  );
};

export default App
