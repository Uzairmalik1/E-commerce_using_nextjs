import AdminCategories from '@/components/AdminCategories';
import prisma from '@/utils/connection';
import React from 'react'

const Categories = async () => {
    const query = {
        take: 10,
        skip: 0,
    };
    const CatList = await prisma.Category.findMany(query);

  return (
    <div className='w-full flex flex-col min-h-screen mx-2 md:mx-12'>
        <AdminCategories CatList={CatList} />
    </div>
  )
}

export default Categories