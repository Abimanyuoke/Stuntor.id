import About from '@/components/landing/about'
import Fitur from '@/components/landing/fitur'
import Home from '@/components/landing/home'
import Link from 'next/link'
import React from 'react'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'


const Main = ({children} : {children: React.ReactNode}) => {
    return (
        <div className='overflow-x-hidden overflow-y-hidden'>
            <Home/>
            <About/>
            <Fitur/>
            {children}
            <Link href="/chat">
                <div className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition">
                    <IoChatbubbleEllipsesSharp className="w-5 h-5" />
                </div>
            </Link>
        </div>
    )
}

export default Main 