"use client";
import { setCart } from "@/redux/slice/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { getSession } from "@/utils/actions";

const AddToCart = ({ children, product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state) => state.auth);

  const submit = async () => {
    const session = await getSession()
    console.log("session data: ", session)
    if (!session.isLoggedIn) {
      // Redirect to login page if the user is not logged in
      router.push("/login");
      return;
    }

    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      dispatch(setCart(updatedCart));
      toast({ title: "item already exists" });
    } else {
      dispatch(setCart([...cart, { product, quantity: 1 }]));
      toast({ title: "add to cart successfully" });
    }
  };

  return (
    <div className="w-full" onClick={submit}>
      {children}
    </div>
  );
};

export default AddToCart;
