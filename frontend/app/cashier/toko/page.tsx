// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { IMenu } from "@/app/types";
// import { getCookies } from "../../../lib/client-cookies";
// import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
// import { get } from "../../../lib/bridge";
// import { AlertToko } from "@/components/alert";
// import Image from "next/image";
// import AddOrder from "./addOrder";
// import Search from "./search";
// import { ButtonPrimary } from "@/components/button";
// import { IoMdClose } from "react-icons/io";

// const OrderPage = () => {

//     const searchParams = useSearchParams();
//     const search = searchParams.get("search") || "";
//     const [menu, setMenu] = useState<IMenu[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({});
//     const [order, setOrder] = useState(false)

//     const handleOrder = () => {
//         setOrder(!order)
//     }

//     const getMenu = async () => {
//         try {
//             const TOKEN = getCookies("token") || "";
//             const url = `${BASE_API_URL}/menu?search=${search}`;
//             const { data } = await get(url, TOKEN);
//             if ((data as { status: boolean; data: IMenu[] }).status) {
//                 setMenu((data as { status: boolean; data: IMenu[] }).data);
//             }
//         } catch (error) {
//             console.error("Error getmenu menu:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getMenu();
//     }, [search]);

//     const updateQty = (id: number, increment: boolean) => {
//         setOrderQty((prevQty) => {
//             const currentQty = prevQty[id] || 0;
//             const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
//             return { ...prevQty, [id]: newQty };
//         });
//     };

//     const totalTransaction = menu.reduce((total, item) => {
//         const qty = orderQty[item.id] || 0;
//         return total + qty * item.price;
//     }, 0);

//     const selectedOrders = Object.keys(orderQty)
//         .filter((id) => orderQty[Number(id)] > 0)
//         .map((id) => {
//             const menuItem = menu.find((item) => item.id === Number(id));
//             return {
//                 id: Number(id),
//                 name: menuItem?.name || "Unknown",
//                 qty: orderQty[Number(id)],
//                 price: menuItem?.price || 0,
//             };
//         });

//     const category = (cat: string): React.ReactNode => {
//         if (cat === "FOOD") {
//             return <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Food</span>;
//         }
//         if (cat === "SNACK") {
//             return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Snack</span>;
//         }
//         return <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Drink</span>;
//     };



