# 🌌 Dreamspace Oracle

> **"Where dreams meet reality — and imagination becomes experience."**

Dreamspace Oracle is a futuristic, AI-powered web experience that **transforms user dreams into immersive visual and audio journeys**. Describe your dream — no matter how surreal — and watch it **come alive** through AI-generated videos, storytelling voiceovers, and expressive designs.  

Whether it's a fantasy land, a lost memory, or a vision of the future, this app bridges the subconscious with the real world.

---

## 🔮 Live Demo

> Coming Soon... *(Stay tuned!)*  
<!-- Add link here when deployed -->

---

## ✨ Features

- 🧠 **Dream-to-Scene Generator**: Converts user-entered dream descriptions into AI prompts.
- 🎥 **Video Generation**: Uses AI APIs to generate vivid short videos based on the dream.
- 🔊 **Voice Narration**: Transforms dream descriptions into natural-sounding speech.
- 🌐 **Responsive UI**: Built with Tailwind CSS and React for a clean and dreamy design.
- ⚙️ **Modular Architecture**: Python backend for TTS, Node/Express server for logic, and React frontend.

---

## 🛠️ Tech Stack

| Layer        | Tech Used                            |
|--------------|--------------------------------------|
| **Frontend** | React.js, Tailwind CSS               |
| **Backend**  | Node.js, Express.js                  |
| **AI Services** | Gemini API (text), Pika/Kaiber (video), ElevenLabs/Bark (audio) |
| **Python Server** | Flask (for TTS service)            |
| **Version Control** | Git, GitHub                     |

---

## 🧪 How It Works

1. **Describe Your Dream**  
   Type in a short description of what you saw or imagined in your dream.

2. **AI Translates**  
   The backend formats this into structured prompts and sends them to various AI services.

3. **Dream Comes Alive**  
   Watch a generated video, hear a voice narration of your dream, and feel immersed.

---

## 🚀 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/Hema3108/dreamspace-oracle.git
cd dreamspace-oracle

# 2. Install client dependencies
cd client
npm install

# 3. Install server dependencies
cd ../server
npm install

# 4. (Optional) Run Python TTS server
cd ../tts-server
pip install -r requirements.txt
python app.py

# 5. Run both servers (use concurrently or separate terminals)
cd ../client
npm start
