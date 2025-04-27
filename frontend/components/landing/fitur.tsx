import React from "react";
import Image from "next/image";

export default function Fitur() {
    return (
        <div className="relative bg-white py-24 font-inter px-4" id="fitur">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-[#333333] text-6xl font-extrabold w-[500px]">Fitur Yang Kami Sediakan</h1>
                <div className="flex flex-col gap-32 mt-24">
                    <div className="flex flex-col gap-5 justify-start text-start">
                        <h1 className="text-primary text-4xl font-extrabold">Rekam Medis</h1>
                        <p className="text-xl font-normal w-[519px]">Pihak kesehatan akan memberikan sebuah Google Form kepada Ibu - Ibu untuk mengisi data - data pertumbuhan balita selama proses monitoring.</p>
                    </div>
                    <div className="flex flex-col gap-5 items-end text-end">
                        <h1 className="text-primary text-4xl font-extrabold">Program Pemerintah</h1>
                        <p className="text-xl font-normal w-[519px]">Memberikan informasi kepada Ibu - Ibu untuk bahwa ada nya kegiatan pencegahan stunting yang dilakukan pemerintah, seperti program suplemen gizi, pemeriksaan kesehatan, edukasi dan penyuluhan.  </p>
                    </div>
                    <div className="flex flex-col gap-5 justify-start text-start">
                        <h1 className="text-primary text-4xl font-extrabold">Toko Persediaan</h1>
                        <p className="text-xl font-normal w-[519px]">Kami telah menyediakan fitur online shop asupan gizi dengan bekerja sama dengan supermarket seperti Indomaret, Alfamaret, Basmalah, dll. </p>
                    </div>
                    <div className="flex flex-col gap-5 items-end text-end">
                        <h1 className="text-primary text-4xl font-extrabold">Artikel dan Video Edukasi</h1>
                        <p className="text-xl font-normal w-[519px]">Menyediakan artikel dan video edukasi tentang masalah stunting. Artikel dan video ini juga bertujuan untuk memberikan pengetahuan yang lebih luas tentang faktor-faktor risiko yang terkait dengan stunting, serta strategi dan langkah-langkah konkret yang dapat diambil oleh orang tua,  </p>
                    </div>
                    <div className="flex flex-col gap-5 justify-start text-start">
                        <h1 className="text-primary text-4xl font-extrabold">Chat AI</h1>
                        <p className="text-xl font-normal w-[519px]">Kami menyediakan fitur chat dengan dokter dan AI. Jika Anda memiliki pertanyaan umum, AI akan menjawabnya. Namun, jika pertanyaannya sudah serius atau bersifat medis, dokter yang akan menjawabnya.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}