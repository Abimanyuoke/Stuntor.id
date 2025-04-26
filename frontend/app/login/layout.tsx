import NavbarLogin from "@/components/navbarLogin"
import React from "react"

export const metadata = {
    title: 'Login',
    description: 'Praktikum SMK Telkom Malang',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div>
            <NavbarLogin/>
            {children}
        </div>
    )
}

export default RootLayout
