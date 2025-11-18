import { useState, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
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
    </div>
  );
}
