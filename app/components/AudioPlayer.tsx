"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Download } from "lucide-react";

interface AudioPlayerProps {
  file: File | null;
  isProcessed?: boolean;
  onDownload?: () => void;
}

export default function AudioPlayer({
  file,
  isProcessed = false,
  onDownload,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate fake waveform bars
  const waveformBars = Array.from({ length: 100 }, (_, i) => {
    const height = Math.sin(i * 0.15) * 30 + 40 + Math.random() * 20;
    const progress = (currentTime / duration) * 100;
    const isActive = (i / 100) * 100 < progress;
    return { height, isActive };
  });

  if (!file) return null;

  return (
    <div className="card" style={{ padding: "28px", width: "100%" }}>
      <audio ref={audioRef} src={audioUrl} />

      <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
        <div className="flex items-center" style={{ gap: "14px" }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: "52px",
              height: "52px",
              background: "rgba(6, 214, 160, 0.1)",
              borderRadius: "12px",
            }}
          >
            <Volume2 size={26} color="#06d6a0" />
          </div>
          <div className="flex flex-col" style={{ gap: "4px" }}>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#e6edf3" }}>
              {file.name}
            </h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#8b949e" }}>
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>

        {isProcessed && onDownload && (
          <button
            className="btn btn-primary flex items-center"
            style={{ padding: "12px 24px", gap: "8px" }}
            onClick={onDownload}
          >
            <Download size={18} />
            Download
          </button>
        )}
      </div>

      {/* Waveform */}
      <div
        className="waveform-container"
        style={{
          height: "100px",
          marginBottom: "20px",
          padding: "20px 16px",
        }}
      >
        <div className="flex items-center justify-center" style={{ height: "100%", gap: "3px" }}>
          {waveformBars.map((bar, i) => (
            <div
              key={i}
              className={`waveform-bar ${bar.isActive ? "playing" : ""}`}
              style={{
                width: "100%",
                height: `${bar.height}%`,
                opacity: bar.isActive ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex items-center" style={{ gap: "12px", marginBottom: "16px" }}>
        <span style={{ fontSize: "13px", color: "#8b949e", minWidth: "40px" }}>
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="slider"
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: "13px", color: "#8b949e", minWidth: "40px" }}>
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          className="btn btn-primary"
          style={{ width: "52px", height: "52px", borderRadius: "12px" }}
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: "2px" }} />}
        </button>

        <div className="flex items-center" style={{ gap: "12px", flex: 1, maxWidth: "250px" }}>
          <Volume2 size={20} color="#8b949e" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="slider"
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: "14px", color: "#8b949e", minWidth: "36px", fontWeight: 500 }}>
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
}

