

using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]  //spi/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("username taken");

            var user = _mapper.Map<AppUser>(registerDto);

            //usamos using porque no vamos a necesitar esta variable fuera de este método. Lo borra autmáticamente después y nos ahorramos basura
            //en memoria y código
            using var hmac = new HMACSHA512();  //crea un random HASH para codificar la contraseña


            user.UserName = registerDto.Username.ToLower();  //guardamos en lowercase
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs = user.KnownAs
                //PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //COMPROBAMOS USERNAME

            //se podría usar el método find si estuviéramos buscando por ID. Como no es el caso, es mejor usar FirstOrDefault.
            //Esto devuelve el usuario o null si no se ha encontrado. Si solo usamos First, tendremos una excepción si el usuario no existe.
            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("invalid username");

            //COMPROBAMOS PASSWORD
            using var hmac = new HMACSHA512(user.PasswordSalt); //usamos el mismo hash para codificar y comprobar que las dos contraseñas son iguales

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)    //comprobamos cada byte del array
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };
        }

        private async Task<bool> UserExists(string username)
        {
            //en C# no usamos el ===, simplemente ==
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

    }
}