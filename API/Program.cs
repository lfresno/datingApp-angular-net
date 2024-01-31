
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//El código que se usa para añadir estos servicios se ha separado a dos archivos de extensión, de forma
//que el proyecto quede más limpio y ordenado
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline
app.UseCors( builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

app.UseAuthentication();    //tienes token?
app.UseAuthorization();     //qué puedes hacer con ese token?

app.MapControllers();

app.Run();
