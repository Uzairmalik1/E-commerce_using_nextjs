import prisma from '@/utils/connection'
import Flashsales from "@/components/FlashSales";
import React from 'react'
import { getSession } from '@/utils/actions';

const WishlistPage = async () => {
    const session = await getSession();
    const [wishlist, popularProducts] = await prisma?.$transaction([
        prisma.Favorite.findMany({
          where: {userId: session?.user?.id},
            include: { product: true }
        }),
        prisma.Product.findMany({ take:6, skip: 0, orderBy: { views: "desc" } }),
      ]);

  return (
    <div className='px-[10%]'>
        <Flashsales
          title="Wishlist's"
          heading="Your all favorite products"
          products={wishlist}
        />
        <Flashsales title="Popular products" heading="Most Popular Products" products={popularProducts} />
    </div>
  )
}

export default WishlistPage