

using API.Entities;

//no es estrictamente necesario usar una interfaz a la hora de crear un serrvicio, pero es muy útil para hacer testing
namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken( AppUser user);
    }
}