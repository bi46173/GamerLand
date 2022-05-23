using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(StoreContext context,IMapper mapper,ImageService imageService)
        {
            _mapper = mapper;
            _context = context;
            _imageService = imageService;
        }
        [HttpGet]
       public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);
            return products;
        }
        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new {types});
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
        {

            var product = _mapper.Map<Product>(productDto);
            if(productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if(imageResult.Error != null) 
                    return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});
            
                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }


            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetProduct", new {Id = product.Id},product);

            return BadRequest(new ProblemDetails {Title="Problem adding product"});
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);

            if(product == null) return NotFound();

            _mapper.Map(productDto,product);

            if(productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if(imageResult.Error != null) 
                    return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});
            
                if (!string.IsNullOrEmpty(product.PublicId))
                    await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok(product);

            return BadRequest(new ProblemDetails{Title ="Problem updating product"});
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId)) 
                await _imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        [HttpGet("mostReviewed/{limit}")]
        public async Task<ActionResult<List<ReviewedProduct>>> GetMostReviewed(int limit)
        {
            var ratedProducts = await _context.ProductRatings.Select(p => p.ProductId).Distinct().ToListAsync();
            var items = new List<ReviewedProduct>();
            var itemsToBeTaken = limit - ratedProducts.Count();
            
            if(ratedProducts == null || itemsToBeTaken > 0) 
            {
                var productsToBeReturned = await _context.Products.Where(x => !ratedProducts.Contains(x.Id)).OrderByDescending(p => p.Id).Take(itemsToBeTaken).ToListAsync();
                foreach (var productToBeReturned in productsToBeReturned)
                {
                    var mappedItem = new ReviewedProduct{
                        Id = productToBeReturned.Id,
                        Name = productToBeReturned.Name,
                        Information1 = productToBeReturned.Information1,
                        Information2 = productToBeReturned.Information2,
                        Information3 = productToBeReturned.Information3,
                        Information4 = productToBeReturned.Information4,
                        Price = productToBeReturned.Price,
                        Type = productToBeReturned.Type,
                        QuantityInStock = productToBeReturned.QuantityInStock,
                        PictureUrl = productToBeReturned.PictureUrl,
                        ReviewsNumber = 0,
                        ReviewsAverage = 0,
                    };
                    items.Add(mappedItem);
                }
            }
            
            var reviewedProducts =  await _context.Products.Where(p => ratedProducts.Contains(p.Id)).ToListAsync();

            foreach (var reviewedItem in reviewedProducts)
            {
                var productRatings = _context.ProductRatings.Where(p => p.ProductId == reviewedItem.Id);

                var mappedItem = new ReviewedProduct{
                    Id = reviewedItem.Id,
                    Name = reviewedItem.Name,
                    Information1 = reviewedItem.Information1,
                    Information2 = reviewedItem.Information2,
                    Information3 = reviewedItem.Information3,
                    Information4 = reviewedItem.Information4,
                    Price = reviewedItem.Price,
                    Type = reviewedItem.Type,
                    QuantityInStock = reviewedItem.QuantityInStock,
                    PictureUrl = reviewedItem.PictureUrl,
                    ReviewsNumber = productRatings.Count(),
                    ReviewsAverage = productRatings.Average(p => p.Rating)
                };
                items.Add(mappedItem);
            }

            return items;
        }
    }
}