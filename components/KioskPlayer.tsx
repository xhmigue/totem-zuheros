import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const KioskPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Inicializar video.js
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, {
        autoplay: true,
        muted: true, // Importante para que el navegador permita el autoplay
        loop: true,
        controls: false, // En un totem no quieres controles visibles
        fluid: true,
        html5: { vhs: { overrideNative: true } },
      }));

      player.src({ src, type: "application/x-mpegURL" });
    }
  }, [src]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-fill vjs-big-play-centered"
        playsInline
      />
    </div>
  );
};

export default KioskPlayer;
