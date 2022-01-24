using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using API.Entities;

namespace API.Controllers

{
    public class BuggyController: BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            this._context = context;
        }

        //401 unAuthorize
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() //api/buggy/auth
        {
            return "Secret String";
        }

        // 404 Not Found
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound() //api/buggy/not-found
        {
           var thing = _context.Users.Find(-1);
           if(thing == null)
           {
               return NotFound();
           }
           return Ok();
        }

        //500 server error
         [HttpGet("server-error")]
        public ActionResult<string> GetServerError() //api/buggy/server-error
        {
             var thing = _context.Users.Find(-1);
             var thingToString = thing.ToString(); //NullRefrenceException
            return thingToString;
        }


         [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() //api/buggy/bad-request
        {         
           return  BadRequest("this was not a good request");
        }

    }
}