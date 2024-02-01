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

    //no hace falta que creemos otro DB set para las fotos porque:
        //- no vamos a hacer queries con ellas directamente
        //- no vamos a querer que las fotos estén asociadas a más de un usuario a la vez
}

