using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)    //base class: DbContext
    {
    }

    //Entity framework creará una tabla en la BD que se llame Users, con objetos de tipo AppUser
    public DbSet<AppUser> Users { get; set; }
}
