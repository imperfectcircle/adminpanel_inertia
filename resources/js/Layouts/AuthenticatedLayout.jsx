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
                <aside className="min-w-fit bg-sky-400 pt-16 text-xl text-white shadow-lg shadow-black">
                    <div className="sticky top-32 space-y-3">
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
