"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageList from "./ImageList";

const fetchOrderDetails = async () => {
  const response = await fetch("/api/userOrders");
  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }
  return response.json();
};

const OrderDetailsForUser = ({ children }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const data = await fetchOrderDetails();
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrderDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupedOrders = orderData.reduce((acc, item) => {
    const orderTime = new Date(item.createdAt).toLocaleString();
    if (!acc[orderTime]) {
      acc[orderTime] = [];
    }
    acc[orderTime].push(item);
    return acc;
  }, {});

  return (
    <Dialog className="h-screen mt-6">
      <DialogTrigger asChild>
        <Button variant="outline" >{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[80%] mt-5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            Your ordered products.
          </DialogDescription>
        </DialogHeader>
        {Object.entries(groupedOrders).map(([orderTime, items], index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold mb-2">{orderTime}</h2>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 mb-4"
              >
                <ImageList images={item?.product?.images} />
                <div className="p-2 flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <p className="font-bold capitalize">{item?.product?.name}</p>
                    <p className="text-red-600">
                      <span className="text-black">Rs-</span>
                      ${item?.product?.price}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Quantity </p>
                    <p className="text-gray-500">{item.quantity}</p>
                  </div>
                  <p>{item?.product?.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsForUser;
