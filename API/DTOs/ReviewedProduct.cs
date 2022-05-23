using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ReviewedProduct
    {
    
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Information1 { get; set; }
        
        public string Information2 { get; set; }
        
        public string Information3 { get; set; }
        
        public string Information4 { get; set; }
        
        public long Price { get; set; }
                
        public string Type { get; set; }
        public string PictureUrl { get; set; }

        
        public int QuantityInStock { get; set; }

        public int ReviewsNumber { get; set; }

        public double ReviewsAverage { get; set; }
    }
    
}
