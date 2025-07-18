const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { spawn } = require("child_process");
const { Configuration, OpenAI } = require("openai");
const gTTS = require("gtts");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static assets like videos and sounds
app.use("/assets", express.static(path.join(__dirname, "../public_assets")));

// Setup OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function pickAssets(dream) {
  const lower = dream.toLowerCase();
  if (lower.includes("forest")) {
    return {
      animation: "/assets/videos/forest.mp4",
      sound: "/assets/sounds/forest.mp3"
    };
  } else if (lower.includes("ocean")) {
    return {
      animation: "/assets/videos/ocean.mp4",
      sound: "/assets/sounds/ocean.mp3"
    };
  } else if (lower.includes("sky")) {
    return {
      animation: "/assets/videos/sky.mp4",
      sound: "/assets/sounds/sky.mp3"
    };
  } else {
    return {
      animation: "/assets/videos/default.mp4",
      sound: "/assets/sounds/default.mp3"
    };
  }
}

app.post("/interpret", async (req, res) => {
  const { dream } = req.body;

  if (!dream) {
    return res.status(400).json({ error: "Please provide a dream." });
  }

  try {
    // Create interpretation
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a poetic dream interpreter. Respond beautifully."
        },
        {
          role: "user",
          content: `Interpret this dream in detail:\n"${dream}"\nAlso give 3 reflection questions.`
        }
      ]
    });

    const text = completion.choices[0].message.content;

    // Generate speech file
    const tts = new gTTS(text, "en");
    const filename = `${uuidv4()}.mp3`;
    const filepath = path.join(__dirname, `tts_${filename}`);

    tts.save(filepath, (err) => {
      if (err) {
        console.error("TTS error:", err);
      }
    });

    // Choose animation and sound
    const assets = pickAssets(dream);

    res.json({
      interpretation: text,
      audio: `/tts/${filename}`,
      animation: assets.animation,
      sound: assets.sound
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating interpretation." });
  }
});

// Serve generated TTS audio
app.use("/tts", express.static(__dirname));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
