"use server";

import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const addUpdatePost = async (formData, images, categoryId, id) => {
    const session = await getSession();
    if(!session.isLoggedIn){
        return { error: "User not found"}
    }

    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseInt(formData.get("price"));

    console.log("formdata: ", formData)
    if(!name || !description || !price || !images.length || !categoryId){
        return { error: "please full all fields"}
    }

    const imageList = images.length && !id ? images?.map(({url}) => url) : images;
    let product;
    try {
        if(id){
            product = await prisma.Product.update({
                where: {id},
                data: { name, description, price, images: imageList, categoryId }
            })
        } else {
            product = await prisma.Product.create({
                data: { name, description, price, images: imageList, categoryId }
            })
        }


        if(!product){
            return { error: "the product not created"}
        }
    } catch (error) {
        return { error: "product not created"}
    }

    revalidatePath("/dashboard/products")
    return { result: product}
}

// update product view
export const updateProductViews = async (id)=>{
    if(!id){
        return { error: "product not found"}
    }

    let product;
    try {
        product = await prisma.Product.update({
            where: { id },
            data: { views: { increment: 1}},
        })
    } catch (error) {
        return { error: "product views not found"}
    }

    redirect(`/products/${product?.id}`)
}

// favorite product
export const addFavorite = async (productId) => {
    const session = await getSession();
    if(!session.isLoggedIn){
        return { error: "User not found"}
    }

    let fav;
    try {
        fav = await prisma.Favorite.findMany({
            where: {userId: session.user.id, productId}
        });

        if(!fav.length){
            fav = await prisma.Favorite.create({
                data: {userId: session.user.id, productId}
            });
            revalidatePath("/wishlist");
            return { result: fav };
        } else {
            return { error: "Already added in favorite"}
        }
    } catch (error) {
        
    }
}