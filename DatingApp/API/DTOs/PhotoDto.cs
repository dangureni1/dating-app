using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class PhotoDto 
    {
        public int Id { get; set; }       
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}