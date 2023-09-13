import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { inputHandler } from "@/Utilities/inputHandler";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Users({ auth, users }) {
    const [inputText, setInputText] = useState("");

    const filteredData = users.filter((user) => {
        if (inputText === "") {
            return user;
        } else {
            return (
                user.name.toLowerCase().includes(inputText) ||
                user.email.toLowerCase().includes(inputText)
            );
        }
    });

    const confirmationHandler = (username) => {
        const confirmed = window.confirm(
            `Stai per eliminare l'utente ${username}. Sei sicuro di voler procedere?`
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Utenti | Pannello di Gestione" />
            <div className="text-center">
                <h1 className="text-4xl font-bold">Utenti</h1>
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
                    placeholder="Cerca per Nome Utente o Email"
                    onChange={(event) => inputHandler(event, setInputText)}
                />
            </div>
            <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                <table className="w-full border-separate border-spacing-4">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nome Utente</th>
                            <th>Email</th>
                            <th>Creato il</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    {inputText ? (
                        <tbody>
                            {filteredData.map((el) => (
                                <tr className="text-center" key={el.id}>
                                    <td>{el.id}</td>
                                    <td className="first-letter:uppercase">
                                        {el.name}
                                    </td>
                                    <td>{el.email}</td>
                                    <td>{el.formatted_created_at}</td>
                                    <td className="space-x-3 px-6 py-3">
                                        {!(
                                            el.name === "demo" ||
                                            el.name === auth.user.name
                                        ) ? (
                                            <>
                                                <Link
                                                    className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                    href={route(
                                                        "users.edit",
                                                        el
                                                    )}
                                                >
                                                    Modifica
                                                </Link>
                                                <Link
                                                    className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() =>
                                                        confirmationHandler(
                                                            el.name
                                                        )
                                                    }
                                                    href={route(
                                                        "users.destroy",
                                                        el
                                                    )}
                                                >
                                                    Elimina
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    className="opacity-50 cursor-not-allowed rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg"
                                                    href="#"
                                                >
                                                    Modifica
                                                </Link>

                                                <button
                                                    disabled
                                                    className="opacity-50 cursor-not-allowed rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg "
                                                >
                                                    Elimina
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <p className="text-lg">
                                            Utente non trovato
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    ) : (
                        <tbody>
                            {users.map((user) => (
                                <tr className="text-center" key={user.id}>
                                    <td>{user.id}</td>
                                    <td className="first-letter:uppercase">
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.formatted_created_at}</td>
                                    <td className="space-x-3 px-6 py-3">
                                        {!(
                                            user.name === "demo" ||
                                            user.name === auth.user.name
                                        ) ? (
                                            <>
                                                <Link
                                                    className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                                    href={route(
                                                        "users.edit",
                                                        user
                                                    )}
                                                >
                                                    Modifica
                                                </Link>
                                                <Link
                                                    className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() =>
                                                        confirmationHandler(
                                                            user.name
                                                        )
                                                    }
                                                    href={route(
                                                        "users.destroy",
                                                        user
                                                    )}
                                                >
                                                    Elimina
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    className="opacity-50 cursor-not-allowed rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg"
                                                    href="#"
                                                >
                                                    Modifica
                                                </Link>

                                                <button
                                                    disabled
                                                    className="opacity-50 cursor-not-allowed rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg "
                                                >
                                                    Elimina
                                                </button>
                                            </>
                                        )}
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
