using ClaudeLearningProject.Api.Models;
using ClaudeLearningProject.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSingleton<ChatService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:4173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// API Endpoints
app.MapGet("/api/health", () => new { status = "healthy", timestamp = DateTime.UtcNow })
    .WithName("HealthCheck")
    .WithOpenApi();

app.MapGet("/api/messages", (ChatService chatService) =>
{
    return Results.Ok(chatService.GetAllMessages());
})
.WithName("GetMessages")
.WithOpenApi();

app.MapPost("/api/messages", (CreateMessageRequest request, ChatService chatService) =>
{
    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Content))
    {
        return Results.BadRequest(new { error = "Username and content are required" });
    }

    var message = chatService.AddMessage(request.Username, request.Content);
    return Results.Created($"/api/messages/{message.Id}", message);
})
.WithName("CreateMessage")
.WithOpenApi();

app.MapDelete("/api/messages", (ChatService chatService) =>
{
    chatService.ClearMessages();
    return Results.NoContent();
})
.WithName("ClearMessages")
.WithOpenApi();

app.Run();
