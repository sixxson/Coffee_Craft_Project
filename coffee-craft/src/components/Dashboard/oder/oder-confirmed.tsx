"use client";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Order } from "@/types/product";
import OrderDetailPopup from "./oder-detail";

export default function OrderConfirmed() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/myorders`, {
        method: "GET",
        credentials: "include", // Gửi cookie nếu đang dùng session auth
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu đơn hàng.");
      }

      const result = await response.json();

      // Lọc các đơn hàng có trạng thái "CONFIRMED"
      const confirmedOrders = result.filter(
        (order: Order) => order.status === "CONFIRMED"
      );

      setOrders(confirmedOrders);
    } catch (err: any) {
      console.error("Lỗi khi tải đơn hàng:", err);
      setError(err.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Không thể hủy đơn hàng.");
      }

      toast.success("Hủy đơn hàng thành công");
      fetchOrders();
    } catch (err: any) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      toast.error(err.message || "Đã xảy ra lỗi khi hủy đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">
          Không có đơn hàng nào đã xác nhận.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white p-4 cursor-pointer border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-600">
                  Mã đơn hàng: <span className="font-medium">{order.id}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              {order.orderItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-wrap gap-4 py-3 border-t first:border-t-0"
                >
                  {item.product?.images?.[0]?.url ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                      Không có ảnh
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.product?.name || "Sản phẩm không xác định"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Mã SP: {item.product?.sku || "N/A"}
                    </p>
                    {item.productVariant?.name && (
                      <p className="text-sm text-gray-600">
                        Loại sản phẩm: {item.productVariant.name}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {Number(item.priceAtOrder).toLocaleString()}đ
                  </p>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 mt-4 border-t">
                <div className="text-gray-900 font-medium text-lg">
                  Tổng cộng: {Number(order.finalTotal).toLocaleString()}đ
                </div>
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="mt-3 sm:mt-0 px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  Hủy đơn hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Hiển thị popup chi tiết */}
      {selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
