import { useState, FormEvent } from 'react';

interface MessageInputProps {
  username: string;
  onSendMessage: (username: string, content: string) => void;
  onUsernameChange: (username: string) => void;
  disabled?: boolean;
}

export function MessageInput({ username, onSendMessage, onUsernameChange, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      onSendMessage(username, message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <div className="input-row">
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          disabled={disabled}
          className="username-input"
          maxLength={50}
        />
      </div>
      <div className="input-row">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="message-text-input"
        />
        <button type="submit" disabled={disabled || !message.trim() || !username.trim()}>
          Send
        </button>
      </div>
    </form>
  );
}
