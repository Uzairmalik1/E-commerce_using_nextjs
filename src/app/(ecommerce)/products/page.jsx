import React from 'react'
import Flashsales from "@/components/FlashSales";
import prisma from '@/utils/connection';

const Products = async ({ searchParams}) => {
    let result;
    if(searchParams.cat){
        result = await prisma.Product.findMany({
            where: {categoryId: searchParams.cat}
        })
    } else {
        result = await prisma.Product.findMany();
    }
  return (
    <div className='px-[10%]'>
        <Flashsales
          title="Products By Category"
          heading="Explore Our Products"
          products={result}
        />
    </div>
  )
}

export default Products