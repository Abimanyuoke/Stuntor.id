import React from "react";
import Image from "next/image";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";

export default function NavbarLogin() {
    return (
        <nav className="bg-white shadow-md w-full font-inter px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex p-5 justify-between items-center">
                    <Image
                        src="./Logo.svg"
                        alt="Logo Stuntor"
                        width={150}
                        height={150} />
                        <div className="flex flex-row items-center space-x-3 gap-x-3">
                            <div className="flex flex-row items-center space-x-2 text-xl text-[#333333] font-black">
                                <FaInstagramSquare className="text-4xl"/>
                                <a href="#">@Stuntor.id</a>
                            </div>
                            <div className="flex flex-row items-center space-x-2 text-xl text-[#333333] font-black">
                                <FaFacebook className="text-3xl"/>
                                <a href="#">Stuntor.id</a>
                            </div>
                        </div>
                </div>
            </div>
        </nav>
    )
}