import { textToMorse } from './morse';

const TIMING = {
  DOT: 100,
  DASH: 300,
  PAUSE: 200,
} as const;

const FREQ = {
  DOT: 1200,
  DASH: 800,
} as const;

type AudioContextType = typeof AudioContext | typeof webkitAudioContext;

export async function playMorseSound(pattern: string): Promise<void> {
  const AudioContextClass = (window.AudioContext || 
    window.webkitAudioContext) as AudioContextType;
  const audioContext = new AudioContextClass();
  
  await audioContext.resume();
  
  const playTone = async (freq: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    gain.gain.value = 0.5;
    
    oscillator.start();
    await new Promise(resolve => setTimeout(resolve, duration));
    oscillator.stop();
  };

  for (const symbol of pattern) {
    if (symbol === '.') {
      if (navigator.vibrate) {
        navigator.vibrate(TIMING.DOT);
      } else {
        await playTone(FREQ.DOT, TIMING.DOT);
      }
    } else if (symbol === '-') {
      if (navigator.vibrate) {
        navigator.vibrate(TIMING.DASH);
      } else {
        await playTone(FREQ.DASH, TIMING.DASH);
      }
    }
    await new Promise(resolve => setTimeout(resolve, TIMING.PAUSE));
  }
}

export async function transmitMorse(text: string): Promise<void> {
  const morsePattern = textToMorse(text);
  await playMorseSound(morsePattern);
}