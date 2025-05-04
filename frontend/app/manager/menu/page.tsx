import { IMenu } from "../../../app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image"
import Search from "./search";
import AddMenu from "./addMenu";
import EditMenu from "./editMenu";
import DeleteMenu from "./deleteMenu";

interface ApiResponse {
    status: boolean;
    data: IMenu[];
}

const getMenu = async (search: string): Promise<IMenu[]> => {
    try {
        const TOKEN = getCookies("token")
        const url = `${BASE_API_URL}/menu?search=${search}`
        const response = await get(url, await TOKEN);
        const data = response.data as ApiResponse;
        let result: IMenu[] = []
        if (data.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}
const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const search = searchParams.search ? searchParams.search.toString() : ``
  const menu: IMenu[] = await getMenu(search)

  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Food
      </span>
    }
    if (cat === "SNACK") {
      return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
        Snack
      </span>
    }
    return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
      Drink
    </span>
  }

  return (
    <div>
      <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold mb-2 text-white">Menu Data</h4>
        <p className="text-sm text-secondary mb-4">
          This page displays menu data, allowing menus to view details,
          search, and manage menu items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md flex-grow">
            <Search url={`/manager/menu`} search={search} />
          </div>
          {/* Add Menu Button */}
          <div className="ml-4">
            <AddMenu />
          </div>
        </div>
        {
          menu.length == 0 ?
            <AlertInfo title="informasi">
              No data Available
            </AlertInfo>
            :
            <div className="m-2">
              {menu.map((data, index) => (
                <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                  <div className="w-full md:w-1/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Picture</small><br />
                    <Image width={40} height={40} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
                  </div>
                  <div className="w-full md:w-2/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Name</small> <br />
                    {data.name}
                  </div>
                  <div className="w-full md:w-1/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Price</small> <br />
                    {data.price}
                  </div>
                  <div className="w-full md:w-5/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Description</small> <br />
                    {data.description}
                  </div>
                  <div className="w-full md:w-1/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Category</small> <br />
                    {category(data.category)}
                  </div>   
                  <div className="w-full md:w-2/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Action</small><br />
                    <div className="flex gap-1">
                      <EditMenu selectedMenu={data} />
                      <DeleteMenu selectedMenu={data} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }

      </div> 
    </div>
  )
}
export default MenuPage

// import { IMenu } from "@/app/types";
// import { getCookies } from "@/lib/server-cookies";
// import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
// import { get } from "@/lib/bridge";
// import Image from 'next/image';
// import Link from "next/link";

// // Match exactly with your Prisma enum
// type MenuCategory = 'FOOD' | 'DRINK' | 'SNACK';

// interface ApiResponse {
//     status: boolean;
//     data: IMenu[];
// }

// const getMenu = async (search: string, category: string): Promise<IMenu[]> => {
//     try {
//         const TOKEN = await getCookies("token");
//         let url = `${BASE_API_URL}/menu?search=${encodeURIComponent(search)}`;
        
//         // Only add category if it's a valid enum value
//         if (category && category !== "ALL" && ['FOOD', 'DRINK', 'SNACK'].includes(category)) {
//             url += `&category=${category}`;
//         }
        
//         const response = await get(url, TOKEN);
//         const data = response.data as ApiResponse;
//         return data.status ? [...data.data] : [];
//     } catch (error) {
//         console.error("Error fetching menu:", error);
//         return [];
//     }
// };

// const MenuPage = async ({ 
//     searchParams 
// }: { 
//     searchParams: { 
//         search?: string | string[];
//         category?: string | string[];
//     } 
// }) => {
//     // Properly await and type the searchParams
//     const search = Array.isArray(searchParams.search) 
//         ? searchParams.search[0] || ''
//         : searchParams.search || '';

//     const categoryParam = Array.isArray(searchParams.category) 
//         ? searchParams.category[0] || ''
//         : searchParams.category || '';
    
//     // Validate against Prisma enum values
//     const validCategories: MenuCategory[] = ['FOOD', 'DRINK', 'SNACK'];
//     const category = validCategories.includes(categoryParam as MenuCategory) 
//         ? categoryParam 
//         : 'ALL';

//     const menu = await getMenu(search, category === 'ALL' ? '' : category);

//     return (
//         <div className='py-10 dark:bg-slate-900 dark:text-white min-h-dvh'>
//             <div className='container'>
//                 <div className='text-center mb-20 max-w-[400px] mx-auto font-Lilita_One'>
//                     <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
//                         Our Menu
//                     </p>
//                     <h1 className='text-3xl font-bold'>Menu</h1>
//                     <p className='text-xs text-gray-400'>
//                         Choose from our delicious selection
//                     </p>
//                 </div>

//                 {/* Category Filter */}
//                 <div className="flex justify-center gap-4 my-8 flex-wrap">
//                     {['ALL', ...validCategories].map((cat) => (
//                         <Link
//                             key={cat}
//                             href={{
//                                 pathname: '/manager/menu',
//                                 query: { 
//                                     ...(search && { search }),
//                                     ...(cat !== 'ALL' && { category: cat })
//                                 }
//                             }}
//                             className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
//                                 category === cat || (cat === 'ALL' && !category)
//                                     ? 'bg-primary text-white'
//                                     : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
//                             }`}
//                         >
//                             {cat.charAt(0) + cat.slice(1).toLowerCase()}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Menu Items */}
//                 <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-y-24 place-items-center px-4 py-16'>
//                     {menu.map((item) => (
//                         <div
//                             key={item.id}
//                             className='w-full max-w-72 group rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary hover:text-white duration-300 p-5 shadow-xl flex flex-col items-center'
//                         >
//                             <div className='relative w-40 h-40 mb-4'>
//                                 <Image
//                                     src={`${BASE_IMAGE_MENU}/${item.picture}`}
//                                     alt={item.name}
//                                     fill
//                                     className='object-contain group-hover:scale-110 transition-transform'
//                                     unoptimized
//                                 />
//                             </div>
//                             <div className='text-center'>
//                                 <h3 className='text-xl font-bold'>{item.name}</h3>
//                                 <p className='text-sm text-gray-500 group-hover:text-white'>{item.description}</p>
//                                 <p className='text-xl my-3'>Rp{item.price}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MenuPage;





