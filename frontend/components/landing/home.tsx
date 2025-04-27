import React from "react";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative py-36 bg-white px-4">
            <div className="max-w-7xl mx-auto font-inter flex justify-between">
                <div className="flex flex-col lg:w-1/2 p-5 justify-center lg:p-0 items-start gap-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#333333] leading-tight">Ayo Cegah <span className="text-primary">Stunting Pada Anak - anak</span></h1>
                    <p className="text-start">Masalah stunting pada balita masih cukup hangat diperbincangkan dan masih banyak orang tua tidak menegerti cara pencegahannya. Oleh karena itu, kami menawarkan kepada Ibu - Ibu yang mempunyai balita untuk bekerja sama dalam mengatasi masalah stunting pada balita. Produk yang kami buat adalah sebuah produk untuk Pencegahan, Pengedukasian, dan Monitoring masalah stunting.</p>
                    <button className="text-white bg-primary flex items-center text-lg font-bold py-2 px-8 rounded-md mt-3">Join Us</button>
                </div>
                <Image 
                src="/image.svg"
                alt="image logo"
                width={500}
                height={200}
                className="hidden lg:block"/>
            </div>
        </div>
    )
}