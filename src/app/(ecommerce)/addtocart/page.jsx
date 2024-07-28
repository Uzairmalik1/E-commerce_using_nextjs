"use client";
import AddAddress from "@/components/AddAddress";
import OrderDetailsForUser from "@/components/OrderDetailsForUser";
import { setCart } from "@/redux/slice/cartSlice";
import { getSession } from "@/utils/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = () => {
  const { cart } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    const updateCart = cart.filter((item) => item.product.id !== id);
    dispatch(setCart(updateCart));
  };

  const updateQuantity = (id, qty) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const incrementQuantity = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  const decrementQuantity = (id, qty) => {
    if (qty > 1) {
      updateQuantity(id, qty - 1);
    }
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row shadow-md my-10">
        <div className="w-full lg:w-3/4 bg-white p-4 lg:p-10">
          <div className="flex justify-between border-b pb-4 lg:pb-8 font-semibold text-lg lg:text-2xl">
            <h1>Shopping Cart</h1>
            <h2>{cart?.length} Items</h2>
          </div>

          <div className="overflow-x-auto mt-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left text-xs uppercase font-semibold text-gray-600">
                  <th className="px-4 py-2 w-2/5">Product Details</th>
                  <th className="px-4 py-2 w-1/5">Quantity</th>
                  <th className="px-4 py-2 w-1/5">Price</th>
                  <th className="px-4 py-2 w-1/5">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 flex w-52 items-center">
                      <img
                        className="h-24 w-20 object-cover rounded-sm"
                        src={item?.product?.images?.[0]}
                        alt={item?.product?.name}
                      />
                      <div className="ml-4">
                        <span className="font-bold text-sm block">{item?.product.name}</span>
                        <span className="text-red-500 text-xs block">Apple</span>
                        <button
                          className="text-red-500 text-xs font-semibold hover:text-red-600"
                          onClick={() => removeItem(item.product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <button
                          className="bg-gray-200 text-gray-600 text-xl px-2 py-1 rounded-l"
                          onClick={() => decrementQuantity(item.product.id, item.quantity)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="border text-center w-10 py-1"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="bg-gray-200 text-gray-600 text-xl px-2 py-1 rounded-r"
                          onClick={() => incrementQuantity(item.product.id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-semibold">${item.product.price.toFixed(2)}</td>
                    <td className="px-4 py-2 font-semibold">${(item.product.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 justify-center border-t items-center mt-7 pt-5">
            <p>View Your ordered products.</p>
          <OrderDetailsForUser >
            View
          </OrderDetailsForUser>
          </div>
        </div>

        <div className="w-full lg:w-1/4 bg-gray-100 p-4 lg:p-10">
          <h1 className="font-semibold text-lg lg:text-2xl border-b pb-4 lg:pb-8">Order Summary</h1>
          <div className="flex justify-between mt-4 lg:mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cart?.length}</span>
            <span className="font-semibold text-sm">${totalPrice().toFixed(2)}</span>
          </div>
          <div>
            <span className="font-medium inline-block mb-3 text-sm uppercase">Shipping</span>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option value="Standard shipping - $10.00">Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total Cost</span>
            <span>${(totalPrice() + 10).toFixed(2)}</span>
          </div>
          {/* Checkout button */}
          <AddAddress />
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
