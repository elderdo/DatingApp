namespace API.Data;

public class Seed
{
  public static async Task SeedUsers(AppDbContext context)
  {
    // Avoid adding the sample users again if the database already has any users.
    if (await context.Users.AnyAsync()) return;

    // Read the sample users from the JSON file and turn the JSON into C# objects.
    var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
    var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);

    // Stop if deserialization produced no list of members.
    if (members == null)
    {
      Console.WriteLine("No members in seed data");
      return;
    }


    foreach (var member in members)
    {
      // Create a hashing tool to safely store a hash of the shared sample password,
      // rather than storing the plain-text password in the database.
      using var hmac = new HMACSHA512();

      // Build a user record and its related member profile from one seed-data entry.
      var user = new AppUser
      {
        Id = member.Id,
        Email = member.Email,
        DisplayName = member.DisplayName,
        ImageUrl = member.ImageUrl,
        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
        PasswordSalt = hmac.Key,
        Member = new Member
        {
          Id = member.Id,
          DisplayName = member.DisplayName,
          Description = member.Description,
          DateOfBirth = member.DateOfBirth,
          ImageUrl = member.ImageUrl,
          Gender = member.Gender,
          City = member.City,
          Country = member.Country,
          LastActive = member.LastActive,
          Created = member.Created
        }
      };

      // Add the profile's main image to its photo collection.
      user.Member.Photos.Add(new Photo
      {
        Url = member.ImageUrl!,
        MemberId = member.Id
      });

      // Queue this user for insertion; the changes are written after the loop.
      context.Users.Add(user);
    }

    // Save all queued users and their related profile/photo records to the database.
    await context.SaveChangesAsync();
  }
}
