"use client"

import { IUser } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/bridge"
import { getCookies } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { InputGroupComponent } from "@/components/InputComponent"
import FileInput from "@/components/fileInput"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

const SignUp = () => {
    const [user, setUser] = useState<IUser>({
        id: 0, uuid: ``, name: ``, email: ``,
        password: ``, profile_picture: ``, role: `CASHIER`, createdAt: ``, updatedAt: ``
    })
    const router = useRouter()
    const TOKEN = getCookies("token") || ""
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user`
            const { name, email, password, role } = user
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("role", role || "")
            if (file !== null) payload.append("profile_picture", file)

            const response = await post(url, payload, TOKEN)
            const data = response as { status: boolean; message: string }

            if (data.status) {
                toast.success(data.message)
                setTimeout(() => {
                    router.replace(`/login`)
                }, 1000)
            } else {
                toast.warning(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(`Something went wrong`)
        }
    }


    return (
        <div className="w-screen h-screen bg-slate-900 bg-cover flex justify-center items-center relative z-10">
            <div className="mb-2 p-5 absolute top-0 left-0">
                <button
                    onClick={() => router.replace(`/main`)}
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
                <div className="w-full md:w-6/12 lg:w-1/3 rounded-lg p-5 bg-white flex flex-col items-center relative">
                    <form onSubmit={handleSubmit}>
                        {/* modal header */}
                        <div className="flex space-x-5 justify-center">
                            <div className="bg-white text-primary border-2 border-primary flex justify-center items-center rounded-md py-1 px-12">
                                <Link className="font-semibold text-xl" href={"/login"}>Masuk</Link>
                            </div>
                            <div className="bg-primary text-white flex justify-center items-center rounded-md px-12">
                                <Link className="font-semibold text-xl" href={"/signup"}>Sign Up</Link>
                            </div>
                        </div>
                        {/* end modal header */}

                        {/* modal body */}
                        <div className="pt-5 text-black">
                            <InputGroupComponent id={`name`} type="text" value={user.name}
                                onChange={val => setUser({ ...user, name: val })}
                                required={true} label="Name" />

                            <InputGroupComponent id={`email`} type="text" value={user.email}
                                onChange={val => setUser({ ...user, email: val })}
                                required={true} label="Email" />

                            <InputGroupComponent id={`password`} type="text" value={user.password}
                                onChange={val => setUser({ ...user, password: val })}
                                required={true} label="Password" />

                            <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                                label="Upload Picture (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />

                        </div>
                        {/* end modal body */}

                        {/* modal footer */}
                        <div className="my-10">
                            <button type="submit" className="bg-primary hover:bg-primary uppercase w-full py-3 font-semibold cursor-pointer rounded-md text-white">
                                Signup
                            </button>
                        </div>
                        {/* end modal footer */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp