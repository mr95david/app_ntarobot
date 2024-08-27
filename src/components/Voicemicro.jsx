// Importe de librerias
import React, { useState, useRef } from "react";

// Clase de ejecucion de grabacion  
const VoiceRecorder = () => {
    // Seccion de designacion de variables 
    // Variable de validacion de  estado de grabacion
    const [isRecording, setIsRecording] = useState(false);
    // Variable de almacenamiento de audio
    const [audioUrl, setAudioUrl] = useState(null);
    // Verificacion de referencia
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Funcion de inicio de grabacion
    const startRecording = async () => {
        // Validacion de estado actual de grabacion
        setIsRecording(true);

        // Uso de dispositivos para deteccion de audio
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Detector de audio
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        // Ejecucion de evento de obtencion de audio
        mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };

        // Referencia de parado de deteccion de audio
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        };

        // Inicio general
        mediaRecorderRef.current.start();
    };

    // Funcion para detener la deteccion de audio
    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    };

    return (
        <div>
            <h3>Voice Recorder</h3>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {audioUrl && (
                <div>
                    <h4>Recorded Audio:</h4>
                    <audio src={audioUrl} controls />
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder;