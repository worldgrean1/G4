"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Howl } from 'howler';

interface AudioTestResult {
  file: string;
  status: 'loading' | 'success' | 'error';
  error?: string;
  duration?: number;
  size?: number;
}

export function AudioTestPanel() {
  const [testResults, setTestResults] = useState<AudioTestResult[]>([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const soundFiles = [
    'typing.mp3',
    'button-click.mp3',
    'alarm.mp3',
    'fan-noise.mp3',
    'inverter-hum.mp3'
  ];

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      } catch (error) {
        console.error('Failed to create AudioContext:', error);
      }
    }
  }, []);

  // Test individual sound file
  const testSoundFile = async (filename: string): Promise<AudioTestResult> => {
    return new Promise((resolve) => {
      const result: AudioTestResult = {
        file: filename,
        status: 'loading'
      };

      // First, check if file exists and get size
      fetch(`/sounds/${filename}`, { method: 'HEAD' })
        .then(response => {
          const contentLength = response.headers.get('content-length');
          result.size = contentLength ? parseInt(contentLength) : 0;
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          if (result.size === 0) {
            throw new Error('File is empty (0 bytes)');
          }

          // Try to load and play with Howler
          const sound = new Howl({
            src: [`/sounds/${filename}`],
            volume: 0.1, // Low volume for testing
            preload: true,
            onload: () => {
              result.status = 'success';
              result.duration = sound.duration();
              resolve(result);
            },
            onloaderror: (id, error) => {
              result.status = 'error';
              result.error = `Howler load error: ${error}`;
              resolve(result);
            },
            onplayerror: (id, error) => {
              result.status = 'error';
              result.error = `Howler play error: ${error}`;
              resolve(result);
            }
          });

          // Test playback if user has interacted
          if (userInteracted) {
            try {
              sound.play();
              setTimeout(() => sound.stop(), 500); // Stop after 500ms
            } catch (error) {
              result.status = 'error';
              result.error = `Play failed: ${error}`;
              resolve(result);
            }
          }
        })
        .catch(error => {
          result.status = 'error';
          result.error = error.message;
          resolve(result);
        });
    });
  };

  // Test all sound files
  const testAllSounds = async () => {
    setIsTestingAll(true);
    setTestResults([]);
    
    for (const filename of soundFiles) {
      const result = await testSoundFile(filename);
      setTestResults(prev => [...prev, result]);
    }
    
    setIsTestingAll(false);
  };

  // Play a test sound
  const playTestSound = (filename: string) => {
    if (!userInteracted) {
      setUserInteracted(true);
    }

    try {
      const sound = new Howl({
        src: [`/sounds/${filename}`],
        volume: 0.3,
        onloaderror: (id, error) => {
          console.error(`Failed to load ${filename}:`, error);
        },
        onplayerror: (id, error) => {
          console.error(`Failed to play ${filename}:`, error);
        }
      });
      
      sound.play();
    } catch (error) {
      console.error(`Error playing ${filename}:`, error);
    }
  };

  // Generate a test beep sound
  const playTestBeep = () => {
    if (!audioContext) return;
    
    try {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      
      setUserInteracted(true);
    } catch (error) {
      console.error('Failed to play test beep:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'error':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <AlertCircle className="text-yellow-500" size={16} />;
    }
  };

  return (
    <motion.div
      className="bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-6 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Audio System Diagnostics</h3>
          <div className="flex gap-2">
            <button
              onClick={playTestBeep}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Test Beep
            </button>
            <button
              onClick={testAllSounds}
              disabled={isTestingAll}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:bg-gray-600"
            >
              {isTestingAll ? 'Testing...' : 'Test All Sounds'}
            </button>
          </div>
        </div>

        {/* Audio Context Status */}
        <div className="bg-gray-800/50 rounded p-3">
          <div className="text-sm text-gray-300 mb-2">Audio Context Status:</div>
          <div className="text-xs space-y-1">
            <div>State: <span className={audioContext?.state === 'running' ? 'text-green-400' : 'text-yellow-400'}>
              {audioContext?.state || 'Not available'}
            </span></div>
            <div>User Interaction: <span className={userInteracted ? 'text-green-400' : 'text-red-400'}>
              {userInteracted ? 'Yes' : 'No (required for autoplay)'}
            </span></div>
          </div>
        </div>

        {/* Sound File Tests */}
        <div className="space-y-2">
          <div className="text-sm text-gray-300">Sound File Tests:</div>
          {testResults.map((result, index) => (
            <motion.div
              key={result.file}
              className="bg-gray-800/50 rounded p-3 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <div>
                  <div className="text-sm text-white">{result.file}</div>
                  <div className="text-xs text-gray-400">
                    {result.size !== undefined && `Size: ${result.size} bytes`}
                    {result.duration && ` | Duration: ${result.duration.toFixed(1)}s`}
                  </div>
                  {result.error && (
                    <div className="text-xs text-red-400 mt-1">{result.error}</div>
                  )}
                </div>
              </div>
              
              {result.status === 'success' && (
                <button
                  onClick={() => playTestSound(result.file)}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center gap-1"
                >
                  <Play size={12} />
                  Play
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/30 border border-blue-700 rounded p-3">
          <div className="text-sm text-blue-200">
            <strong>Instructions:</strong>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Click "Test Beep" to verify basic audio functionality</li>
              <li>• Click "Test All Sounds" to check all sound files</li>
              <li>• User interaction is required before audio can play (browser policy)</li>
              <li>• Check browser console for additional error details</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
