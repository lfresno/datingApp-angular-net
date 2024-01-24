using System.ComponentModel.DataAnnotations;

namespace API.Entities; //le damos el namespace de la carpeta en la que nos encontremos

public class AppUser
{
    //debemos tener uan propiedad que se llame Id para seguir el convenio de Entity Framework
    public int Id { get; set; }

    public string UserName {get; set;}

    public byte[] PasswordHash { get; set; }
    
    public byte[] PasswordSalt { get; set; }
}
