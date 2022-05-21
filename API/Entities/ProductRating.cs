using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProductRating
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }

        public string User { get; set; }
        public DateTime RatingDate { get; set; } = DateTime.Now;
    }
}