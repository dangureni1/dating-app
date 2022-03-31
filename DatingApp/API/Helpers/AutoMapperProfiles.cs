using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser,MemberDto>()  //AppUser => MemberDto
            .ForMember(
                dest =>dest.PhotoUrl, 
                opt => 
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                }                       
            )
            .ForMember(
                dest => dest.Age,
                opt => {
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                }
            );
            CreateMap<Photo,PhotoDto>(); //Photo => PhotoDto

            CreateMap<MemberUpdateDTO, AppUser>();
         
            CreateMap<RegisterDto, AppUser>()
            .ForMember(
                dest => dest.UserName,
                opt => {
                    opt.MapFrom(src => src.Username.ToLower());
                }
            );

            CreateMap<UserLike, LikeDto>()
             .ForMember(
                dest =>dest.Id, 
                opt => 
                {
                    opt.MapFrom(src => src.SourceUser.Id);
                }                       
            )
            .ForMember(
                dest => dest.Username,
                opt => {
                    opt.MapFrom(src => src.SourceUser.UserName);
                }
            );

              CreateMap<Message, MessageDto>()
             .ForMember(
                dest =>dest.SenderPhotoUrl, 
                opt => 
                {
                    opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url);
                }                       
            )
            .ForMember(
                 dest =>dest.RecipientPhotoUrl, 
                opt => 
                {
                    opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url);
                }    
            );
        }
    }
}