"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Slider from "react-slick";
import { IMenu } from "@/app/types";
import { getCookies } from "@/lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/bridge";
import { ButtonPrimary } from "@/components/button";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const HomePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const [menu, setMenu] = useState<IMenu[]>([]);

    const NextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
        return (
            <div
                className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-400 text-5xl p-2"
                onClick={onClick}
            >
                <IoIosArrowForward />
            </div>
        );
    };
    const PrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
        return (
            <div
                className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-400 text-5xl p-2"
                onClick={onClick}>
                <IoIosArrowBack />
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 200,
        cssEase: "linear",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    const getMenu = async () => {
        try {
            const TOKEN = getCookies("token") || "";
            const url = `${BASE_API_URL}/menu?search=${search}`;
            const { data } = await get(url, TOKEN);
            if ((data as { status: boolean; data: IMenu[] }).status) {
                setMenu((data as { status: boolean; data: IMenu[] }).data);
            }
        } catch (error) {
            console.error("Error getmenu menu:", error);
        }
    };

    useEffect(() => {
        getMenu();
    }, [search]);

    return (
        <div className='w-full overflow-x-hidden'>
            {/* Hero */}
            <div className='relative w-full h-[670px]'>
                <div className='absolute inset-0'>
                    <Image src="/home.jpg" alt='Home Image' className='object-cover' fill />
                    <div className="absolute bg-gradient-to-t from-black to-transparent inset-0 hidden lg:block"></div>
                </div>
                <div className="py-16 px-6 md:px-16 lg:px-32 font-roboto absolute top-24 lg:top-32">
                    <div className="text-black lg:text-white space-y-5 md:text-center lg:text-left md:w-[670px] lg:w-[700px]">
                        <h1 className="text-2xl font-bold lg:text-3xl">
                            Cukup Gizi, Cegah Stunting, Siap Masa Depan Gemilang! “Stuntor.id”'s Online Counseling for Positive Learning
                        </h1>
                        <p className="text-sm font-normal lg:text-base">
                            You're not alone on this journey. Our compassionate counselors are here to guide you.
                        </p>
                        <div className="flex justify-start text-xs space-x-5 md:justify-center lg:justify-start">
                            <button className="bg-primary text-white text-center px-4 py-2 rounded-md lg:text-base cursor-pointer lg:px-7">
                                Start Your Healing Journey Today
                            </button>
                            <button className="border border-black lg:border-white rounded-md bg-transparent px-4 py-2 lg:text-base cursor-pointer lg:px-7">
                                Schedule Your Counseling Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barang */}
            <div className='py-10'>
                <div className='flex justify-start items-center px-33'>
                    <h1 className='text-4xl font-bold'>Persediaan Terbaru</h1>
                </div>
                <div className='mt-6 px-24'>
                    <Slider {...settings}>
                        {menu.map((data) => (
                            <div key={data.id} className="p-4">
                                <div className="bg-primary text-white rounded-lg overflow-hidden shadow-md flex flex-col h-[400px] w-[260px] mx-auto">
                                    <Image
                                        width={300}
                                        height={200}
                                        src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                        alt="preview"
                                        className="object-cover bg-white w-full h-[200px] rounded-t-lg"
                                        unoptimized
                                    />
                                    <div className="flex flex-col justify-between flex-1 p-4">
                                        <div className='text-center'>
                                            <h5 className="font-bold text-xl mb-2">{data.name}</h5>
                                            <p className="text-sm line-clamp-3">{data.description}</p>
                                        </div>
                                        <ButtonPrimary type="button" className="mt-4 justify-center" onClick={() => router.replace('/cashier/toko')}>
                                            Tambahkan Keranjang
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
