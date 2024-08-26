// Seccion de importe de librerias
import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";

const CameraData = ({ ros }) => {
    // declaracion de variables de obtencion de datos de camara
    const [imgData, setImgData] = useState('');

    useEffect(() => {
        // Validacion de actual conexion de ros2
        if (!ros){
            return;
        }

        // Variable de almacenamiento de datos de imagenes
        const listener = new ROSLIB.Topic({
            ros: ros, // Instancia de ros usada (scope global)
            name: '/color/image_raw/compressed', // Nombre del topico
            messageType: 'sensor_msgs/CompressedImage' // Tipo de imagen que se va a recibir
        });

        // Funcion de subscriptor
        listener.subscribe((msg) => {
            const { data } = msg;
            const imageBase64 = `data:image/jpeg;base64,${data}`;
            setImgData(imageBase64);
        });

        // Limpieza cuando el componente se desmonta
        return () => {
            listener.unsubscribe();
        };
    }, [ros]);

    return (
        <div>
            <h3>Received Image:</h3>
            {imgData ? (
                <img src={imgData} alt="Received ROS Image" style={{ maxWidth: '100%' }} />
            ) : (
                <p>Waiting for images...</p>
            )}
        </div>
    );
};

export default CameraData;