using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName {get; set;}
        
        [Required]
        [StringLength(8, MinimumLength =4, ErrorMessage ="You must specify paswword between 4 and 8 chars")]
         public string Password {get; set;}
    }
}