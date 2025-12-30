"use client";

import { useState } from "react";
import { Wand2, Wind, MessageSquare, Zap, Volume, Scissors } from "lucide-react";

interface CleaningOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  intensity?: number;
}

interface CleaningControlsProps {
  onProcess: (options: CleaningOption[]) => void;
  isProcessing: boolean;
}

export default function CleaningControls({
  onProcess,
  isProcessing,
}: CleaningControlsProps) {
  const [options, setOptions] = useState<CleaningOption[]>([
    {
      id: "noise",
      label: "Remove Background Noise",
      description: "Eliminate ambient sounds, hum, and static",
      icon: <Wind size={20} />,
      enabled: true,
      intensity: 70,
    },
    {
      id: "fillers",
      label: "Remove Vocal Fillers",
      description: "Remove 'uh', 'um', 'like', and other hesitations",
      icon: <MessageSquare size={20} />,
      enabled: true,
      intensity: 80,
    },
    {
      id: "silence",
      label: "Trim Silence",
      description: "Remove long pauses and dead air",
      icon: <Scissors size={20} />,
      enabled: false,
      intensity: 60,
    },
    {
      id: "enhance",
      label: "Voice Enhancement",
      description: "Boost clarity and vocal presence",
      icon: <Volume size={20} />,
      enabled: true,
      intensity: 65,
    },
    {
      id: "clicks",
      label: "Remove Clicks & Pops",
      description: "Eliminate mouth clicks and audio artifacts",
      icon: <Zap size={20} />,
      enabled: false,
      intensity: 75,
    },
  ]);

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const updateIntensity = (id: string, intensity: number) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, intensity } : opt))
    );
  };

  const enabledCount = options.filter((opt) => opt.enabled).length;

  return (
    <div className="sidebar" style={{ padding: "24px" }}>
      <div className="flex flex-col" style={{ gap: "24px", height: "100%" }}>
        <div className="flex flex-col" style={{ gap: "8px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#e6edf3" }}>
            Cleaning Options
          </h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#8b949e" }}>
            Select and configure audio enhancements
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: "12px", flex: 1, overflowY: "auto" }}>
          {options.map((option) => (
            <div key={option.id} className="card" style={{ padding: "16px" }}>
              <div className="flex items-start justify-between" style={{ marginBottom: "12px" }}>
                <div className="flex items-start" style={{ gap: "12px", flex: 1 }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: option.enabled
                        ? "rgba(6, 214, 160, 0.15)"
                        : "rgba(139, 148, 158, 0.1)",
                      borderRadius: "8px",
                      color: option.enabled ? "#06d6a0" : "#8b949e",
                      flexShrink: 0,
                    }}
                  >
                    {option.icon}
                  </div>
                  <div className="flex flex-col" style={{ gap: "4px", flex: 1 }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: 600,
                        color: option.enabled ? "#e6edf3" : "#8b949e",
                      }}
                    >
                      {option.label}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#8b949e",
                        lineHeight: "1.4",
                      }}
                    >
                      {option.description}
                    </p>
                  </div>
                </div>

                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={option.enabled}
                    onChange={() => toggleOption(option.id)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              {option.enabled && option.intensity !== undefined && (
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "12px", color: "#8b949e" }}>
                      Intensity
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#06d6a0",
                      }}
                    >
                      {option.intensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={option.intensity}
                    onChange={(e) =>
                      updateIntensity(option.id, parseInt(e.target.value))
                    }
                    className="slider"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col" style={{ gap: "12px" }}>
          <div
            className="card"
            style={{
              padding: "12px 16px",
              background: "rgba(6, 214, 160, 0.1)",
              border: "1px solid rgba(6, 214, 160, 0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontSize: "13px", color: "#e6edf3" }}>
                Active enhancements
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#06d6a0",
                }}
              >
                {enabledCount} of {options.length}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary flex items-center justify-center"
            style={{ width: "100%", padding: "14px", gap: "8px", fontSize: "15px" }}
            onClick={() => onProcess(options)}
            disabled={isProcessing || enabledCount === 0}
          >
            <Wand2 size={20} />
            {isProcessing ? "Processing..." : "Clean Audio"}
          </button>
        </div>
      </div>
    </div>
  );
}

