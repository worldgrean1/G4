"use client"

import { useState } from 'react';
import {
  playButtonClickSound,
  playTypingSound,
  playAlarmSound,
  playMorningSunshineSound,
  testFallbackSounds,
  getSoundStatus,
  getAudioEnabled,
  setAudioEnabled,
  runAudioDiagnostics
} from '@/utils/sound';

export function SimpleAudioTest() {
  const [lastPlayed, setLastPlayed] = useState<string>('');
  const [audioEnabled, setAudioEnabledState] = useState(getAudioEnabled());

  const testSound = (soundName: string, playFunction: () => void) => {
    console.log(`Testing ${soundName}...`);
    setLastPlayed(soundName);
    playFunction();
  };

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    setAudioEnabledState(newState);
    console.log(`Audio ${newState ? 'enabled' : 'disabled'}`);
  };

  const checkSoundStatus = () => {
    const status = getSoundStatus();
    console.log('Sound status:', status);
    alert(`Sound status: ${JSON.stringify(status, null, 2)}`);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md">
      <h3 className="text-lg font-bold mb-4">Simple Audio Test</h3>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={audioEnabled}
            onChange={toggleAudio}
            className="w-4 h-4"
          />
          Audio Enabled
        </label>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={() => testSound('Button Click', playButtonClickSound)}
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Test Button Click
        </button>

        <button
          onClick={() => testSound('Typing', playTypingSound)}
          className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Test Typing Sound
        </button>

        <button
          onClick={() => testSound('Alarm', playAlarmSound)}
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Test Alarm
        </button>

        <button
          onClick={() => testSound('Morning Sunshine', playMorningSunshineSound)}
          className="w-full bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
        >
          🌅 Test Morning Sunshine
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={() => {
            console.log('Testing fallback sounds...');
            testFallbackSounds();
          }}
          className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
        >
          Test Fallback Sounds
        </button>

        <button
          onClick={checkSoundStatus}
          className="w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          Check Sound Status
        </button>

        <button
          onClick={() => {
            console.log('Running full audio diagnostics...');
            runAudioDiagnostics();
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Run Full Diagnostics
        </button>
      </div>

      {lastPlayed && (
        <div className="text-sm text-gray-300">
          Last played: {lastPlayed}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        <p>• Click any button to test audio</p>
        <p>• Check browser console for debug info</p>
        <p>• Make sure audio is enabled in browser</p>
        <p>• User interaction required for autoplay</p>
      </div>
    </div>
  );
}
