"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "@/components/Checkout/AddressForm";
import CartSummary from "@/components/Checkout/CartSummary";
import PaymentMethod from "@/components/Checkout/Paymentmethod";
import SubmitBar from "@/components/Checkout/SubmitBar";
import CartInitializer from "@/components/CartInitializer";
import { RootState } from "@/redux/store";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [user, setUser] = useState({ id: "", name: "", phone: "", email: "" });
  const [address, setAddress] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        id: parsed.id,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
      });
    }
  }, []);

  return (
    <section className="container lg:px-16 md:px-8 px-4">
      <CartInitializer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2  p-6 rounded shadow">
          <AddressForm user={user} onChange={setAddress} />
        </div>
        <div className=" p-6 rounded shadow order-2 md:order-1">
          <CartSummary />
          <br />
          <PaymentMethod selected={paymentMethod} onChange={setPaymentMethod} />
          <SubmitBar
            user={user}
            address={address}
            paymentMethod={paymentMethod}
            cartItems={cartItems}
          />
        </div>
      </div>
    </section>
  );
}
