import { useState } from 'react';

type Mode = 'signin' | 'register' | 'forgot' | 'reset';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('Mock success. Backend not connected.');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', padding: 'var(--space-6)' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)', marginBottom: 'var(--space-6)' }}>
          {mode === 'signin' ? 'Sign In' : mode === 'register' ? 'Register' : mode === 'forgot' ? 'Forgot Password' : 'Reset Password'}
        </h1>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          {(['signin','register','forgot'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setMessage(''); }} style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius)', border: 'var(--border-width) solid var(--color-border)', background: mode===m ? 'var(--color-primary)' : 'var(--color-surface)', color: mode===m ? '#fff' : 'var(--color-heading)', cursor: 'pointer' }}>
              {m === 'signin' ? 'Sign In' : m === 'register' ? 'Register' : 'Forgot'}
            </button>
          ))}
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {(mode === 'register') && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span style={{ fontSize: 'var(--text-label-size)', fontWeight: 'var(--text-label-weight)' }}>Full Name</span>
              <input required style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
            </label>
          )}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <span style={{ fontSize: 'var(--text-label-size)', fontWeight: 'var(--text-label-weight)' }}>Email or Phone</span>
            <input value={email} onChange={e=>setEmail(e.target.value)} required style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
          </label>
          {(mode === 'signin' || mode === 'register') && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span style={{ fontSize: 'var(--text-label-size)', fontWeight: 'var(--text-label-weight)' }}>Password</span>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} required style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', width: '100%', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position: 'absolute', right: 8, top: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)' }}>{showPw ? 'Hide' : 'Show'}</button>
              </div>
            </label>
          )}
          {mode === 'forgot' && (
            <button type="button" onClick={()=>setMode('reset')} style={{ color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>I have a reset link</button>
          )}
          <button type="submit" style={{ height: 'var(--button-height)', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600 }}>
            {mode === 'signin' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-success)', fontSize: 'var(--text-small-size)' }}>{message}</p>}
      </div>
    </div>
  );
}