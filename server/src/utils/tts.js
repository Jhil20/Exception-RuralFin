const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "E:/comp. Eng/Exception-RuralFin/server/src/utils/google-tts-key.json",
});
const ttsHandler = async (req, res) => {
  const { text, langCode } = req.body;

  const request = {
    input: { text },
    voice: { languageCode: langCode || "en-IN", ssmlGender: "NEUTRAL" },
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