using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if(context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Strix G35DX",
                    Information1 = "AMD Ryzen 7 5800X",
					Information2 = "32 GB DDR4",
					Information3 = "1 TB SSD",
					Information4 = "NVIDIA GeForce RTX 3070",
                    Price = 2149,
                    PictureUrl = "/images/products/0.jpg",
                    Type = "Desktop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "HAL3000 Alfa Gamer Pro",
                    Information1 = "AMD Ryzen 5 5600X",
					Information2 = "16 GB DDR4",
					Information3 = "1 TB SSD",
					Information4 = "AMD RADEON RX 6700 XT",
                    Price = 1759,
                    PictureUrl = "/images/products/1.jpg",
                    Type = "Desktop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "Pavilion Gaming TG01-1001nc",
                    Information1 = "Intel Core i5-10400F",
					Information2 = "16 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce RTX 3060",
                    Price = 1099,
                    PictureUrl = "/images/products/2.jpg",
                    Type = "Desktop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "Game X G500",
                    Information1 = "AMD Ryzen 5 5600X",
					Information2 = "16 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce RTX 3060",
                    Price = 1299,
                    PictureUrl = "/images/products/3.jpg",
                    Type = "Desktop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "HAL3000 Master Gamer",
                    Information1 = "Intel Core i5-11400F",
					Information2 = "16 GB DDR4",
					Information3 = "1 TB SSD",
					Information4 = "AMD Radeon RX 6600 XT",
                    Price = 1406,
                    PictureUrl = "/images/products/4.jpg",
                    Type = "Desktop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "GIGABYTE AORUS Model X",
                    Information1 = "Intel Core i9-11900K",
					Information2 = "16 GB DDR4",
					Information3 = "1 TB SSD",
					Information4 = "NVIDIA GeForce RTX 3080",
                    Price = 3029,
                    PictureUrl = "/images/products/5.jpg",
                    Type = "Desktop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "ROG Strix SCAR 15",
                    Information1 = "AMD Ryzen 9 5900HX",
					Information2 = "16 GB DDR4",
					Information3 = "1 TB SSD",
					Information4 = "NVIDIA GeForce RTX 3080",
                    Price = 2139,
                    PictureUrl = "/images/products/l0.jpg",
                    Type = "Laptop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "Nitro 5",
                    Information1 = "AMD Ryzen 7 5800H",
					Information2 = "8 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce RTX 3060",
                    Price = 1039,
                    PictureUrl = "/images/products/l1.jpg",
                    Type = "Laptop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "Legion 5 15ACH6",
                    Information1 = "AMD Ryzen 5 5600H",
					Information2 = "16 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce RTX 3050 Ti",
                    Price = 1039,
                    PictureUrl = "/images/products/l2.jpg",
                    Type = "Laptop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "IdeaPad Gaming 3 15ACH6",
                    Information1 = "AMD Ryzen 5 5600H",
					Information2 = "8 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce GTX 1650",
                    Price = 659,
                    PictureUrl = "/images/products/l3.jpg",
                    Type = "Laptop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "Pavilion Gaming 15-ec2000nc",
                    Information1 = "AMD Ryzen 5 5600H",
					Information2 = "8 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce RTX 3050",
                    Price = 869,
                    PictureUrl = "/images/products/l4.jpg",
                    Type = "Laptop",
                    QuantityInStock = 10
                },
				                new Product
                {
                    Name = "Alienware m15 R4",
                    Information1 = "Intel Core I7-10870H",
					Information2 = "32 GB DDR4",
					Information3 = "512 GB SSD",
					Information4 = "NVIDIA GeForce RTX 3070",
                    Price = 2799,
                    PictureUrl = "/images/products/l5.jpg",
                    Type = "Laptop",
                    QuantityInStock = 10
                },
               
            };
            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}