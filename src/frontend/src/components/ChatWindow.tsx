import { useState, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Modal } from './ui/Modal/Modal';
import { Icon } from './ui/Icon';
import { WeaponPicker } from './ui/WeaponPicker/WeaponPicker';
import { api } from '../services/api';
import type { ChatMessage } from '../types/chat';

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('chatUsername') || '';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatUsername', username);
  }, [username]);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMessages = async () => {
    try {
      const msgs = await api.getMessages();
      setMessages(msgs);
      setIsOnline(true);
      setError(null);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setIsOnline(false);
    }
  };

  const handleSendMessage = async (username: string, content: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.sendMessage({ username, content });
      await loadMessages(); // Refresh messages immediately
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearMessages = async () => {
    if (!confirm('Are you sure you want to clear all messages?')) {
      return;
    }

    try {
      await api.clearMessages();
      setMessages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear messages');
      console.error('Failed to clear messages:', err);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h1>Claude Learning Project</h1>
        <div className="header-actions">
          <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '● Online' : '● Offline'}
          </span>
          <button onClick={handleClearMessages} className="clear-button">
            Clear Chat
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <MessageList messages={messages} />

      <MessageInput
        username={username}
        onSendMessage={handleSendMessage}
        onUsernameChange={setUsername}
        disabled={loading}
      />

      {/* Modal Component Preview */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '0.75rem 1.5rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          zIndex: 999,
        }}
      >
        Show Modal Demo
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Component Demo"
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsModalOpen(false),
            variant: 'secondary',
          },
          {
            label: 'Confirm',
            onClick: () => {
              alert('Confirmed!');
              setIsModalOpen(false);
            },
            variant: 'primary',
          },
        ]}
      >
        <p>This is a demo of the Modal component. It supports:</p>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
          <li>Custom title and content</li>
          <li>Configurable action buttons with variants</li>
          <li>Close button and backdrop click to dismiss</li>
          <li>Smooth animations and responsive design</li>
        </ul>
      </Modal>

      {/* Icon Component Preview */}
      <div
        style={{
          position: 'fixed',
          bottom: '7rem',
          right: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 999,
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Icon Component Demo
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Icon size="small" variant="primary" ariaLabel="home">🏠</Icon>
          <Icon size="medium" variant="secondary" ariaLabel="heart">❤️</Icon>
          <Icon size="large" variant="success" ariaLabel="check">✓</Icon>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Icon variant="danger" onClick={() => alert('Delete clicked!')} ariaLabel="delete">🗑️</Icon>
          <Icon variant="neutral" onClick={() => alert('Settings clicked!')} ariaLabel="settings">⚙️</Icon>
          <Icon variant="primary" onClick={() => alert('Star clicked!')} ariaLabel="star">⭐</Icon>
        </div>
      </div>

      {/* WeaponPicker Component Preview */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 999,
        }}
      >
        <WeaponPicker onWeaponSelect={(weapon) => console.log('Selected weapon:', weapon)} />
      </div>
    </div>
  );
}
