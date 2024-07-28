"use client"
import { getSession } from "@/utils/actions";
import { sidebarRoutes } from "@/utils/data";
import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define accessible routes for each role
  const accessibleRoutes = {
    ADMIN: sidebarRoutes,
    MANAGER: sidebarRoutes.filter(route =>
      ["dashboard", "products", "categories", "settings"].includes(route.title.toLowerCase())
    )
  };

  return (
    <aside className={`transition-all duration-300 ${isOpen ? "w-64" : "w-20"} bg-gradient-to-b from-white to-gray-100 h-screen transition-all duration-300 ease-in-out` }>
      <div className="h-16 flex gap-3 items-center justify-between border-b-2 px-4">
        <h2 className={`text-2xl font-semibold text-gray-800 ${isOpen ? "block" : "hidden"} whitespace-nowrap`}>
          {role === 'ADMIN' ? "Admin Panel" : "Manager Panel"}
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <ul>
        {accessibleRoutes[role]?.map((item, index) => (
          <li
            key={index}
            className="flex items-center h-16 cursor-pointer pl-6 hover:bg-gray-100"
          >
            <Link className="flex items-center space-x-4" href={item.route}>
              {item.icon}
              <span className={`text-md font-medium ${isOpen ? "block" : "hidden"}`}>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
