// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req) {
//   const url = new URL(req.url);
//   const email = url.searchParams.get('email');

//   if (!email) {
//     return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: { role: { include: { permissions: true } } },
//     });

//     if (!user) {
//       return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify(user), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
