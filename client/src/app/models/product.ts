export interface Product {
  id: number;
  name: string;
  information1: string;
  information2: string;
  information3: string;
  information4: string;
  price: number;
  pictureUrl: string;
  type: string;
  quantityInStock: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  pageNumber: number;
  pageSize: number;
}
