import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { inputHandler } from "@/Utilities/inputHandler";
import ComicsDropdown from "@/Components/ComicsDropdown";

export default function Authors({ auth, authors }) {
    const [inputText, setInputText] = useState("");

    const filteredData = authors.filter((author) => {
        if (inputText === "") {
            return author;
        } else {
            const fullName =
                `${author.first_name} ${author.last_name}`.toLowerCase();
            const fullNameReverse =
                `${author.last_name} ${author.first_name}`.toLowerCase();
            return (
                fullName.includes(inputText) ||
                fullNameReverse.includes(inputText)
            );
        }
    });

    const confirmationHandler = (firstName, lastName) => {
        const confirmed = window.confirm(
            `Stai per eliminare l'autore ${firstName} ${lastName}. Verranno eliminati anche i manga ad esso collegato. Sei sicuro di voler procedere?`
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Autori | Pannello di Gestione" />
            <div className="text-center">
                <h1 className="text-4xl font-bold">Autori</h1>
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
                    placeholder="Cerca per Autore"
                    onChange={(event) => inputHandler(event, setInputText)}
                />
            </div>

            <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                <table className="w-full border-separate border-spacing-4">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Manga a Catalogo</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    {inputText ? (
                        <tbody>
                            {filteredData.map((el) => (
                                <tr className="text-center" key={el.id}>
                                    <td>
                                        <Link
                                            className="text-sky-600"
                                            href={route("authors.show", el)}
                                        >
                                            {el.id}
                                        </Link>
                                    </td>
                                    <td className="first-letter:uppercase">
                                        {el.first_name}
                                    </td>
                                    <td className="first-letter:uppercase">
                                        {el.last_name}
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <ComicsDropdown
                                                text="Manga"
                                                author={el.comics}
                                            />
                                        </div>
                                    </td>

                                    <td className="space-x-3 px-6 py-3">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route("authors.edit", el)}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(
                                                    el.first_name,
                                                    el.last_name
                                                )
                                            }
                                            href={route("authors.destroy", el)}
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
                                            Autore non trovato
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    ) : (
                        <tbody>
                            {authors.map((author) => (
                                <tr className="text-center" key={author.id}>
                                    <td>
                                        <Link
                                            className="text-sky-600"
                                            to={`/authors/detail/${author.id}`}
                                        >
                                            {author.id}
                                        </Link>
                                    </td>
                                    <td className="first-letter:uppercase">
                                        {author.first_name}
                                    </td>
                                    <td className="first-letter:uppercase">
                                        {author.last_name}
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <ComicsDropdown
                                                text="Manga"
                                                author={author.comics}
                                            />
                                        </div>
                                    </td>
                                    <td className="space-x-3 px-6 py-3">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route("authors.edit", author)}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(
                                                    author.first_name,
                                                    author.last_name
                                                )
                                            }
                                            href={route(
                                                "authors.destroy",
                                                author
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
