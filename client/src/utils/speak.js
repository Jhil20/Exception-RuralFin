function speak(text, lang = "en-IN") {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject("Speech Synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((voice) => voice.lang === lang);
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => resolve();      // resolves after speaking
    utterance.onerror = (e) => reject(e);   // reject on error

    window.speechSynthesis.speak(utterance);
  });
}


export default speak;