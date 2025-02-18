'use client';

import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(false);
  const [ready, setReady] = useState(false);

  const classify = async (text: string) => {
    if (!text) return;
    if (ready === null) setReady(false);

    const result = await fetch(
      `/api/classify?text=${encodeURIComponent(text)}`
    );
    if (!ready) setReady(true);

    const json = await result.json();
    setResult(json);
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-12'>
      <h1 className='text-5xl font-bold mb-2 text-center'>Transformers.js</h1>
      <h2 className='text-2xl mb-4 text-center'>
        Next.js template (server-side)
      </h2>
      <input
        type='text'
        className='w-full max-w-xs p-2 border border-gray-300 rounded mb-4'
        placeholder='Enter text here'
        onChange={(e) => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className='bg-gray-100 p-2 rounded'>
          {!ready || !result ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
