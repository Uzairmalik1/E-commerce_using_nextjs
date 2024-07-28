"use client"
import { toast } from '@/components/ui/use-toast';
import { confirmOrder } from '@/services/orders';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clearCart } from '@/redux/slice/cartSlice';

const Success = ({params}) => {
    const { orderId } = params;
    const router = useRouter();
    const dispatch = useDispatch();

    const updateOrder = async () => {
        if(params.orderId){
            const update = await confirmOrder(orderId);

            if(update.error){
                toast({title: update.error});
            } else {
                dispatch(clearCart());
                router.push("/");
            }
        }
    }

    useEffect(()=>{
        updateOrder();
    }, [])
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
            <>
             <img src="https://i.gifer.com/7efs.gif" className='mx-auto' alt="" />
             <p className='text-green-500 text-center mt-4'>Your Payment is successful. Thank you for your purchase.</p>
            </>
        </div>
    </div>
  )
}

export default Success