using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize] //se usa en general para todos los endpoints de este controlador, a no ser que alguno especifique lo contratio
public class UsersController : BaseApiController
{
    private readonly DataContext _context;

    //constructor
    public UsersController(DataContext context)
    {
        _context = context;
    }

    [AllowAnonymous]
    [HttpGet]   //al hacer un http get se hace el siguiente método: GetUser()
    // public  ActionResult<IEnumerable<AppUser>> GetUsers() => MÉTODO SÍNCRONO
    public async Task<IEnumerable<AppUser>> GetUsers() //MÉTODO ASÍNCRONO (no queremos bloquear la app)
    {
        var users = await _context.Users.ToListAsync();    //se hace una lista con los users de la tabla

        return users;
    }

    //[Authorize]   si se especifica al principio, no hace falta aquí
    [HttpGet("{id}")]   //api/users/2
    public async Task<AppUser> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        return user;
    }

}
