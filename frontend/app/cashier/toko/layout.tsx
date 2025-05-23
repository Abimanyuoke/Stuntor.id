import CashierTemplate from "@/components/cashierTemplate"
import CashierList from "../../cashierList"


export const metadata = {
    title: 'Toko | Ordering System',
    description: 'Generated by create next app',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <CashierTemplate title="Toko Persediaan" id="toko" menuList={CashierList}>
            {children}
        </CashierTemplate>
    )
}

export default RootLayout