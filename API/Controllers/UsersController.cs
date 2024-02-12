using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
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
    private readonly IPhotoService _photoService;

    //constructor
    public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _photoService = photoService;
    }

    [AllowAnonymous]
    [HttpGet]   //al hacer un http get se hace el siguiente método: GetUser(). SI TODO SALE BN SE DEVUELVE Ok();
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

    [HttpPut]   //se todo ha salido bn, debe devolver NoContent();
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.GetUsername();  //se ha definido esta operación en ClaimsPrincipalExtension
        var user = await _userRepository.GetUserByUsernameAsync(username);

        if(user == null) return NotFound();

        //se actualizan y sobreescriben todas las propiedades del usuario con las del memberUpdatedDto
        _mapper.Map(memberUpdateDto, user);

        //este return significa: todo bien pero no tengo nada más que mandar
        if(await _userRepository.SaveAllAsync()) return NoContent();

        //si no se han hecho cambios, tendremos esta respuesta
        return BadRequest("Failed to update user");

    }

    //le añadimos una ruta porque ya tenemos otro httpPost (para diferenciarlo)
    [HttpPost("add-photo")] //si todo sale bien, hay que devolver 201, Created
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        if(user == null) return NotFound();

        var result = await _photoService.AddPhotoAsync(file);

        if(result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if(user.Photos.Count == 0) photo.IsMain = true; //si es la priemra foto que se sube, se pone como perfil

        user.Photos.Add(photo);

        if(await _userRepository.SaveAllAsync())
        {
            //return _mapper.Map<PhotoDto>(photo);  //Esto funciona, pero devuelve 200 OK y queremos devolver 201 Created 
                                                    // junto con la posición del lugar donde se ha guardado el recurso
            
            //el segundo parámetro se debe pasar como un objeto
            return CreatedAtAction(nameof(GetUser), new {username = user.UserName}, _mapper.Map<PhotoDto>(photo));
            //esto devuelve 201 created y dónde se ha creado el recurso (lo que tiene que devolver HttpPost por convenio)
        }

        return BadRequest("Problem adding photo");
    }

}
