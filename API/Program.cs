using API.Data;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add native OpenApi generation (replaces AddSwaggerGen)
builder.Services.AddOpenApi(); 
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline. 
app.UseCors(options => options.AllowAnyHeader()
  .AllowAnyMethod()
  .WithOrigins("http://localhost:4200","https://localhost:4200"));

if (app.Environment.IsDevelopment())
{
  // 2. Map the raw OpenAPI JSON endpoint
  app.MapOpenApi();
  // 3. Map the Scalar API reference UI (replaces UseSwaggerUI)
  // the endpoint is https://localhost:5001/scalar/v1 - (see ApplicationUrl for launchSettings.json)
  app.MapScalarApiReference(options =>
  {
    options.Title = "DatingApp API Doc'";
    options.Theme = ScalarTheme.Moon;
    // Sets the default code-snippet Language in the UI panel
    options.DefaultHttpClient = new(ScalarTarget.CSharp, ScalarClient.HttpClient);
  });
}

// allow for the use of wwwroot and its index.html  
app.UseDefaultFiles();
app.UseStaticFiles(); // this serves index.html from wwwroot

// Scan all the Controllers and use their WebApi
app.MapControllers();

app.Run();
