"use client";

import { MdOutlineMenu as MenuIcon, MdClose as CloseIcon } from "react-icons/md";
import { FaTachometerAlt, FaTools, FaUniversity } from "react-icons/fa";
import { useState } from "react";
import Skill from "@/components/Skill";
import Internship from "@/components/Intenship";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="text-sm text-red-600 h-full w-full">
      <div className="h-[4rem] border-b shadow-lg">
        <div className="flex justify-between items-center h-full w-full px-4 sm:px-8">
          <div className="font-bold font-serif text-2xl text-black">
            <div className="flex sm:px-6">
              <button className="mt-1 mr-2 sm:hidden" onClick={toggleMenu}>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
              <span className="ml-1">WhatBytes</span>
            </div>
          </div>
          <div>
            <div className="border flex h-full py-1 px-1 w-full rounded-md">
              <div className="rounded-full px-1">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Male Avatar"
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="font-bold py-1 font-serif text-black text-sm">
                Rahil Siddique
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <div
          className={`fixed top-0 left-0 min-h-screen bg-white shadow-lg z-50 p-4 transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:block ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-[60%] sm:w-[30%] md:w-[20%]`}
        >
          <div className="flex justify-end mb-4 sm:hidden">
            <button onClick={toggleMenu}>
              <CloseIcon />
            </button>
          </div>

          <ul className="space-y-4 md:mt-4">
            <li
              className={`flex items-center font-bold text-black p-2 rounded-lg transition-colors duration-200 ${
                activeItem === "Dashboard"
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleItemClick("Dashboard")}
            >
              <FaTachometerAlt className="mr-3" /> Dashboard
            </li>
            <li
              className={`flex items-center font-bold text-black p-2 rounded-lg transition-colors duration-200 ${
                activeItem === "Skill Test"
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleItemClick("Skill Test")}
            >
              <FaTools className="mr-3" /> Skill Test
            </li>
            <li
              className={`flex items-center font-bold text-black p-2 rounded-lg transition-colors duration-200 ${
                activeItem === "Internship"
                  ? "bg-gray-200 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleItemClick("Internship")}
            >
              <FaUniversity className="mr-3" /> Internship
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 w-full sm:w-[70%] md:w-[80%] ${
            isMenuOpen ? "hidden" : "block"
          } sm:block`}
        >
          <div className="p-4">
            {activeItem === "Dashboard" && <Dashboard />}
            {activeItem === "Skill Test" && <Skill />}
            {activeItem === "Internship" &&   <Internship />}
          </div>
        </div>
      </div>
    </div>
  );
}
