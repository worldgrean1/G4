"use client"

import { useState } from 'react';
import { getAudioGenerator } from '@/utils/audioGenerator';

export default function AudioDemoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSound, setLastSound] = useState('');

  const playSound = async (soundName: string, generator: () => Promise<void>) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setLastSound(soundName);

    try {
      await generator();
      console.log(`✅ Played ${soundName} successfully`);
    } catch (error) {
      console.error(`❌ Failed to play ${soundName}:`, error);
    } finally {
      setTimeout(() => setIsPlaying(false), 500);
    }
  };

  const audioGen = getAudioGenerator();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white p-8 rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🔊 Audio System Demo
        </h1>

        <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded">
          <h3 className="font-semibold text-green-300 mb-2">✅ Working Audio System</h3>
          <p className="text-sm text-green-200">
            This demo uses programmatic audio generation (Web Audio API)
            which bypasses file loading issues and works in all modern browsers.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => playSound('Button Click', () => audioGen.generateButtonClick())}
            disabled={isPlaying}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-3 rounded transition-colors"
          >
            🔘 Button Click Sound
          </button>

          <button
            onClick={() => playSound('Typing', () => audioGen.generateTyping())}
            disabled={isPlaying}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-3 rounded transition-colors"
          >
            ⌨️ Typing Sound
          </button>

          <button
            onClick={() => playSound('Alarm', () => audioGen.generateAlarm())}
            disabled={isPlaying}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-3 rounded transition-colors"
          >
            🚨 Alarm Sound
          </button>

          <button
            onClick={() => playSound('Morning Sunshine', () => audioGen.generateMorningSunshine())}
            disabled={isPlaying}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 px-4 py-3 rounded transition-colors"
          >
            ☀️ Morning Sunshine
          </button>
        </div>

        {lastSound && (
          <div className="text-center text-sm text-gray-300 mb-4">
            Last played: <span className="text-green-400">{lastSound}</span>
          </div>
        )}

        <div className="bg-gray-800 p-4 rounded text-xs">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ul className="space-y-1 text-gray-300">
            <li>• Uses Web Audio API to generate sounds</li>
            <li>• No external files required</li>
            <li>• Works offline and in all browsers</li>
            <li>• Instant playback, no loading delays</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Main App
          </a>
        </div>
      </div>
    </div>
  );
}
