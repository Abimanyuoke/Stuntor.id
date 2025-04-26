import About from '@/components/landing/about'
import Home from '@/components/landing/home'
import React from 'react'


const Main = ({children} : {children: React.ReactNode}) => {
    return (
        <div className='overflow-x-hidden overflow-y-hidden'>
            <Home/>
            <About/>
            {children}
        </div>
    )
}

export default Main 