using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //las propiedades que queremos recibir
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}