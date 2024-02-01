using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities; //le damos el namespace de la carpeta en la que nos encontremos

public class AppUser
{
    //debemos tener uan propiedad que se llame Id para seguir el convenio de Entity Framework
    public int Id { get; set; }

    public string UserName {get; set;}

    public byte[] PasswordHash { get; set; }
    
    public byte[] PasswordSalt { get; set; }

    public DateOnly DateOfBirth { get; set; }
    public string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string Gender { get; set; }
    public string Introduction { get; set; }
    public string LookingFor { get; set; }
    public string Interests { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    //navigation property (user.photos)
    public List<Photo> Photos { get; set; } = new List<Photo>();

    // public int GetAge() 
    // {
    //     return DateOfBirth.CalculateAge();
    // }
}
