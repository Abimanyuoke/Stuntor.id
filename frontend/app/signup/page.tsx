"use client"

import { IUser } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/bridge"
import { getCookies } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { InputGroupComponent } from "@/components/InputComponent"
import Select from "@/components/select"
import FileInput from "@/components/fileInput"
import Link from "next/link"

const SignUp = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>({
        id: 0, uuid: ``, name: ``, email: ``,
        password: ``, profile_picture: ``, role: ``, createdAt: ``, updatedAt: ``
    })
    const router = useRouter()
    const TOKEN = getCookies("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const openModal = () => {
        setUser({
            id: 0, uuid: ``, name: ``, email: ``,
            password: ``, profile_picture: ``, role: ``, createdAt: ``, updatedAt: ``
        })
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }

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
            if (file !== null) payload.append("profile_picture", file || "")
            const response = await post(url, payload, TOKEN);
            const data = response as { status: boolean; message: string };
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastUser`, type: `success` })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastUser`, type: `warning` })
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastUser`, type: `error` })
        }
    }

    return (
        <div className="w-screen h-screen bg-slate-900 bg-cover flex justify-center items-center relative z-10">
            <ToastContainer containerId={`toastLogin`} />
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

                            <Select id={`role`} value={user.role} label="role"
                                required={true} onChange={val => setUser({ ...user, role: val })}>
                                <option value="">--- Select Role ---</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="CASHIER">CASHIER</option>
                            </Select>

                            <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                                label="Upload Picture (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />

                        </div>
                        {/* end modal body */}

                        {/* modal footer */}
                        <div className="my-10">
                            <button type="submit" className="bg-primary hover:bg-primary uppercase w-full py-3 font-semibold rounded-md text-white">
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


// "use client"

// import { IUser } from "@/app/types"
// import { BASE_API_URL } from "@/global"
// import { post } from "@/lib/bridge"
// import { getCookies } from "@/lib/client-cookies"
// import { useRouter } from "next/navigation"
// import { FormEvent, useRef, useState } from "react"
// import { toast, ToastContainer } from "react-toastify"
// import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/button"
// import { InputGroupComponent } from "@/components/InputComponent"
// import Modal from "@/components/modal"
// import Select from "@/components/select"
// import FileInput from "@/components/fileInput"


// const AddUser = () => {
//     const [isShow, setIsShow] = useState<boolean>(false)
//     const [user, setUser] = useState<IUser>({
//         id: 0, uuid: ``, name: ``, email: ``,
//         password: ``, profile_picture: ``, role: ``, createdAt: ``, updatedAt: ``
//     })
//     const router = useRouter()
//     const TOKEN = getCookies("token") || ""
//     const [file, setFile] = useState<File | null>(null)
//     const formRef = useRef<HTMLFormElement>(null)
//     const openModal = () => {
//         setUser({
//             id: 0, uuid: ``, name: ``, email: ``,
//             password: ``, profile_picture: ``, role: ``, createdAt: ``, updatedAt: ``
//         })
//         setIsShow(true)
//         if (formRef.current) formRef.current.reset()
//     }

//     const handleSubmit = async (e: FormEvent) => {
//         try {
//             e.preventDefault()
//             const url = `${BASE_API_URL}/user`
//             const { name, email, password, role } = user
//             const payload = new FormData()
//             payload.append("name", name || "")
//             payload.append("email", email || "")
//             payload.append("password", password || "")
//             payload.append("role", role || "")
//             if (file !== null) payload.append("profile_picture", file || "")
//             const response = await post(url, payload, TOKEN);
//             const data = response as { status: boolean; message: string };
//             if (data?.status) {
//                 setIsShow(false)
//                 toast(data?.message, { hideProgressBar: true, containerId: `toastUser`, type: `success` })
//                 setTimeout(() => router.refresh(), 1000)
//             } else {
//                 toast(data?.message, { hideProgressBar: true, containerId: `toastUser`, type: `warning` })
//             }
//         } catch (error) {
//             console.log(error);
//             toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastUser`, type: `error` })
//         }
//     }

//     return (
//         <div>
//             <ToastContainer containerId={`toastUser`} />
//             <ButtonSuccess type="button" onClick={() => openModal()}>
//                 <div className="flex items-center gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                     </svg>
//                     Add User
//                 </div>
//             </ButtonSuccess>
//             <Modal isShow={isShow} onClose={state => setIsShow(state)}>
//                 <form onSubmit={handleSubmit}>
//                     {/* modal header */}
//                     <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
//                         <div className="w-full flex items-center">
//                             <div className="flex flex-col">
//                                 <strong className="font-bold text-2xl text-black">Create New User</strong>
//                                 <small className="text-slate-400 text-sm">Managers can create user items on this page.</small>
//                             </div>
//                             <div className="ml-auto">
//                                 <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* end modal header */}

//                     {/* modal body */}
//                     <div className="p-5 text-black">
//                         <InputGroupComponent id={`name`} type="text" value={user.name}
//                             onChange={val => setUser({ ...user, name: val })}
//                             required={true} label="Name" />

//                         <InputGroupComponent id={`email`} type="text" value={user.email}
//                             onChange={val => setUser({ ...user, email: val })}
//                             required={true} label="Email" />

//                         <InputGroupComponent id={`password`} type="text" value={user.password}
//                             onChange={val => setUser({ ...user, password: val })}
//                             required={true} label="Password" />

//                         <Select id={`role`} value={user.role} label="role"
//                             required={true} onChange={val => setUser({ ...user, role: val })}>
//                             <option value="">--- Select Role ---</option>
//                             <option value="MANAGER">MANAGER</option>
//                             <option value="CASHIER">CASHIER</option>
//                         </Select>

//                         <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
//                             label="Upload Picture (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />

//                     </div>
//                     {/* end modal body */}

//                     {/* modal footer */}
//                     <div className="w-full p-5 flex rounded-b-2xl shadow">
//                         <div className="flex ml-auto gap-2">
//                             <ButtonDanger type="button" onClick={() => setIsShow(false)}>
//                                 Cancel
//                             </ButtonDanger>
//                             <ButtonPrimary type="submit">
//                                 Save
//                             </ButtonPrimary>
//                         </div>
//                     </div>
//                     {/* end modal footer */}
//                 </form>
//             </Modal>

//         </div>
//     )


// }
// export default AddUser

