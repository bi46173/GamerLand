namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price { get; set; } // Stripe uses this,for future implementation,also SQLite doesn't recognize decimals
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
    
    }
}