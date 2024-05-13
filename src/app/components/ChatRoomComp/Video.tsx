import { useEffect, useRef } from "react"

export const Video = ({stream}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);

    return <video style={{width: "300px"}} ref={videoRef} autoPlay playsInline/>

}