using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._context = context;
        }

        [HttpPost("register")] //api/account/register
        public async Task<ActionResult<UserDot>> Register(RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            if (await userExists(registerDto.UserName)) return BadRequest("Username already exists");

            var user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDot{
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")] //api/account/login
        public async Task<ActionResult<UserDot>> Login(LoginDto loginDto)
        {
            var user = await this._context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
            }

            return new UserDot{
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> userExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}