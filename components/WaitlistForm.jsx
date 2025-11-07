'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabledAfterJoin, setDisabledAfterJoin] = useState(false);
  const [joinedRow, setJoinedRow] = useState(null); // shows saved row for proof

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    // basic validation
    if (!name.trim() || !email.trim()) {
      setStatus({ type: 'error', text: 'Name and email are required.' });
      return;
    }

    // guard if supabase wasn't initialized (safety)
    if (!supabase) {
      setStatus({ type: 'error', text: 'Supabase not configured. Check .env.local' });
      return;
    }

    if (loading || disabledAfterJoin) return; // prevent spamming
    setLoading(true);

    try {
      // Insert and request the inserted row back (.select()).single() returns the row
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          { name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() }
        ])
        .select()
        .single();

      setLoading(false);

      if (error) {
        // Better error handling for duplicate email (unique constraint)
        // Supabase error messages often contain "duplicate key value" or key name
        const msg = (error.message || '').toLowerCase();
        if (msg.includes('duplicate') || msg.includes('unique') || msg.includes('already')) {
          setStatus({ type: 'error', text: 'This email is already on the waitlist.' });
        } else {
          setStatus({ type: 'error', text: error.message || 'Something went wrong.' });
        }
        console.error('Supabase insert error:', error);
        return;
      }

      // success: show friendly message and a proof snippet (id & timestamp)
      setStatus({ type: 'success', text: "You're on the waitlist — thank you!" });
      setJoinedRow(data || null);
      setDisabledAfterJoin(true); // prevent new joins from same session
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setLoading(false);
      console.error('Unexpected error:', err);
      setStatus({ type: 'error', text: 'Unexpected error. Check console.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="waitlist-form">
      <label className="muted">Name❓</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name 🤔"
        disabled={loading || disabledAfterJoin}
      />

      <label className="muted">Email 📧</label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@haxsecurity.com"
        type="email"
        disabled={loading || disabledAfterJoin}
      />

      <label className="muted">Message 💬 (optional)</label>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={3}
        placeholder="✍🏽 What excites you about VibeCaps?"
        disabled={loading || disabledAfterJoin}
      />

      <button type="submit" disabled={loading || disabledAfterJoin}>
        {loading ? 'Joining...' : disabledAfterJoin ? 'Joined ✅' : 'Join Waitlist'}
      </button>

      {status && (
        <p
          className={status.type === 'error' ? 'status-error' : 'status-success'}
          style={{ marginTop: 12 }}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.text}
        </p>
      )}

      {/* Show the saved row as proof */}
      {joinedRow && (
        <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8' }}>
          <strong>Saved:</strong>{' '}
          {joinedRow.id ? (
            <>
              id: <code style={{ color: 'white' }}>{joinedRow.id}</code> •
            </>
          ) : null}{' '}
          {joinedRow.created_at ? (
            <>when: {new Date(joinedRow.created_at).toLocaleString()}</>
          ) : null}
        </div>
      )}
    </form>
  );
}
