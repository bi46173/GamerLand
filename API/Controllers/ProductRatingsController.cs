using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductRatingsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductRatingsController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<List<ProductRating>>> GetRatings(int productId)
        {
            return await _context.ProductRatings.Where(r => r.ProductId == productId)
                                                .ToListAsync();
                                                
        }
        [Authorize]
        [HttpPost]
         public async Task<ActionResult> CreateRating(CreateRatingDto rating)
         {
             var product = await _context.Products.FindAsync(rating.ProductId);
             if(product == null) return BadRequest();
             var productRating = new ProductRating{
                 ProductId = rating.ProductId,
                 Comment = rating.Comment,
                 Rating = rating.Rating,
                 User = rating.User
             };

             _context.Add(productRating);
             var result = await _context.SaveChangesAsync() > 0;
             if(result) return Ok();
            
            return BadRequest(new ProblemDetails{Title="Problem posting rating"});
         }

    }
}