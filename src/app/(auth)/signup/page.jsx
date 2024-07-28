"use client";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import { register } from "@/utils/actions";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [image, setImage] = useState("");

  const onSubmit = async (formData) => {
    const res = await register(formData, image);

    if (res?.error) {
      toast({ title: res.error });
    } else {
      toast({ title: res.message });
    }
  };

  return (
    <div className="relative w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-full w-full">
        <img
          src="./signup.png"
          alt="Signup Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
      <div className="lg:relative absolute flex items-center justify-center w-full h-full p-8 lg:p-14">
        <div className="w-full max-w-lg bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-medium mb-6 text-center">
            Create an Account
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(new FormData(e.target));
            }}
          >
            <FormInput
              id="name"
              label="Full Name"
              placeholder="Enter Your Name"
              type="text"
              className="h-10 mb-4 lg:border-gray-200 border-gray-700 outline-none bg-inherit"
            />
            <FormInput
              id="email"
              label="Email"
              placeholder="Enter Your Email"
              type="email"
              className="h-10 mb-4 lg:border-gray-200 border-gray-700 outline-none bg-inherit"
            />
            <FormInput
              id="password"
              label="Password"
              placeholder="Enter the Password"
              type="password"
              className="h-10 mb-6 lg:border-gray-200 border-gray-700 outline-none bg-inherit"
            />
            <UploadButton
              endpoint="imageUploader"
              appearance={{
                button:
                  "ut-uploading:cursor-not-allowed bg-slate-600 w-full text-xl after:bg-orange-400 max-w-[700px]",
                allowedContent: "hidden",
              }}
              onClientUploadComplete={(res) => {
                setImage(res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR ${error.message}`);
              }}
            />
            <FormSubmit className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-6">
              Create
            </FormSubmit>

            <p className="text-base text-gray-700 mt-5 text-center">
              If you have already account?
              <Link href="/login" className="px-2 cursor-pointer text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
