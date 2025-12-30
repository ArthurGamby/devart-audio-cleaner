"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

interface ProcessingStep {
  label: string;
  status: "pending" | "processing" | "complete";
}

export default function ProcessingModal({
  isOpen,
  onComplete,
}: ProcessingModalProps) {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { label: "Analyzing audio quality", status: "pending" },
    { label: "Removing background noise", status: "pending" },
    { label: "Detecting vocal fillers", status: "pending" },
    { label: "Enhancing voice clarity", status: "pending" },
    { label: "Finalizing audio", status: "pending" },
  ]);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setSteps((prev) =>
        prev.map((step) => ({ ...step, status: "pending" }))
      );
      return;
    }

    let currentProgress = 0;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      // Update step status
      const stepProgress = Math.floor((currentProgress / 100) * steps.length);
      if (stepProgress > currentStep) {
        setSteps((prev) =>
          prev.map((step, i) => {
            if (i < stepProgress) return { ...step, status: "complete" };
            if (i === stepProgress) return { ...step, status: "processing" };
            return step;
          })
        );
        currentStep = stepProgress;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, onComplete, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop animate-scale-in">
      <div
        className="modal"
        style={{
          width: "480px",
          padding: "32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center" style={{ gap: "24px" }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: "80px",
              height: "80px",
              background: "rgba(6, 214, 160, 0.15)",
              borderRadius: "50%",
            }}
          >
            {progress >= 100 ? (
              <CheckCircle size={40} color="#06d6a0" />
            ) : (
              <Loader2 size={40} color="#06d6a0" className="animate-spin" />
            )}
          </div>

          <div className="flex flex-col items-center" style={{ gap: "8px" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 700,
                color: "#e6edf3",
              }}
            >
              {progress >= 100 ? "Processing Complete!" : "Processing Audio"}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#8b949e",
                textAlign: "center",
              }}
            >
              {progress >= 100
                ? "Your audio has been cleaned successfully"
                : "This may take a few moments..."}
            </p>
          </div>

          <div style={{ width: "100%" }}>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="flex items-center justify-between"
              style={{ marginTop: "8px" }}
            >
              <span style={{ fontSize: "13px", color: "#8b949e" }}>
                Progress
              </span>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#06d6a0" }}
              >
                {progress}%
              </span>
            </div>
          </div>

          <div
            className="flex flex-col"
            style={{ width: "100%", gap: "8px" }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center"
                style={{ gap: "12px" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      step.status === "complete"
                        ? "#06d6a0"
                        : step.status === "processing"
                        ? "rgba(6, 214, 160, 0.3)"
                        : "rgba(139, 148, 158, 0.2)",
                    border:
                      step.status === "processing"
                        ? "2px solid #06d6a0"
                        : "none",
                  }}
                >
                  {step.status === "complete" && (
                    <CheckCircle size={14} color="#0a0e14" />
                  )}
                  {step.status === "processing" && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#06d6a0",
                      }}
                      className="animate-pulse"
                    />
                  )}
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    color:
                      step.status === "pending" ? "#8b949e" : "#e6edf3",
                    fontWeight: step.status === "processing" ? 600 : 400,
                  }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

