import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [dream, setDream] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [soundUrl, setSoundUrl] = useState("");
  const [ttsUrl, setTtsUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const backgroundAudioRef = useRef(null);
  const ttsAudioRef = useRef(null);

  const handleSubmit = async () => {
    if (!dream.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream }),
      });

      const data = await res.json();
      setInterpretation(data.interpretation);
      setAnimationUrl(data.animation);
      setSoundUrl(data.sound);
      setTtsUrl(data.audio);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  // Auto-play background sound
  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = 0.3;
      backgroundAudioRef.current.play().catch(() => {});
    }
  }, [soundUrl]);

  // Auto-play TTS voice
  useEffect(() => {
    if (ttsAudioRef.current) {
      ttsAudioRef.current.play().catch(() => {});
    }
  }, [ttsUrl]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video background */}
      {animationUrl && (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={`http://localhost:5000${animationUrl}`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          🌙 Dreamspace Oracle
        </motion.h1>

        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Describe your dream..."
          className="w-full max-w-lg p-3 rounded mb-4 text-black"
          rows="3"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          {loading ? "Interpreting..." : "Reveal Interpretation"}
        </button>

        {interpretation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-white bg-opacity-80 text-black p-4 rounded shadow max-w-2xl whitespace-pre-wrap text-left"
          >
            {interpretation}
          </motion.div>
        )}
      </div>

      {/* Background audio */}
      {soundUrl && (
        <audio ref={backgroundAudioRef} src={`http://localhost:5000${soundUrl}`} loop />
      )}

      {/* TTS audio */}
      {ttsUrl && (
        <audio ref={ttsAudioRef} src={`http://localhost:5000${ttsUrl}`} />
      )}
    </div>
  );
}
