// src/components/AudioPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioData);
    };
  }, []);

  const togglePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div>
      <audio ref={audioRef} src={src}></audio>
      <button onClick={togglePlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <div>
        <span>{Math.floor(progress / 60)}:{Math.floor(progress % 60)}</span> / 
        <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
