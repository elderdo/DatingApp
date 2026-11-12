namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
  public async Task<Member?> GetMemberByIdAsync(string id)
  {
    return await context.Members.FindAsync(id);
  }

  public async Task<IReadOnlyList<Member>> GetMembersAsync()
  {
    return await context.Members.ToListAsync();
  }

  public async Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId)
  {
    return await context.Members
        .Where(x => x.Id == memberId)
        .SelectMany(x => x.Photos)
        .ToListAsync();
  }

  public async Task<bool> SaveAllAsync()
  {
    return await context.SaveChangesAsync() > 0;
  }

  // avoid a false returned by SaveAllAsync by calling this method
  // consequently if nothing changes we won't be issuing an error 
  // as we would for an invocation of SaveAllAsync that returns false
  public void Update(Member member)
  {
    context.Entry(member).State = EntityState.Modified;
  }
}
