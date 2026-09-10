using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.IdentityModel.Tokens;
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
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    var tokenKey = builder.Configuration["TokenKey"] 
      ?? throw new Exception("Token key not found - Program.cs");
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
      ValidateIssuer = false,
      ValidateAudience = false
    };
  });

var app = builder.Build();

// Configure the HTTP request pipeline. 
app.UseCors(options => options.AllowAnyHeader()
  .AllowAnyMethod()
  .WithOrigins("http://localhost:4200","https://localhost:4200"));
app.UseAuthentication(); // Order and the location of this is 'important'
app.UseAuthorization();  // must follow Authentication and be located here in Program.cs

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
