using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateRatingDto
    {
        public int ProductId { get; set; }
        public string Comment { get; set; }

        public double Rating { get; set; }

        public string User { get; set; }
    }
}