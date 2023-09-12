import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ComicDetails({ auth, comic, author }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Dettaglio ${comic.title} | Pannello di Gestione`} />
            <h1 className="mb-5 text-center text-4xl">
                Dettaglio {comic.title}
            </h1>
            <div className="space-y-5">
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Titolo</p>
                    <p className="text-xl first-letter:uppercase">
                        {comic.title}
                    </p>
                </div>

                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Autore</p>
                    <Link
                        href={route("authors.show", author)}
                        className="mr-3 text-xl text-sky-600 first-letter:uppercase"
                    >
                        {`${author.first_name} ${author.last_name}`}
                    </Link>
                </div>

                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Sinossi</p>
                    <p className="text-xl first-letter:uppercase">
                        {comic.description}
                    </p>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Anno</p>
                    <p className="text-xl first-letter:uppercase">
                        {comic.year}
                    </p>
                </div>
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Prezzo a volume</p>
                    <p className="text-xl first-letter:uppercase">
                        {comic.price} €
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
