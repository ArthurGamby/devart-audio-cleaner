/**
 * AudioClean Demo
 * Theme: Ultra-minimalist dark with teal accents
 *
 * This is a demo mockup. Features are simulated for presentation purposes.
 */

"use client";

import { useState } from "react";
import { Upload, Sparkles, Wind, MessageSquare, Volume, Check } from "lucide-react";
import AudioPlayer from "./components/AudioPlayer";
import ProcessingModal from "./components/ProcessingModal";
import Toast from "./components/Toast";

interface CleaningOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function Home() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  const [options, setOptions] = useState<CleaningOption[]>([
    {
      id: "noise",
      label: "Background Noise",
      description: "Remove ambient sounds, hum & static",
      icon: <Wind size={24} />,
      enabled: true,
    },
    {
      id: "fillers",
      label: "Vocal Fillers",
      description: "Remove 'uh', 'um', 'like' hesitations",
      icon: <MessageSquare size={24} />,
      enabled: true,
    },
    {
      id: "enhance",
      label: "Voice Enhancement",
      description: "Boost clarity and vocal presence",
      icon: <Volume size={24} />,
      enabled: true,
    },
  ]);

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
    const audioFile = files.find((file) => file.type.startsWith("audio/"));
    if (audioFile) {
      setOriginalFile(audioFile);
      setProcessedFile(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setProcessedFile(null);
    }
  };

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, enabled: !opt.enabled } : opt))
    );
  };

  const handleProcess = () => {
    const enabledCount = options.filter((opt) => opt.enabled).length;
    if (enabledCount === 0) {
      showToast("Please select at least one cleaning option", "error");
      return;
    }
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    if (originalFile) {
      setProcessedFile(originalFile);
      showToast("Audio cleaned successfully!", "success");
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cleaned_${processedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Audio downloaded!", "success");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const enabledCount = options.filter((opt) => opt.enabled).length;

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0e14 0%, #14181f 100%)",
        padding: "40px 24px",
      }}
    >
      {/* Header */}
      <div className="flex items-center" style={{ gap: "12px", marginBottom: "48px" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #06d6a0, #00b4d8)",
            borderRadius: "10px",
          }}
        >
          <Sparkles size={24} color="#0a0e14" />
        </div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #06d6a0, #00b4d8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
          }}
        >
          AudioClean
        </h1>
      </div>

      <div
        className="flex flex-col items-center"
        style={{
          maxWidth: "800px",
          width: "100%",
          gap: "32px",
        }}
      >
        {/* Hero Text */}
        {!originalFile && (
          <div className="flex flex-col items-center" style={{ gap: "16px", marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#e6edf3",
                margin: 0,
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              Clean Your Audio
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #06d6a0, #00b4d8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                In Seconds
              </span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#8b949e",
                margin: 0,
                textAlign: "center",
              }}
            >
              AI-powered audio enhancement. Remove noise, fillers, and boost clarity.
            </p>
          </div>
        )}

        {/* Upload Zone or Audio Player */}
        {!originalFile ? (
          <label
            className={`upload-zone ${isDragging ? "drag-over" : ""}`}
            style={{
              width: "100%",
              padding: "64px 32px",
              cursor: "pointer",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
            <div className="flex flex-col items-center" style={{ gap: "20px" }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(6, 214, 160, 0.1)",
                  borderRadius: "16px",
                }}
              >
                <Upload size={40} color="#06d6a0" />
              </div>
              <div className="flex flex-col items-center" style={{ gap: "8px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#e6edf3",
                    margin: 0,
                  }}
                >
                  Drop your audio file here
                </p>
                <p style={{ fontSize: "15px", color: "#8b949e", margin: 0 }}>
                  or click to browse • MP3, WAV, M4A, FLAC
                </p>
              </div>
            </div>
          </label>
        ) : (
          <div className="flex flex-col" style={{ width: "100%", gap: "24px" }}>
            <AudioPlayer file={originalFile} />
          </div>
        )}

        {/* Cleaning Options */}
        {originalFile && !processedFile && (
          <>
            <div className="flex flex-col" style={{ width: "100%", gap: "16px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#e6edf3",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Select Audio Enhancements
              </h3>
              <div
                className="flex"
                style={{
                  gap: "16px",
                  width: "100%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {options.map((option) => (
                  <button
                    key={option.id}
                    className={`card cursor-pointer transition-all ${
                      option.enabled ? "" : ""
                    }`}
                    style={{
                      flex: "1 1 220px",
                      maxWidth: "250px",
                      padding: "24px",
                      border: option.enabled
                        ? "2px solid #06d6a0"
                        : "2px solid transparent",
                      background: option.enabled
                        ? "rgba(6, 214, 160, 0.08)"
                        : "var(--color-card)",
                    }}
                    onClick={() => toggleOption(option.id)}
                  >
                    <div className="flex flex-col items-center" style={{ gap: "12px" }}>
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          background: option.enabled
                            ? "rgba(6, 214, 160, 0.15)"
                            : "rgba(139, 148, 158, 0.1)",
                          borderRadius: "12px",
                          color: option.enabled ? "#06d6a0" : "#8b949e",
                          position: "relative",
                        }}
                      >
                        {option.icon}
                        {option.enabled && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              right: "-6px",
                              width: "24px",
                              height: "24px",
                              background: "#06d6a0",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Check size={14} color="#0a0e14" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center" style={{ gap: "4px" }}>
                        <h4
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: option.enabled ? "#e6edf3" : "#8b949e",
                            margin: 0,
                          }}
                        >
                          {option.label}
                        </h4>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#8b949e",
                            margin: 0,
                            textAlign: "center",
                            lineHeight: "1.4",
                          }}
                        >
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary flex items-center justify-center"
              style={{
                width: "100%",
                maxWidth: "400px",
                padding: "18px 32px",
                fontSize: "16px",
                fontWeight: 600,
                gap: "12px",
              }}
              onClick={handleProcess}
              disabled={isProcessing || enabledCount === 0}
            >
              <Sparkles size={20} />
              Clean Audio ({enabledCount} enhancement{enabledCount !== 1 ? "s" : ""})
            </button>

            <button
              className="btn btn-ghost"
              style={{ padding: "8px 16px", fontSize: "14px" }}
              onClick={() => {
                setOriginalFile(null);
                setProcessedFile(null);
              }}
            >
              Upload Different File
            </button>
          </>
        )}

        {/* Processed Audio */}
        {processedFile && (
          <div className="flex flex-col items-center" style={{ width: "100%", gap: "24px" }}>
            <div
              className="flex items-center"
              style={{
                gap: "12px",
                padding: "12px 24px",
                background: "rgba(6, 214, 160, 0.1)",
                border: "1px solid rgba(6, 214, 160, 0.3)",
                borderRadius: "12px",
              }}
            >
              <Check size={20} color="#06d6a0" />
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#06d6a0" }}>
                Audio Cleaned Successfully
              </span>
            </div>

            <AudioPlayer file={processedFile} isProcessed onDownload={handleDownload} />

            <button
              className="btn btn-ghost"
              style={{ padding: "8px 16px", fontSize: "14px" }}
              onClick={() => {
                setOriginalFile(null);
                setProcessedFile(null);
              }}
            >
              Clean Another File
            </button>
          </div>
        )}
      </div>

      <ProcessingModal isOpen={isProcessing} onComplete={handleProcessingComplete} />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={hideToast}
      />
    </div>
  );
}
