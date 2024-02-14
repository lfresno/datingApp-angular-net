using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Gender { get; set; }

        //las propiedades que queremos recibir
        [Required]
        public string Username { get; set; }

        [Required] public string KnownAs { get; set; }
        [Required] public DateOnly? DateOfBirth { get; set; }   //hay que hacerlo opcional para que funcione el required ?
                    //si no lo pones opcional, por defecto cogerá la fecha default y no saltará el problema de que el usuario no lo haya especificado
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}