using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class UpdateProductDto
    {

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Information1 { get; set; }
        [Required]
        public string Information2 { get; set; }
        [Required]
        public string Information3 { get; set; }
        [Required]
        public string Information4 { get; set; }
        [Required]
        [Range(100,Double.PositiveInfinity)]
        public long Price { get; set; }
        public IFormFile File { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        [Range(0,200)]
        public int QuantityInStock { get; set; }
    }
}