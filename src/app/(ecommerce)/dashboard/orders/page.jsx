import OrderList from '@/components/OrderList'
import { getSession } from '@/utils/actions';
import prisma from '@/utils/connection';
import React from 'react'

const Orders = async () => {
    const session = await getSession();
    const orders = await prisma?.Order?.findMany({
      where: { isPaid: true},
      take: 10,
      skip: 0,
      include: { OrderItem: { include: {product: true} }, addressInfo: true },
    });
    console.log("data form orders: +>", orders)
    console.log("session is: ", session);
  return <OrderList orders={orders}/>;
}

export default Orders