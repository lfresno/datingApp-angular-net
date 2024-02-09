using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize] //se usa en general para todos los endpoints de este controlador, a no ser que alguno especifique lo contratio
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    //constructor
    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpGet]   //al hacer un http get se hace el siguiente método: GetUser()
    // public  ActionResult<IEnumerable<AppUser>> GetUsers() => MÉTODO SÍNCRONO
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() //MÉTODO ASÍNCRONO (no queremos bloquear la app)
    {
        // var users = await _userRepository.GetUsersAsync();  //se hace una lista con los users de la tabla

        // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

        // return Ok(usersToReturn);   //usamos la función Ok para que sea un action result

        var users = await _userRepository.GetMembersAsync();

        return Ok(users);
    }

    //[Authorize]   si se especifica al principio, no hace falta aquí
    [HttpGet("{username}")]   //api/users/2
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        // var user = await _userRepository.GetUserByUsernameAsync(username);

        // var userToReturn = _mapper.Map<MemberDto>(user);

        // return Ok(userToReturn);

        //usamos esto para que la query sea más eficiente
        return await _userRepository.GetMemberAsync(username);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userRepository.GetUserByUsernameAsync(username);

        if(user == null) return NotFound();

        //se actualizan y sobreescriben todas las propiedades del usuario con las del memberUpdatedDto
        _mapper.Map(memberUpdateDto, user);

        //este return significa: todo bien pero no tengo nada más que mandar
        if(await _userRepository.SaveAllAsync()) return NoContent();

        //si no se han hecho cambios, tendremos esta respuesta
        return BadRequest("Failed to update user");

    }

}
