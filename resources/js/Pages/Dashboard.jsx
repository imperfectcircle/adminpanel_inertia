import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { calculateTimeElapsed } from "@/Utilities/calculateTimeElapsed";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, statistics, lastOrders }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-4 gap-5">
                <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                    <p className="text-xl">Numero Utenti</p>
                    <Link to="/users" className="text-4xl text-sky-600">
                        <p className="pt-5">{statistics.countUsers}</p>
                    </Link>
                </div>
                <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                    <p className="text-xl">Numero Ordini</p>
                    <Link to="/orders" className="text-4xl text-sky-600">
                        <p className="pt-5">{statistics.countOrders}</p>
                    </Link>
                </div>
                <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                    <p className="text-xl">Numero Autori</p>
                    <Link to="/authors" className="text-4xl text-sky-600">
                        <p className="pt-5">{statistics.countAuthors}</p>
                    </Link>
                </div>
                <div className="space-y-5 rounded-lg bg-gray-200 p-10 text-center font-bold shadow-md">
                    <p className="text-xl">Numero Manga</p>
                    <Link to="/comics" className="text-4xl text-sky-600">
                        <p className="pt-5">{statistics.countComics}</p>
                    </Link>
                </div>
                <div className="col-span-4 rounded-lg bg-gray-200 p-10 text-center shadow-md">
                    <div className="space-y-5">
                        <p className="text-xl font-bold ">Ultimi Ordini</p>
                        {lastOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex space-x-2 text-xl"
                            >
                                <Link
                                    className="text-sky-600"
                                    href={route("orders.show", order)}
                                >
                                    Ordine #{order.id}
                                </Link>
                                <p>
                                    {calculateTimeElapsed(
                                        order.formatted_created_at
                                    ) === ""
                                        ? "Creato ora"
                                        : `Creato
                                            ${calculateTimeElapsed(
                                                order.formatted_created_at
                                            )}
                                            fa`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
