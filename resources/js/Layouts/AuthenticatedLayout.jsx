import { Link } from "@inertiajs/react";
import { useLogoutPopup } from "@/Hooks/useLogoutPopup";
import { HiUserCircle, HiChartPie, HiUser } from "react-icons/hi";
import { ImSwitch } from "react-icons/im";
import { BsFillInboxFill, BsBook, BsPenFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import Dropdown from "@/Components/Dropdown";
import FlashMessage from "@/Components/FlashMessage";

export default function AuthenticatedLayout({ user, children }) {
    const [popupIsVisible, togglePopupVisibility] = useLogoutPopup();

    return (
        <section className="min-h-screen">
            <header className="fixed z-10 flex min-h-[60px] w-full items-center justify-between bg-sky-400 p-5 shadow-lg">
                <p className="text-2xl font-bold text-white">
                    Pannello di gestione
                </p>
                <div className="relative">
                    <HiUserCircle
                        onClick={togglePopupVisibility}
                        className="h-10 w-10 text-white"
                    />
                    <AnimatePresence>
                        {popupIsVisible && (
                            <motion.div
                                className="absolute -right-0 top-10 w-[200px] rounded-lg bg-gray-200 p-5 shadow-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="pb-3 text-red-700 first-letter:uppercase">
                                    {user.name}
                                </p>

                                <Link
                                    className="flex items-center transition-all duration-150 hover:text-red-500"
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    <ImSwitch className="mr-3" />
                                    Logout
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>
            <div className="grid h-screen w-full grid-cols-3 pt-[60px] md:grid-cols-5 ">
                <aside className="min-w-fit bg-sky-400 pt-16 text-xl  text-white shadow-lg shadow-black">
                    <div className="sticky top-10 space-y-3">
                        <Link
                            className="flex items-center pl-10"
                            href={route("dashboard")}
                        >
                            <HiChartPie className="mr-3" />
                            Dashboard
                        </Link>

                        <Dropdown
                            icon={HiUser}
                            menuName="Utenti"
                            linkList="users.index"
                            listName="Lista Utenti"
                            linkNew="users.create"
                            newName="Crea Nuovo Utente"
                        />

                        <Dropdown
                            icon={BsFillInboxFill}
                            menuName="Ordini"
                            linkList="orders.index"
                            listName="Lista Ordini"
                            linkNew="orders.create"
                            newName="Crea Nuovo Ordine"
                        />

                        <Dropdown
                            icon={BsBook}
                            menuName="Manga"
                            linkList="comics.index"
                            listName="Lista Manga"
                            linkNew="comics.create"
                            newName="Aggiungi Manga"
                        />

                        <Dropdown
                            icon={BsPenFill}
                            menuName="Autori"
                            linkList="authors.index"
                            listName="Lista Autori"
                            linkNew="authors.create"
                            newName="Aggiungi Autore"
                        />
                    </div>
                </aside>
                <main className="col-span-2 p-10 md:col-span-4">
                    {children}

                    <FlashMessage />
                </main>
            </div>
        </section>
    );
}

// import { useState } from 'react';
// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link } from '@inertiajs/react';

// export default function Authenticated({ user, header, children }) {
//     const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <nav className="bg-white border-b border-gray-100">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex">
//                             <div className="shrink-0 flex items-center">
//                                 <Link href="/">
//                                     <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
//                                 </Link>
//                             </div>

//                             <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
//                                 <NavLink href={route('dashboard')} active={route().current('dashboard')}>
//                                     Dashboard
//                                 </NavLink>
//                             </div>
//                         </div>

//                         <div className="hidden sm:flex sm:items-center sm:ml-6">
//                             <div className="ml-3 relative">
//                                 <Dropdown>
//                                     <Dropdown.Trigger>
//                                         <span className="inline-flex rounded-md">
//                                             <button
//                                                 type="button"
//                                                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
//                                             >
//                                                 {user.name}

//                                                 <svg
//                                                     className="ml-2 -mr-0.5 h-4 w-4"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </span>
//                                     </Dropdown.Trigger>

//                                     <Dropdown.Content>
//                                         <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
//                                         <Dropdown.Link href={route('logout')} method="post" as="button">
//                                             Log Out
//                                         </Dropdown.Link>
//                                     </Dropdown.Content>
//                                 </Dropdown>
//                             </div>
//                         </div>

//                         <div className="-mr-2 flex items-center sm:hidden">
//                             <button
//                                 onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
//                                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
//                             >
//                                 <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                                     <path
//                                         className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                     <path
//                                         className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
//                     <div className="pt-2 pb-3 space-y-1">
//                         <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
//                             Dashboard
//                         </ResponsiveNavLink>
//                     </div>

//                     <div className="pt-4 pb-1 border-t border-gray-200">
//                         <div className="px-4">
//                             <div className="font-medium text-base text-gray-800">{user.name}</div>
//                             <div className="font-medium text-sm text-gray-500">{user.email}</div>
//                         </div>

//                         <div className="mt-3 space-y-1">
//                             <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
//                             <ResponsiveNavLink method="post" href={route('logout')} as="button">
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {header && (
//                 <header className="bg-white shadow">
//                     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
//                 </header>
//             )}

//             <main>{children}</main>
//         </div>
//     );
// }
