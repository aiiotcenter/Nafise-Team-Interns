import "./camera.css";
import { useRef, useEffect, useState } from "react";

function Camera(){
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
    async function getMedia(constraints: MediaStreamConstraints) {
        let stream = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          if(videoRef.current){
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("error");
        }
      }

    const constraints = { video: true, audio: false };
    getMedia(constraints);

    return () => {
        if (videoRef.current?.srcObject) {
          (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
      };

    }, []);


    function Snap(){
        if (videoRef.current && canvasRef.current) {
            const picture = canvasRef.current.getContext("2d");
              if (picture) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                picture.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                
                const imageData = canvasRef.current.toDataURL("image/png");
                setCapturedImage(imageData);
              }
            }
          };
    
          const downloadImage = () => {
            if (capturedImage) {
              const link = document.createElement("a");
              link.href = capturedImage;
              link.download = "snapshot.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          };
          

    return (
        <>
            <div className="camera">
                <h2>Camera</h2>
                <video ref={videoRef} autoPlay playsInline style={{width: "100%"}}></video>
                <button onClick={Snap}>Take Snapshot</button>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                {capturedImage && <img src={capturedImage} alt="Captured" style={{ marginTop: "10px", width: "100%"}} />}
                {capturedImage && <button onClick={downloadImage}>Download Image</button>}
            </div>
            <br />
        </>
    )
}

export default Camera;