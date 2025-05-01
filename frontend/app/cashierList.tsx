import { ReactNode } from "react";

interface IPropMenu {
    id: string,
    path: string,
    label: string,
    icon: ReactNode
}


let CashierList: IPropMenu[] = [
    {
        id: `home`,
        path: `/cashier/home`,
        label: `Home`,
        icon:
            <svg xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>

    },
    {
        id: `rekam_medis`,
        path: `/cashier/rekam_medis`,
        label: `Rekam Medis`,
        icon:
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="14" y2="17" />
            </svg>


    },
    {
        id: `program`,
        path: `/cashier/program`,
        label: `Program Pemerintah`,
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={23} height={23} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
    },
    {
        id: `toko`,
        path: `/cashier/toko`,
        label: `Toko Persediaan`,
        icon:
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 20V10M20 20V10M4 10C4 10 3 9 3 7.5C3 6 4 4 4 4H20C20 4 21 6 21 7.5C21 9 20 10 20 10M4 10H20M8 20V14H11V20M16 10V4M8 10V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
    },
    {
        id: `edukasi`,
        path: `/cashier/edukasi`,
        label: `Edukasi`,
        icon:
            <svg
                width={25}
                height={25}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 7L12 3L21 7L12 11L3 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21 7V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 9.5V13C6 14.1 8.7 15 12 15C15.3 15 18 14.1 18 13V9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
    },
]

export default CashierList
