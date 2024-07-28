"use server"

import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs'

// get user
export const getUser = async ()=>{
    const session = await getSession();
    if(!session.isLoggedIn){
        return { error: "User not found"}
    }

    let user;
    try {
        user = await prisma.User.findUnique({
            where: { id: session.user.id }
        });

        if(!user){
            return { error: "User not found"}
        }
    } catch (error) {
        return { error: "User not found"}
    }

    revalidatePath("/dashboard/settings");
    return { result: user};
}

//updateProfile
export const updateProfile = async (formData) => {

    const session = await getSession();
    if(!session.isLoggedIn){
        return { error: "User not found"}
    }

    const name = formData.get("name");
    const email = formData.get("email");

    if(!name || !email){
        return { error: "Please fill all fields"}
    }
    let user;
    try {
        user = await prisma.User.update({
            where: { id: session.user.id },
            data: {
                name,
                email
            }
        });

        if(!user){
            return {error: `User not updated`}
        }
    } catch (error) {
            return {error: `User not updated`}
    }

    revalidatePath("/dashboard/settings");
    return { result: user};
}


// change password
export const updatePassword = async (formData) => {

    const session = await getSession();
    if(!session.isLoggedIn){
        return { error: "User not found"}
    }

    const oldPassword = formData.get("password");
    const newPassword = formData.get("newpassword");

    if(!oldPassword || !newPassword){
        return { error: "Please fill all fields"}
    }
    let user;
    try {
        if(oldPassword.length && newPassword.length < 8){
            return { error: "Password must be min 8 char long"}
        }

        const isMatch = await bcrypt.compare(oldPassword, session.user.password);
        if(!isMatch){
            return { error: "Password not matched"}
        }

        const password = await bcrypt.hash(newPassword, 10)

        user = await prisma.User?.update({
            where: {id: session.user.id },
            data: {
                password
            }
        });

        if(!user){
            return {error: `Password not updated`}
        }

        session.user = user;
        session.isLoggedIn = true;
        await session.save();
    } catch (error) {
            return {error: `User not updated`}
    }

    revalidatePath("/dashboard/settings");
    return { result: user};
}