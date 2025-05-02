// src/types/Product.ts
export interface Product {
  id: string;
  sku: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  discountPrice: string;
  categoryId: string;
  brandId: string;
  stock: number;
  active: boolean;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  tags: Tag[];
  reviews: Review[];
  variants: ProductVariant[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  order: number;
  isThumbnail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku?: string;
  price: string;
  discountPrice?: number;
  stock: number;
  name: string;
  color?: string;
  weight?: string;
  material?: string;
  createdAt: Date;
  updatedAt: Date;

  product: Product; // Kiểu Product mà bạn cần định nghĩa trước
  orderItems: OrderItem[]; // Kiểu OrderItem mà bạn cần định nghĩa trước
  review: Review[]; // Kiểu Review mà bạn cần định nghĩa trước
}

export interface CartItem {
  id: string;
  productId: string;
  product: any; // Thông tin sản phẩm
  images: ProductImage[];
  quantity: number;
  discountPrice: string;
  price: number;
  variant?: ProductVariant | null;
}

// 🛒 Cập nhật `CartState` để dùng `CartItem` thay vì `OrderItem`
export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtOrder: number;
  subTotal: number;
  discountAmount: number;
  product: Product; // 👈 Thêm dòng này để fix lỗi
  review?: Review;
  productVariant?: ProductVariant | null;
}

export interface Order {
  id: string;
  userId: string;
  total: string; // Có thể cân nhắc chuyển thành number nếu backend trả số
  shippingFee: string;
  discountAmount: string;
  finalTotal: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  shippingAddress: {
    receiverName: string;
    receiverPhone: string;
    address: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  voucher:{
    code:string
  }
  note?: string;
}
export interface User {
  id: string;
  name: string;
  imgUrl: string;
}

export interface Review {
  id: string;
  rating: number; // 1-5
  comment?: string;
  orderItemId: string;
  // Nếu bạn vẫn muốn có relation đến OrderItem, giữ nguyên:
  orderItem: OrderItem;

  userId: string;
  user: User; // now includes { id, name, imgUrl }

  productId: string;
  product: Product; // giữ nếu bạn include product trong query

  productVariantId?: string;
  productVariant?: ProductVariant;

  createdAt: string; // JSON trả về là ISO string
  updatedAt: string;
}

export type UserProfile = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  gender?: string;
  imgUrl?: string;
};
