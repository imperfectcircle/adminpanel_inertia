import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Orders({ auth, orders }) {
    const [inputText, setInputText] = useState("");

    const handleInput = (event) => {
        const lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = orders.filter((order) => {
        if (inputText === "") {
            return order;
        } else {
            const fullName =
                `${order.first_name} ${order.last_name}`.toLowerCase();
            const fullNameReverse =
                `${order.last_name} ${order.first_name}`.toLowerCase();
            return (
                fullName.includes(inputText) ||
                fullNameReverse.includes(inputText) ||
                order.id.toString().includes(inputText) ||
                order.email.toLowerCase().includes(inputText)
            );
        }
    });

    const confirmationHandler = (order) => {
        const confirmed = window.confirm(
            `Stai per eliminare l'ordine numero ${order}. Sei sicuro di voler procedere?`
        );
        if (!confirmed) {
            return false;
        }
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Ordini | Pannello di Gestione" />
            <div className="text-center">
                <h1 className="text-4xl font-bold">Ordini</h1>
            </div>
            <div className="my-5 text-center">
                <input
                    className={`w-1/3 rounded-md shadow-lg ${
                        filteredData.length === 0
                            ? "focus:bg-red-200"
                            : "focus:bg-emerald-100"
                    }`}
                    type="text"
                    name=""
                    id=""
                    placeholder="Cerca per Cliente, Email o Numero Ordine"
                    onChange={handleInput}
                />
            </div>

            <div className="flex w-full items-center justify-end space-x-5">
                <div className="flex">
                    <div
                        className={
                            "rounded-full border-2 border-black bg-sky-400 px-2 py-2"
                        }
                    ></div>
                    <p>&nbsp;Pagato</p>
                </div>
                <div className="flex">
                    <div
                        className={
                            "rounded-full border-2 border-black bg-yellow-300 px-2 py-2"
                        }
                    ></div>
                    <p>&nbsp;Non Pagato</p>
                </div>
            </div>

            <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                <table className="w-full border-separate border-spacing-4">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>Data Ordine</th>
                            <th>Ordine n°</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Totale €</th>
                            <th>Stato</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    {inputText ? (
                        <tbody>
                            {filteredData.map((el) => (
                                <tr className="text-center" key={el.id}>
                                    <td>{el.formatted_created_at}</td>
                                    <td>
                                        <Link
                                            className="text-sky-600"
                                            href={route("orders.show", el)}
                                        >
                                            {el.id}
                                        </Link>
                                    </td>
                                    <td className="first-letter:uppercase">
                                        {`${el.first_name} ${el.last_name}`}
                                    </td>
                                    <td>
                                        <a
                                            className="text-sky-600"
                                            href={`mailto:${el.email}`}
                                        >
                                            {el.email}
                                        </a>
                                    </td>
                                    <td>{el.amount}</td>
                                    <td>
                                        <div
                                            className={
                                                el.state === "pagato"
                                                    ? "rounded-full border-2 border-black bg-sky-400"
                                                    : "rounded-full border-2 border-black bg-yellow-300"
                                            }
                                        >
                                            .
                                        </div>
                                    </td>
                                    <td className="space-x-3 px-6 py-3">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route("orders.edit", el)}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(el.id)
                                            }
                                            href={route("orders.destroy", el)}
                                        >
                                            Elimina
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <p className="text-lg">
                                            Ordine non trovato
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    ) : (
                        <tbody>
                            {orders.map((order) => (
                                <tr className="text-center" key={order.id}>
                                    <td>{order.formatted_created_at}</td>
                                    <td>
                                        <Link
                                            className="text-sky-600"
                                            href={route("orders.show", order)}
                                        >
                                            {order.id}
                                        </Link>
                                    </td>
                                    <td className="first-letter:uppercase">
                                        {`${order.first_name} ${order.last_name}`}
                                    </td>
                                    <td>
                                        <a
                                            className="text-sky-600"
                                            href={`mailto:${order.email}`}
                                        >
                                            {order.email}
                                        </a>
                                    </td>
                                    <td>{order.amount}</td>
                                    <td>
                                        <div
                                            className={
                                                order.state === "pagato"
                                                    ? "rounded-full border-2 border-black bg-sky-400 px-2 py-2"
                                                    : "rounded-full border-2 border-black bg-yellow-300 px-2 py-2"
                                            }
                                        ></div>
                                    </td>
                                    <td className="space-x-3 px-6 py-3">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route("orders.edit", order)}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(order.id)
                                            }
                                            href={route(
                                                "orders.destroy",
                                                order
                                            )}
                                        >
                                            Elimina
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
