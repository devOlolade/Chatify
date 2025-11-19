using ChatifyBack.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();

app.UseCors("AllowReact");

// Map hubs
app.MapHub<ChatHub>("/chathub");

app.MapGet("/", () => "Chatify Backend Running!");

app.Run();
