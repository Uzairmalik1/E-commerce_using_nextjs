"use client"
import FormInput from '@/components/FormInput'
import FormSubmit from '@/components/FormSubmit'
import { toast } from '@/components/ui/use-toast'
import { UploadButton } from '@/lib/uploadthing'
import { login } from '@/utils/actions'
import Link from 'next/link'
import React from 'react'

const Login = () => {

    const onSubmit = async (formData) =>{
        const res = await login(formData)
        if(res.error){
            toast({ title: res.error})
        } else{
            toast({title: res.message})
        }
    }
  return (
    <div className='relative w-full h-screen grid grid-cols-1 lg:grid-cols-2'>
        <div className='relative h-full w-full'>
            <img src="./signup.png" className="absolute inset-0 object-cover w-full h-full" alt="" />
        </div>
        <div className="lg:relative absolute flex items-center justify-center w-full h-full p-8 lg:p-14">
        <div className="w-full max-w-lg bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
            <h1 className='text-2xl font-medium mb-6 text-center'>Log in</h1>
            <form action={onSubmit}>
               
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
                    type="text" 
                    className="h-10 mb-4 lg:border-gray-200 border-gray-700 outline-none bg-inherit" 
                />
              

                 <FormSubmit className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-10">Log In</FormSubmit>

                 <p className='text-base text-gray-700 mt-5 text-center'>
                    Don't have an account? <Link href="/signup" className=' px-2 cursor-pointer text-blue-600'>Register</Link>
                 </p>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login