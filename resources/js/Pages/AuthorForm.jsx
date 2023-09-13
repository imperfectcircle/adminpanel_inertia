import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function AuthorForm({ auth, author }) {
    const { data, setData, post, put, processing, errors } = useForm(
        author
            ? {
                  id: author.id,
                  first_name: author.first_name,
                  last_name: author.last_name,
              }
            : {
                  id: null,
                  first_name: "",
                  last_name: "",
              }
    );

    const submit = (event) => {
        event.preventDefault();
        if (author) {
            put(route("authors.update", author));
            return;
        }
        post(route("authors.store"));
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            {author ? (
                <>
                    <Head title="Modifica Autore | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Stai modificando l'autore {author.first_name}{" "}
                        {author.last_name}
                    </h1>
                </>
            ) : (
                <>
                    <Head title="Crea Autore | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Nuovo Autore
                    </h1>
                </>
            )}

            <form
                className="mt-10 p-10 rounded-lg bg-white shadow-lg"
                onSubmit={submit}
            >
                <div>
                    <InputLabel
                        className={`text-xl ${
                            errors.first_name ? "text-red-500" : ""
                        }`}
                        htmlFor="first_name"
                        value="Nome"
                    />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className={`mt-1 block w-full ${
                            errors.first_name ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData("first_name", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.first_name}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.last_name ? "text-red-500" : ""
                        }`}
                        htmlFor="last_name"
                        value="Cognome"
                    />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className={`mt-1 block w-full ${
                            errors.last_name ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData("last_name", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.last_name}
                    />
                </div>

                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 text-[20px] px-6 py-3 bg-sky-400 hover:bg-sky-500"
                        disabled={processing}
                    >
                        {author ? "Modifica Autore" : "Crea Autore"}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
