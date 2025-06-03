const speak = (message) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);
};

export default speak;
