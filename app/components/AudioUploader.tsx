"use client";

import { useState, useRef } from "react";
import { Upload, FileAudio } from "lucide-react";

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function AudioUploader({ onFileSelect }: AudioUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find((file) =>
      file.type.startsWith("audio/")
    );

    if (audioFile) {
      onFileSelect(audioFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`upload-zone ${isDragging ? "drag-over" : ""}`}
      style={{
        padding: "48px",
        textAlign: "center",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileInput}
        style={{ display: "none" }}
      />

      <div className="flex flex-col items-center" style={{ gap: "16px" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: "64px",
            height: "64px",
            background: "rgba(6, 214, 160, 0.15)",
            borderRadius: "12px",
          }}
        >
          {isDragging ? (
            <FileAudio size={32} color="#06d6a0" />
          ) : (
            <Upload size={32} color="#06d6a0" />
          )}
        </div>

        <div className="flex flex-col items-center" style={{ gap: "8px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#e6edf3",
              margin: 0,
            }}
          >
            {isDragging ? "Drop your audio file here" : "Upload Audio File"}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#8b949e",
              margin: 0,
            }}
          >
            or click to browse • Supports MP3, WAV, M4A, FLAC
          </p>
        </div>

        <div className="flex items-center" style={{ gap: "8px", marginTop: "8px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#06d6a0",
            }}
          />
          <span style={{ fontSize: "12px", color: "#8b949e" }}>
            Max file size: 100MB
          </span>
        </div>
      </div>
    </div>
  );
}

