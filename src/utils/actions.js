"use server"
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { defaultSession, sessionOptions } from './lib'
import bcrypt from 'bcryptjs'
import prisma from './connection'
import sendEmail from '@/services/sendEmail'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


function generateToken(length){
    let result = ""
    const charactorLength = process.env.NEXT_PUBLIC_CHARACTORS.length;


    for(let i=0; i<length; i++){
        result += process.env.NEXT_PUBLIC_CHARACTORS.charAt(Math.floor(Math.random()* charactorLength))
    }

    return result;
}
let token = generateToken(32);
export const getSession = async() =>{
    const session = await getIronSession(cookies(), sessionOptions);
    if(!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
}


let hashedPassword;
export const register = async (FormData, image) => {
    const name = FormData.get("name");
    const email = FormData.get("email");
    const password = FormData.get("password");

    if(password.length < 8){
        return { error: "password must be min 8 char long"}
    }

    hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma?.user?.findUnique({
        where: {email},
    })

    if(user && user.emailVerified){
        return {error: "user already exist!"}
    }

     
    // const defaultRole = await prisma.role.create({
    //   data: {
    //     role: "USER", // Default role value
    //     description: "Default user role",
    //   },
    // });

    const newUser = await prisma?.user.upsert({
        where: {email},
        create: {
            name, 
            email, 
            password: hashedPassword, 
            token, 
            image,
            // role: {
            //     connect: { id: defaultRole.id }
            // }
        },
        update: { token }
    });

    if(newUser){
        await sendEmail(
            newUser.email,
            "Email Verification",
            `<p>Welcome to Ecommerce, This is your email verification token. Click here to verify your email! http://localhost:3000/verify/${token}</p>`
        )
        return { message: "Verify Your Email"}
    } else {
        return { error: "Something went wrong"}
    }
}


// Verification Email
export const emailVerify = async (getToken) =>{
    if(getToken){
        const getUser = await prisma.user.findUnique({
            where: {
                token: getToken,
            }
        });
        if(getUser){
            const user = await prisma.user.update({
                where: {token: getToken },
                data: { emailVerified: true},
            });
            if(user){
                redirect("/login");
            }else{
                return  {
                    error: "Token expired"
                }
            }
        }
    }
}


// Login setting
export const login = async (FormData) => {
    const session = await getSession();
    const email = FormData.get("email");
    const password = FormData.get("password");

    const user = await prisma.user.findUnique({
        where: { email },
        // include: {role: true}
    });

    if(!user){
        return { error: "Sorry this user is not exist"}
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if(!isMatch){
        return { error: "passowrd not Matched"}
    }

    // session.user = user;
    session.user = { ...user, role: user.role };
    session.isLoggedIn= true;
    // session.role = user.role;
    await session.save();

    if (session.user.role === 'ADMIN' || session.user.role === 'MANIGER') {
        redirect('/dashboard');
    } else {
        redirect('/');
    }
}


// delete Function 
export const deleteFunction = async ({ id, table }) =>{
    const session = await getSession();

    if(!session.isLoggedIn){
        return { error: "user not found"}
    }

    let item;
    try {
        item = await prisma[table].delete({
            where: { id },
        })

        if(!item){
            return { error: `${table} not deleted`}
        }
    } catch (error) {
        if(!item){
            return { error: `${table} not deleted`}
        }
    }


    revalidatePath(
        `/dashbord/${table == "Category" ? "categories" : `${table}s`}`
    );
    return { result: item}
}


// logout
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/login")
}