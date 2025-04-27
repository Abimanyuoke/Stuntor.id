import React from "react";
import Image from "next/image";

export default function About() {
    return (
        <div className="relative bg-[#333333] py-24 px-4 font-inter text-white" id="about">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-start px-5 lg:px-0 items-center space-x-20">
                    <Image
                    src="/Logo2.svg"
                    alt="Logo Stuntor"
                    width={300}
                    height={300}
                    className="hidden md:block w-[200px] md:w-[300px]"/>
                    <div className="flex flex-col justify-start gap-4 w-[561px]">
                        <h1 className="font-extrabold text-4xl md:text-6xl">Tentang Kami</h1>
                        <p className="text-base md:text-xl font-normal">Selamat datang di Stuntor, kami dari tim Leborn Shunshine memberikan sebuah produk solusi terpadu yang dirancang khusus untuk membantu ibu-ibu mengatasi masala stunting pada balita, menuju generasi emas Indonesia. Dengan fokus pada tiga pilar utama, yaitu Pencegahan, Pengedukasian, dan Monitoring</p>
                    </div>
                </div>
            </div>
            <Image
            src="/Logo2.svg"
            alt="Logo Stuntor"
            width={600}
            height={600}
            className="hidden lg:block absolute z-0 opacity-25 -right-36 top-0"/>
        </div>
    )

}