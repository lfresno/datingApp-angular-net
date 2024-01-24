

using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]  //spi/account/register
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username)) return BadRequest("username taken");

            //usamos using porque no vamos a necesitar esta variable fuera de este método. Lo borra autmáticamente después y nos ahorramos basura
            //en memoria y código
            using var hmac = new HMACSHA512();  //crea un random HASH para codificar la contraseña

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),  //guardamos en lowercase
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            //COMPROBAMOS USERNAME

            //se podría usar el método find si estuviéramos buscando por ID. Como no es el caso, es mejor usar FirstOrDefault.
            //Esto devuelve el usuario o null si no se ha encontrado. Si solo usamos First, tendremos una excepción si el usuario no existe.
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("invalid username");

            //COMPROBAMOS PASSWORD
            using var hmac = new HMACSHA512(user.PasswordSalt); //usamos el mismo hash para codificar y comprobar que las dos contraseñas son iguales

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i=0; i<computedHash.Length; i++)    //comprobamos cada byte del array
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
            }

            return user;
        }

        private async Task<bool> UserExists(string username)
        {   
            //en C# no usamos el ===, simplemente ==
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

    }
}