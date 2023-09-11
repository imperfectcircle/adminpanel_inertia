import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function OrderDetails({ auth, order }) {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (order.order_items) {
            const items = order.order_items.split(";");
            setOrderItems(items);
        }
    }, [order]);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={`Dettaglio ordine #${order.id} | Pannello di Gestione`}
            />
            <h1 className="mb-5 text-center text-4xl">
                Dettaglio ordine n° {order.id}
            </h1>
            <div className="space-y-5">
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Nome</p>
                    <p className="text-xl first-letter:uppercase">
                        {order.first_name}
                    </p>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Cognome</p>
                    <p className="text-xl first-letter:uppercase">
                        {order.last_name}
                    </p>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Email di contatto</p>
                    <a
                        href={`mailto:${order.email}`}
                        className="text-xl text-sky-600"
                    >
                        {order.email}
                    </a>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Articoli ordine</p>
                    {orderItems.map((item, index) => (
                        <p
                            key={index}
                            className="text-xl first-letter:uppercase"
                        >
                            {item}
                        </p>
                    ))}
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Totale</p>
                    <p className="text-xl first-letter:uppercase">
                        {order.amount} €
                    </p>
                </div>
                <div
                    className={`w-full space-y-2 rounded-lg p-5 shadow-lg ${
                        order.state === "pagato"
                            ? "bg-sky-400 text-white"
                            : "bg-yellow-300 text-black"
                    }`}
                >
                    <p>Stato</p>
                    <p className="text-xl first-letter:uppercase">
                        {order.state}
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
