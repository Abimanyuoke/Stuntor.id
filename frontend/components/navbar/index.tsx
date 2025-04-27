"use client"
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="bg-white shadow-md sticky w-full top-0 z-50 font-inter px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex p-5 justify-between">
                    <Image
                        src="./Logo.svg"
                        alt="Logo Stuntor"
                        width={150}
                        height={150}/>
                    <div className="hidden md:flex">
                        <div className="hidden md:flex items-center space-x-8 font-bold text-lg text-[#333333] ">
                            <a href="#about" className="hover:text-primary transition-all duration-300">Tentang Kami</a>
                            <a href="#fitur" className="hover:text-primary transition-all duration-300">Fitur</a>
                            <div className="md:border-2 h-10 mr-4">{''}</div>
                        </div>
                        <div className="hidden md:flex space-x-5 font-bold">
                            <Link
                                href="/signup"
                                className="text-primary bg-white px-4 py-2 rounded border-2 border-primary transition-all duration-300">
                                Daftar
                            </Link>
                            <Link
                                href="/login"
                                className="text-white bg-primary px-4 py-2 rounded border border-primary transition-all duration-300">
                                Masuk
                            </Link>
                        </div>
                    </div>
                    <button onClick={handleOpen} className="text-3xl text-gray-700 md:hidden">
                        {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                    </button>
                </div>
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                        <div className="flex flex-col space-y-5 p-4 py-10 font-bold">
                            <a href="/about" className="text-[#333333] hover:text-primary text-lg">Tentang Kami</a>
                            <a href="/fitur" className="text-[#333333] hover:text-primary text-lg">Fitur</a>
                            <Link
                                href="/signup"
                                className="text-primary bg-white px-4 py-2 rounded hover:bg-primary hover:text-white border-2 border-primary transition-all duration-300">
                                Daftar
                            </Link>
                            <Link
                                href="/login"
                                className="text-white bg-primary px-4 py-2 rounded border border-primary hover:bg-white hover:text-primary transition-all duration-300">
                                Masuk
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}