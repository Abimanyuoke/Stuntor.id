"use client"

import React, { ReactNode } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Slider from "react-slick";

const HomePage = () => {

        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
        };

        return (
            <div>
                <Image
                    src="/home.jpg"
                    alt="Hero Image"
                    width={1000}
                    height={100}
                    className=" object-cover"/>
            </div>
        );
    }
export default HomePage
