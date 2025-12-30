"use client";

import { useState } from "react";
import { Settings, LogOut, User, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar" style={{ padding: "0 32px" }}>
      <div className="flex items-center" style={{ gap: "32px" }}>
        <div className="flex items-center" style={{ gap: "12px" }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #06d6a0, #00b4d8)",
              borderRadius: "8px",
            }}
          >
            <Sparkles size={20} color="#0a0e14" />
          </div>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#e6edf3" }}>
            AudioClean
          </span>
        </div>

        <div className="flex items-center" style={{ gap: "24px" }}>
          <a
            href="#"
            className="transition-all"
            style={{
              fontSize: "14px",
              color: "#e6edf3",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="transition-all"
            style={{
              fontSize: "14px",
              color: "#8b949e",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            My Files
          </a>
          <a
            href="#"
            className="transition-all"
            style={{
              fontSize: "14px",
              color: "#8b949e",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            History
          </a>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: "16px" }}>
        <div
          className="badge badge-pro"
          style={{ padding: "4px 12px" }}
        >
          PRO
        </div>

        <div className="relative">
          <button
            className="avatar cursor-pointer transition-all"
            style={{ width: "40px", height: "40px" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            AM
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed"
                style={{ inset: 0, zIndex: 40 }}
                onClick={() => setIsMenuOpen(false)}
              />
              <div
                className="dropdown animate-slide-down"
                style={{
                  top: "calc(100% + 8px)",
                  right: 0,
                  padding: "8px",
                }}
              >
                <button
                  className="dropdown-item"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    gap: "12px",
                    border: "none",
                    background: "transparent",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  className="dropdown-item"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    gap: "12px",
                    border: "none",
                    background: "transparent",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="divider-h" style={{ margin: "8px 0" }} />
                <button
                  className="dropdown-item"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    gap: "12px",
                    border: "none",
                    background: "transparent",
                    color: "#ef476f",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