//     return (
//         <div>
//             <div className="mt-2 rounded-lg">
//                 <div className="flex flex-col my-10 px-20">
//                     <h4 className="text-xl font-bold text-slate-900">Menu Yang Tersedia</h4>
//                     <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//                     {/* Search Bar */}
//                     <div className="flex items-center w-full max-w-md flex-grow">
//                         <Search url={`/cashier/toko`} search={search} />
//                     </div>
//                 </div>
//                 {loading ? (
//                     <p className="text-white">Loading...</p>
//                 ) : menu.length === 0 ? (
//                     <AlertToko title="Informasi">No data available</AlertToko>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
//                             {menu.map((data) => (
//                                 <div key={data.id} className="p-4 text-blackl rounded-lg flex flex-col items-center text-center">
//                                     <Image width={300} height={270} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="shadow-2xl" alt="preview" unoptimized />
//                                     <div className="flex flex-col text-white items-center bg-primary rounded-b-md py-5 w-[300px]">
//                                         <h5 className="font-bold text-lg">{data.name}</h5>
//                                         <p className="text-sm">{data.description}</p>
//                                         <span className="font-bold">Rp {data.price.toLocaleString()}</span>
//                                         <div className="mt-2">{category(data.category)}</div>
//                                         <div className="flex flex-col items-center mt-3">
//                                             <ButtonPrimary type={"button"} onClick={() => handleOrder()}>
//                                                 Tambahkan Keranjang
//                                             </ButtonPrimary>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {order && (
//                             <div className="fixed bg-black/60 backdrop-blur-sm flex items-center justify-center inset-0 z-99999">
//                                 <div className='relative bg-white shadow-lg p-6 rounded-xl w-[90%] max-w-xl'>
//                                     <button onClick={handleOrder} className='absolute top-4 right-4 text-2xl text-black hover:text-primary'>
//                                         <IoMdClose />
//                                     </button>
//                                     <div>
//                                         {selectedOrders.map((order) => {
//                                             const menuItem = menu.find((item) => item.id === order.id);
//                                             if (!menuItem) return null;
//                                             return (
//                                                 <div key={order.id} className="mb-4">
//                                                     <Image
//                                                         width={300}
//                                                         height={270}
//                                                         src={`${BASE_IMAGE_MENU}/${menuItem.picture}`}
//                                                         className="shadow-2xl rounded-lg"
//                                                         alt={`Image of ${menuItem.name}`}
//                                                         unoptimized
//                                                     />
//                                                     <div className="mt-2 text-center text-black">
//                                                         <h5 className="font-bold">{menuItem.name}</h5>
//                                                         <p>{order.qty} x Rp {menuItem.price.toLocaleString()}</p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}  
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {selectedOrders.length > 0 && (
//                             <div className="mt-6 bg-gray-700 p-4 rounded-lg text-white">
//                                 <h4 className="text-lg font-bold">Transaction Details</h4>
//                                 <ul className="text-sm">
//                                     {selectedOrders.map((order) => (
//                                         <li key={order.id} className="flex justify-between border-b py-1">
//                                             <span>{order.name} x {order.qty}</span>
//                                             <span>Rp {(order.qty * order.price).toLocaleString()}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <h4 className="text-lg font-bold mt-3">Total: Rp {totalTransaction.toLocaleString()}</h4>

//                                 <div className="mt-4">
//                                     <AddOrder orderLists={selectedOrders} />
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OrderPage;






// {selectedOrders.length > 0 && (
//                             <div className="mt-6 bg-gray-700 p-4 rounded-lg text-white">
//                                 <h4 className="text-lg font-bol d">Transaction Details</h4>
//                                 <ul className="text-sm">
//                                     {selectedOrders.map((order) => (
//                                         <li key={order.id} className="flex justify-between border-b py-1">
//                                             <span>{order.name} x {order.qty}</span>
//                                             <span>Rp {(order.qty * order.price).toLocaleString()}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <h4 className="text-lg font-bold mt-3">Total: Rp {totalTransaction.toLocaleString()}</h4>

//                                 <div className="mt-4">
//                                     <AddOrder orderLists={selectedOrders} />
//                                 </div>
//                             </div>
//                         )} 

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IMenu } from "@/app/types";
import { getCookies } from "../../../lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertToko } from "@/components/alert";
import Image from "next/image";
import AddOrder from "./addOrder";
import Search from "./search";
import { ButtonPrimary } from "@/components/button";
import { IoMdClose } from "react-icons/io";

const OrderPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const [menu, setMenu] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({});
    const [order, setOrder] = useState(false);
    const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

    const getMenu = async () => {
        try {
            const TOKEN = getCookies("token") || "";
            const url = `${BASE_API_URL}/menu?search=${search}`;
            const { data } = await get(url, TOKEN);
            if ((data as { status: boolean; data: IMenu[] }).status) {
                setMenu((data as { status: boolean; data: IMenu[] }).data);
            }
        } catch (error) {
            console.error("Error getmenu menu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMenu();
    }, [search]);

    const handleOrder = (id: number) => {
        if (!selectedOrderIds.includes(id)) {
            setSelectedOrderIds((prev) => [...prev, id]);
        }
        setOrder(true);
    };

    const updateQty = (id: number, increment: boolean) => {
        setOrderQty((prevQty) => {
            const currentQty = prevQty[id] || 0;
            const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
            return { ...prevQty, [id]: newQty };
        });
    };

    const totalTransaction = menu.reduce((total, item) => {
        const qty = orderQty[item.id] || 0;
        return total + qty * item.price;
    }, 0);

    const selectedOrders = Object.keys(orderQty)
        .filter((id) => orderQty[Number(id)] > 0)
        .map((id) => {
            const menuItem = menu.find((item) => item.id === Number(id));
            return {
                id: Number(id),
                name: menuItem?.name || "Unknown",
                qty: orderQty[Number(id)],
                price: menuItem?.price || 0,
            };
        });

    const category = (cat: string): React.ReactNode => {
        if (cat === "FOOD") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Food</span>;
        }
        if (cat === "SNACK") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Snack</span>;
        }
        return <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Drink</span>;
    };

    return (
        <div>
            <div className="mt-2 rounded-lg">
                <div className="flex flex-col my-10 px-20">
                    <h4 className="text-xl font-bold text-slate-900">Menu Yang Tersedia</h4>
                    <p className="mb-2">Silakan pilih menu yang ingin dipesan.</p>
                    <div className="flex items-center w-full max-w-md flex-grow">
                        <Search url={`/cashier/toko`} search={search} />
                    </div>
                </div>

                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : menu.length === 0 ? (
                    <AlertToko title="Informasi">No data available</AlertToko>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                            {menu.map((data) => (
                                <div key={data.id} className="p-4 text-blackl rounded-lg flex flex-col items-center text-center">
                                    <Image width={300} height={270} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="shadow-2xl" alt="preview" unoptimized />
                                    <div className="flex flex-col text-white items-center bg-primary rounded-b-md py-5 w-[300px]">
                                        <h5 className="font-bold text-lg">{data.name}</h5>
                                        <p className="text-sm">{data.description}</p>
                                        <span className="font-bold">Rp {data.price.toLocaleString()}</span>
                                        <div className="mt-2">{category(data.category)}</div>
                                        <div className="flex flex-col items-center mt-3">
                                            <ButtonPrimary type="button" onClick={() => handleOrder(data.id)}>
                                                Tambahkan Keranjang
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {order && (
                            <div className="fixed bg-black/60 backdrop-blur-sm flex items-center justify-center inset-0 z-99999">
                                <div className="relative bg-white shadow-lg p-6 rounded-xl w-[90%] max-w-xl overflow-y-auto max-h-[90vh]">
                                    <button
                                        onClick={() => {
                                            setOrder(false);
                                            setOrderQty({});
                                            setSelectedOrderIds([]);
                                        }}
                                        className="absolute top-4 right-4 text-2xl text-black hover:text-primary"
                                    >
                                        <IoMdClose />
                                    </button>
                                    <div>
                                        {menu.filter((item) => selectedOrderIds.includes(item.id)).map((data) => (
                                            <div key={data.id} className="mb-6 border-b pb-4">
                                                <Image
                                                    width={300}
                                                    height={270}
                                                    src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                                    className="shadow-2xl rounded-lg"
                                                    alt="preview"
                                                    unoptimized
                                                />
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col py-5">
                                                        <h5 className="font-bold text-lg mt-2">{data.name}</h5>
                                                        <p className="text-sm">{data.description}</p>
                                                        <span className="font-bold block mt-1">Rp {data.price.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            className="bg-red-500 px-2 py-1 rounded-md text-white"
                                                            onClick={() => updateQty(data.id, false)}
                                                            disabled={orderQty[data.id] <= 0}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-lg text-primary">{orderQty[data.id] || 0}</span>
                                                        <button
                                                            className="bg-green-500 px-2 py-1 rounded-md text-white"
                                                            onClick={() => updateQty(data.id, true)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderPage;

