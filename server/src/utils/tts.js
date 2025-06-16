const fs = require("fs");
const path = require("path");
const textToSpeech = require("@google-cloud/text-to-speech");

// Write key file from environment variable if not already written
const keyPath = path.join(__dirname, "google-tts-key.json");
if (!fs.existsSync(keyPath)) {
  const keyContent = process.env.GOOGLE_TTS_KEY;
  if (!keyContent) {
    throw new Error("GOOGLE_TTS_KEY environment variable not set");
  }
  fs.writeFileSync(keyPath, keyContent);
}

// Create Google TTS client using the written key file
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyPath,
});

const ttsHandler = async (req, res) => {
  const { text, langCode } = req.body;

  const request = {
    input: { text },
    voice: {
      languageCode: langCode || "en-IN",
      ssmlGender: "NEUTRAL",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": response.audioContent.length,
    });
    res.send(response.audioContent);
  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).send("Failed to generate speech");
  }
};

module.exports = ttsHandler;
