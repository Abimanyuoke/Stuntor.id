"use client"
import { ReactNode } from "react";
import Sidebar from "./sidebar";

type MenuType = {
    id: string,
    icon: ReactNode
    path: string,
    label: string
}

type CashierProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[], 
    className?: string
}

const CashierTemplate = ({ children, id, title, menuList, className }: CashierProp) => {
    return (
        <div className={`w-full min-h-dvh ${className}`} >
            <Sidebar menuList={menuList} title={title} id={id}>
                {children}
            </Sidebar>
        </div>
    )
}


export default CashierTemplate
