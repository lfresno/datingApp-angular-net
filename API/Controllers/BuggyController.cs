

using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //error handlieng (http)
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context) //constructor
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);    //no lo va a encontrar

            if (thing == null) return NotFound();

            return thing;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            //NO QUEREMOS REPETIR ESTA ESTRUCTURA CADA VEZ QUE UN MÉTODO PUEDA GENERAR UNA EXCEPCIÓN: vamos a hacerlo
            //en el middleware

            // try
            // {
            //     var thing = _context.Users.Find(-1);    //no lo va a encontrar
            //     var thingToReturn = thing.ToString();

            //     return thingToReturn;
            // }
            // catch (Exception ex)
            // {
            //     return StatusCode(500, "Computer says no!");
            // }

            var thing = _context.Users.Find(-1);    //no lo va a encontrar
            var thingToReturn = thing.ToString();

             return thingToReturn;

        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this was not a good request");
        }
    }
}