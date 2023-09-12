import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { inputHandler } from "@/Utilities/inputHandler";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Comics({ auth, comics }) {
    const [inputText, setInputText] = useState("");

    const filteredData = comics.filter((comic) => {
        if (inputText === "") {
            return comic;
        } else {
            const fullName =
                `${comic.author.first_name} ${comic.author.last_name}`.toLowerCase();
            const fullNameReverse =
                `${comic.author.last_name} ${comic.author.first_name}`.toLowerCase();
            return (
                comic.title.toLowerCase().includes(inputText) ||
                fullName.includes(inputText) ||
                fullNameReverse.includes(inputText)
            );
        }
    });

    const confirmationHandler = (title) => {
        const confirmed = window.confirm(
            `Stai per eliminare il manga ${title}. Sei sicuro di voler procedere?`
        );
        if (!confirmed) {
            return false;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lista Manga | Pannello di Gestione" />
            <div className="text-center">
                <h1 className="text-4xl font-bold">Manga</h1>
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
                    placeholder="Cerca per Titolo o Autore"
                    onChange={(event) => inputHandler(event, setInputText)}
                />
            </div>

            <div className="mt-5 rounded-lg bg-white p-5 shadow-lg">
                <table className="w-full border-separate border-spacing-4">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Titolo</th>
                            <th>Autore</th>
                            <th>Anno</th>
                            <th>Prezzo €</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    {inputText ? (
                        <tbody>
                            {filteredData.map((el) => (
                                <tr className="text-center" key={el.id}>
                                    <td>{el.id}</td>
                                    <td className="first-letter:uppercase">
                                        <Link
                                            className="text-sky-600"
                                            href={route("comics.show", el)}
                                        >
                                            {el.title}
                                        </Link>
                                    </td>
                                    <td className="first-letter:uppercase">
                                        <Link
                                            className="text-sky-600"
                                            href={route(
                                                "authors.show",
                                                el.author.id
                                            )}
                                        >
                                            {`${el.author.first_name} ${el.author.last_name}`}
                                        </Link>
                                    </td>
                                    <td>{el.year}</td>
                                    <td>{el.price}</td>

                                    <td className="space-x-3 px-6 py-3">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            onBefore={() => console.log(el)}
                                            href={route("comics.edit", el)}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(el.title)
                                            }
                                            href={route("comics.destroy", el)}
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
                                            Manga non trovato
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    ) : (
                        <tbody>
                            {comics.map((comic) => (
                                <tr className="text-center" key={comic.id}>
                                    <td>{comic.id}</td>
                                    <td>
                                        <Link
                                            className="text-sky-600 "
                                            href={route("comics.show", comic)}
                                        >
                                            {comic.title}
                                        </Link>
                                    </td>
                                    <td className="first-letter:uppercase">
                                        <Link
                                            className="text-sky-600 "
                                            href={route(
                                                "authors.show",
                                                comic.author.id
                                            )}
                                        >
                                            {`${comic.author.first_name} ${comic.author.last_name}`}
                                        </Link>
                                    </td>
                                    <td>{comic.year}</td>
                                    <td>{comic.price}</td>

                                    <td className="space-x-3 px-6 py-3">
                                        <Link
                                            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-emerald-600"
                                            href={route("comics.edit", comic)}
                                        >
                                            Modifica
                                        </Link>
                                        <Link
                                            className="rounded-lg bg-red-500 px-5 py-2 text-white shadow-lg transition-all duration-150 hover:bg-red-600"
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirmationHandler(comic.title)
                                            }
                                            href={route(
                                                "comics.destroy",
                                                comic
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
