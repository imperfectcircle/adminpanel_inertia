import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function AuthorDetails({ auth, author, comics }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head
                title={`Dettaglio ${author.first_name} ${author.last_name} | Pannello di Gestione`}
            />
            <h1 className="mb-5 text-center text-4xl">
                {`Dettaglio ${author.first_name} ${author.last_name}`}
            </h1>

            <div className="space-y-5">
                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Nome</p>
                    <p className="text-xl first-letter:uppercase">
                        {author.first_name}
                    </p>
                </div>

                <div className="w-full space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Cognome</p>
                    <p className="text-xl first-letter:uppercase">
                        {author.last_name}
                    </p>
                </div>

                <div className="flex w-full flex-col space-y-2 rounded-lg bg-gray-200 p-5 shadow-lg">
                    <p>Manga a catalogo</p>
                    {comics.map((comic) => (
                        <Link
                            href={route("comics.show", comic)}
                            key={comic.id}
                            className="mr-3 text-xl text-sky-600 first-letter:uppercase"
                        >
                            {comic.title}
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
