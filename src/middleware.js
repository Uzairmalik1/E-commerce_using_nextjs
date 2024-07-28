
import { getIronSession } from 'iron-session';
import { NextResponse } from 'next/server'
import { sessionOptions } from './utils/lib';

 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  console.log("meddleware is runing")

  const authToken = request.cookies.get("code-scrapper-ecommerce")?.value;

  const session = await getIronSession(request, new NextResponse(), sessionOptions);
    
    // Check if the user is logged in
  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Destructure the role from the session
  const { role } = session.user || {};
  const url = request.nextUrl.pathname;

  // Allow admin role to access all routes
  if (role === 'ADMIN') {
    return NextResponse.next();
  }

  // Define the allowed paths for the MANAGER role
  const allowedPaths = [
    '/dashboard',
    '/dashboard/products',
    '/dashboard/categories',
    '/dashboard/settings',
  ];

  // Allow MANAGER role to access specific paths
  if (role === 'MANIGER') {
    // Check if the current path is allowed
    if (allowedPaths.includes(url) || url.startsWith('/dashboard/products') || url.startsWith('/dashboard/categories') || url.startsWith('/dashboard/settings')) {
      return NextResponse.next();
    }
    // Redirect to unauthorized page for MANAGER role if the path is not allowed
    return NextResponse.rewrite(new URL('/unauthorized', request.url));
  }

  if(role === 'USER'){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Default to redirect to unauthorized page for all other roles
  return NextResponse.rewrite(new URL('/unauthorized', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}


//=====================================================================================================================================================================================
// middleware for role with database
// import { getIronSession } from 'iron-session';
// import { NextResponse } from 'next/server';
// import { sessionOptions } from './utils/lib';

// export async function middleware(request) {
//   console.log("middleware is running");

//   const authToken = request.cookies.get("code-scrapper-ecommerce")?.value;

//   const session = await getIronSession(request, new NextResponse(), sessionOptions);

//   console.log("session", session);
//   if (!session.isLoggedIn) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   const { email } = session.user || {};
//   const url = request.nextUrl.pathname;


//   const response = await fetch(`${request.nextUrl.origin}/api/getUserRole?email=${email}`, {
//     method: 'GET'
//   });
//   const user = await response.json();
//   console.log("response data: ", user)

//   if (!response.ok) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // let user;
//   // try {
//   //   user = await response.json();
//   //   console.log("user data: ", user)
//   // } catch (error) {
//   //   console.error('Error parsing JSON:', error);
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }

//   const { role } = user.role;
//   if(!role){
//     console.log("role not found")
//   }else{
//     console.log("role is: ", role)
//   }
//   const permissions = user.role.permissions.flatMap(permission => permission.route);
//   console.log("permissions: ", permissions)

//   if (role === 'ADMIN') {
//     return NextResponse.next();
//   }

//   if (role === 'MANIGER' && permissions.includes(url)) {
//     return NextResponse.next();
//   }

//   if (role === 'USER') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.rewrite(new URL('/unauthorized', request.url));
// }

// export const config = {
//   matcher: '/dashboard/:path*',
// };


