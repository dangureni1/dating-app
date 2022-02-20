using System.Security.Claims;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using API.Extensions;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

       [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO) {
            var username = User.GetUsername(); //nameid
            var user = await _userRepository.GetUserByUserNameAsync(username);

            _mapper.Map(memberUpdateDTO, user);

            _userRepository.Update(user);

            if(await _userRepository.SaveAllAsync()){
                return NoContent();
            }

            return BadRequest("Failed to update user");


        }

        [HttpGet] // route: api/users
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() 
        {
            //var users = await _userRepository.GetUsersAsync();
            //var usersToreturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            var usersToreturn = await _userRepository.GetMembersAsync();
            return Ok(usersToreturn);
        }

        [HttpGet("{username}", Name = "Getuser")] //:username route parameter: api/users/lisa
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //ar user = await _userRepository.GetUserByUserNameAsync(username);
            //var usersToreturn = _mapper.Map<MemberDto>(user);
            var usersToreturn = await _userRepository.GetMemberAsync(username);
            return Ok(usersToreturn);
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var username = User.GetUsername();
            var user = await _userRepository.GetUserByUserNameAsync(username);

            var result = await _photoService.UploadPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            photo.IsMain = user.Photos.Count == 0;

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
                // return _mapper.Map<PhotoDto>(photo);
            }
            return BadRequest("Problem adding Photos");
        }
    }

}