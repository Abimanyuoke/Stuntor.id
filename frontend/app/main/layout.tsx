import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import React from "react"

export const metadata = {
    title: 'Landing Page Main',
    description: 'Praktikum SMK Telkom Malang',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}

export default RootLayout
