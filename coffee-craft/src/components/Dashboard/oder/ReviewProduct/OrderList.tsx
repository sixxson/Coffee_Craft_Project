// components/OrderList.tsx
import React, { useState } from "react";
import { Order } from "@/types/product";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
  onReviewClick: (orderItemId: string) => void;
}

export default function OrderList({ orders, onReviewClick }:OrderListProps) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-4 cursor-pointer border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">
              Mã đơn hàng: <span className="font-medium">{order.id}</span>
            </div>
            <div className="text-sm text-gray-600">
              Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>

          {order.orderItems.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              onReviewClick={onReviewClick}
            />
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 mt-4 border-t">
            <div className="text-gray-900 font-medium text-lg mb-2 sm:mb-0">
              Tổng cộng: {Number(order.finalTotal).toLocaleString()}đ
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

