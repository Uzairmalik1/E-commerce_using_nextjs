"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { createOrder } from "@/services/orders";

const AddAddress = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => state.auth);
  const submit = async (formData) => {
    console.log(formData, "cart");
    const response = await createOrder(formData, cart);
    if (response.error) {
      console.log("error from res: ", response.error)
      toast({ title: response.error });
    } else {
      router.push(response.result);
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="bg-indigo-500 font-semibold hover:bg-indigo-600 text-sm text-white uppercase w-full p-2 rounded-md">Checkout</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Address</SheetTitle>
          <SheetDescription>
            <form action={submit}>
              <FormInput
                id="address"
                label="Address"
                placeholder="Enter address"
                type="text"
                className="h-10"
              />
              <FormInput
                id="state"
                label="State"
                placeholder="Enter state"
                type="text"
                className="h-10"
              />
              <FormInput
                id="city"
                label="City"
                placeholder="Enter the city"
                type="text"
                className="h-10"
              />
              <FormInput
                id="country"
                label="Country"
                placeholder="Enter country"
                type="text"
                className="h-10"
              />
              <FormInput
                id="pinCode"
                label="Pin code"
                placeholder="Enter the pin code"
                type="number"
                className="h-10"
              />
              <FormInput
                id="phoneNo"
                label="Phone number"
                placeholder="Enter Phone number"
                type="number"
                className="h-10"
              />
              <FormSubmit className="w-full mt-4 bg-red-500 text-white h-12 hover:bg-red-400">
                Create
              </FormSubmit>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddress;
