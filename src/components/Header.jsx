"use client";
import React, { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { components } from "@/utils/data";
import { Input } from "./ui/input";
import { GanttChart, Heart, LayoutDashboard, Settings, ShoppingCart, UserRoundCog, Menu, X, BarChart, Logs, LayoutPanelLeft, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { logout } from "@/utils/actions";

const Header = ({ Categories, session, userRole }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRedirect = (path) => {
    if (!session?.isLoggedIn) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {/* <Navbar /> */}
      <div className="flex sticky justify-between items-center h-20 px-4 sm:px-[10%]">
        <Link href="/" className="font-bold text-xl text-gray-600">
          E-commerce
        </Link>
        <div className="hidden sm:flex text-md items-center gap-5">
          <Link href="/" className="hidden sm:block">
            Home
          </Link>
          <div className="hidden sm:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {Categories?.map((component) => (
                        <ListItem
                          key={component.id}
                          title={component.name}
                          href={`/products?cat=${component.id}`}
                          image={component.image}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input className="hidden sm:block h-8" placeholder="Search" />
          <Link
            href="/wishlist"
            className="hidden sm:block md:block"
            onClick={(e) => {
              e.preventDefault();
              handleRedirect("/wishlist");
            }}
          >
            <Heart size={20} />
          </Link>
          <Link
            href="/addtocart"
            className="hidden sm:block md:block"
            onClick={(e) => {
              e.preventDefault();
              handleRedirect("/addtocart");
            }}
          >
            <ShoppingCart size={20} />
          </Link>
          {session?.isLoggedIn ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {session?.user?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {session?.user?.email}
                    </p>
                    <Separator className="my-4" />
                    {userRole === "ADMIN" || userRole === "MANAGER" ? (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard size={20} /> <span>Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        href="/profileSettings"
                        className="flex items-center gap-2"
                      >
                        <UserRoundCog size={20} /> <span>Profile Settings</span>
                      </Link>
                    )}
                    <Separator className="my-4" />
                    <form action={logout}>
                      <button className="cursor-pointer border-none outline-none flex items-center gap-2">
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login" className="hidden sm:block">
              Login
            </Link>
          )}

 {/* ============ mobile view ============= */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div
              className={`absolute top-16 right-4 z-30 bg-white border rounded-lg shadow-lg w-40 transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <Link href="/" className="flex gap-2 px-4 py-2 text-gray-800">
              <LayoutPanelLeft /> Home
              </Link>
              <div className="border-t"></div>
              <div className="block px-4 py-2 text-gray-800">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-full gap-2 p-0 m-0 text-base bg-white text-left">
                      <Logs /> Categories
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex w-[145px] gap-1 relative left-[-6px] flex-col p-1">
                          {Categories?.map((component) => (
                            <ListItem
                              key={component.id}
                              title={component.name}
                              href={`/products?cat=${component.id}`}
                              image={component.image}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="border-t"></div>
              <Link
                href="/wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  handleRedirect("/wishlist");
                }}
                className=" flex gap-2 px-4 py-2 text-gray-800"
              >
               <Heart size={20} /> Wishlist
              </Link>
              <div className="border-t"></div>
              <Link
                href="/addtocart"
                onClick={(e) => {
                  e.preventDefault();
                  handleRedirect("/addtocart");
                }}
                className=" flex gap-2 px-4 py-2 text-gray-800"
              >
               <ShoppingCart size={20} /> Cart
              </Link>
              <div className="border-t"></div>
              {session?.isLoggedIn ? (
                <div>
                  {userRole === "ADMIN" || userRole === "MANAGER" ? (
                    <Link
                      href="/dashboard"
                      className="flex gap-2 px-4 py-2 text-gray-800"
                    >
                     <LayoutDashboard size={20} /> Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/profileSettings"
                      className="flex gap-2 px-4 py-2 text-gray-800"
                    >
                      <UserRoundCog size={20} /> Profile Settings
                    </Link>
                  )}
                  <div className="border-t"></div>
                  <form action={logout}>
                    <button className="flex gap-2 px-4 py-2 text-gray-800 w-full text-left">
                    <LogOut /> Logout
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/login" className="block px-4 py-2 text-gray-800">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ListItem = forwardRef(
  ({ className, title, image, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center gap-4">
              <img src={image} className="h-8 w-8" alt="" />
              <h2>{title}</h2>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
