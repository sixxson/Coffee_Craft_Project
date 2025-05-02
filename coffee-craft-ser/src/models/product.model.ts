import { UploadedFile } from "express-fileupload";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  avgRating: number;
  active: boolean;
  categoryId?: string;
  brandId?: string;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  order?: number;
  isThumbnail: boolean;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brandId: string;
  stock: number;
  active: boolean;
}
