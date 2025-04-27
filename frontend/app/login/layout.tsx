import FooterLogin from "@/components/footerLogin"
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
        <div className="overflow-x-hidden">
            <NavbarLogin/>
            {children}
            <FooterLogin/>
        </div>
    )
}

export default RootLayout
