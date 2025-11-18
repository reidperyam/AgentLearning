using System.Collections.Concurrent;
using ClaudeLearningProject.Api.Models;

namespace ClaudeLearningProject.Api.Services;

public class ChatService
{
    private readonly ConcurrentBag<ChatMessage> _messages = new();

    public IEnumerable<ChatMessage> GetAllMessages()
    {
        return _messages.OrderBy(m => m.Timestamp);
    }

    public ChatMessage AddMessage(string username, string content)
    {
        var message = new ChatMessage
        {
            Id = Guid.NewGuid(),
            Username = username,
            Content = content,
            Timestamp = DateTime.UtcNow
        };

        _messages.Add(message);
        return message;
    }

    public void ClearMessages()
    {
        _messages.Clear();
    }
}
