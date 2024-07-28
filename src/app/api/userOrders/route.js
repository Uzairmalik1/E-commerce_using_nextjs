import { NextResponse } from 'next/server';
import prisma from '@/utils/connection';
import { getSession } from '@/utils/actions';

export async function GET() {
  try {
    const session = await getSession();
    const userID = session.user.id;


    const orderItems = await prisma.OrderItem.findMany({
      where: { userId: userID },
      include: { product: true },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orderItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
