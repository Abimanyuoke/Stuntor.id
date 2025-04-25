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
        <div>{children}</div>
    )
}

export default RootLayout
