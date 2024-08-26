import React, { useState } from 'react'
import Rosconnect from './components/RosConnection'
import './App.css'
import CameraData from './components/CameraData';

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
      </div>
    </>
  );
};

export default App
