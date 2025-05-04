"use client"

import { BASE_API_URL } from "@/global"
import { storeCookie } from "../../lib/client-cookies"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import Link from "next/link"
import { MdOutlineEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { ArrowLeft } from "lucide-react"

const LoginPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user/login`
            const payload = JSON.stringify({ email: email, password })
            const { data } = await axios.post<{ status: boolean; message: string; token: string; data?: { id: string; name: string; role: string; profile_picture?: string } }>(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data.status == true) {
                toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000 })
                storeCookie("token", data.token)
                if (data.data) {
                    storeCookie("id", data.data.id)
                    storeCookie("name", data.data.name)
                    storeCookie("role", data.data.role)
                    storeCookie("profile_picture", data.data.profile_picture || "")
                    let role = data.data.role
                    if (role === `MANAGER`) setTimeout(() => router.replace(`/manager/dashboard`), 1000)
                    else if (role === `CASHIER`) setTimeout(() => router.replace(`/cashier/home`), 1000)
                }
            }
            else toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "warning" })
        } catch (error) {
            console.log(error);
            toast(`Something wrong`, { hideProgressBar: true, containerId: `toastLogin`, type: "error" })
        }
    }

    return (
        <div className="w-screen h-screen bg-slate-900 bg-cover">
            <ToastContainer containerId={`toastLogin`} />
            <div className="mb-2 p-5">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-white hover:text-slate-400">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </button>
            </div>
            <div className="max-w-7xl lg:w-full h-full flex mx-auto justify-between items-center">
                <div className="flex flex-col lg:w-1/2 p-5 justify-center lg:p-0 items-start gap-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Ayo Cegah <span className="text-[#62C44A]">Stunting Pada Anak - anak</span></h1>
                    <p className="text-start text-white">Masalah stunting pada balita masih cukup hangat diperbincangkan dan masih banyak orang tua tidak menegerti cara pencegahannya. Oleh karena itu, kami menawarkan kepada Ibu - Ibu yang mempunyai balita untuk bekerja sama dalam mengatasi masalah stunting pada balita. Produk yang kami buat adalah sebuah produk untuk Pencegahan, Pengedukasian, dan Monitoring masalah stunting.</p>
                </div>
                <div className="w-full lg:w-1/3 h-1/2 rounded-lg p-5 bg-white flex flex-col items-center relative">
                    <div className="flex space-x-5">
                        <div className="bg-primary text-white flex justify-center items-center rounded-md py-1 px-12">
                            <Link className="font-semibold text-xl" href={"/login"}>Masuk</Link>
                        </div>
                        <div className="bg-white border border-primary text-primary flex justify-center items-center rounded-md px-12">
                            <Link className="font-semibold text-xl" href={"signup"}>Sign Up</Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full my-6">
                        <div className="flex w-full my-4">
                            <div className="bg-primary rounded-l-md p-3">
                                <MdOutlineEmail className="text-[#333333] text-xl" />
                            </div>
                            <input type="text" className="border p-2 grow rounded-r-md focus:outline-none focus:ring-primary focus:border-primary" value={email}
                                onChange={e => setEmail(e.target.value)} placeholder="Email" id={email} />
                        </div>

                        <div className="flex w-full my-4">
                            <div className="bg-primary rounded-l-md p-3">
                                <GiPadlock className="text-[#333333] text-xl" />
                            </div>
                            <input type={showPassword ? `text` : `password`} className="border p-2 grow focus:outline-none focus:ring-primary focus:border-primary" value={password}
                                onChange={e => setPassword(e.target.value)} placeholder="Password" id={`password - industri - app`} />
                            <div className="cursor-pointer bg-primary rounded-r-md p-3" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                }
                            </div>
                        </div>

                        <div className="my-10">
                            <button type="submit" className="bg-primary hover:bg-primary uppercase w-full py-4 font-semibold cursor-pointer rounded-md text-white">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
