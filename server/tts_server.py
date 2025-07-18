from flask import Flask, request, send_file
from gtts import gTTS

app = Flask(__name__)

@app.route("/speak", methods=["POST"])
def speak():
    text = request.json.get("text", "")
    tts = gTTS(text)
    filepath = "speech.mp3"
    tts.save(filepath)
    return send_file(filepath, mimetype="audio/mp3")

if __name__ == "__main__":
    app.run(port=5001)
