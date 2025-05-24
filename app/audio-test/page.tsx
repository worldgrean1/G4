"use client"

import { AudioTestPanel } from '@/components/debug/AudioTestPanel';

export default function AudioTestPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <AudioTestPanel />
    </div>
  );
}
