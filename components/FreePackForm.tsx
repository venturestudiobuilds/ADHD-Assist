'use client';

// Free pack email capture. The email travels in the POST body (and never in
// the URL), so it stays out of browser history, server access logs, and
// analytics tools that log full URLs.

import React from 'react';
import { useRouter } from 'next/navigation';

export default function FreePackForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'free-pack' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      router.push('/thank-you?product=free-pack');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, maxWidth: 460, margin: '0 auto' }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Your email address"
        style={{
          width: '100%',
          padding: '14px 20px',
          fontSize: 16,
          border: '3px solid var(--ink)',
          borderRadius: 999,
          fontFamily: 'inherit',
          outline: 'none',
          background: 'white',
          color: 'var(--ink)',
          boxSizing: 'border-box',
        }}
      />
      <button type="submit" className="cta-button" style={{ width: '100%' }} disabled={busy}>
        {busy ? 'One sec…' : 'Send me the free pack →'}
      </button>
      {error && <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--coral-dark)', margin: 0 }}>{error}</p>}
      <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.5, margin: 0 }}>
        No spam. Unsubscribe any time. Just the pack. See our{' '}
        <a href="/privacy" style={{ color: 'inherit', fontWeight: 700 }}>privacy policy</a>.
      </p>
    </form>
  );
}
