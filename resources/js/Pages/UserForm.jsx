import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import PasswordInput from "@/Components/PasswordInput";

export default function UserForm({ auth, user }) {
    const { data, setData, post, put, processing, errors, reset } = useForm(
        user
            ? {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  password: user.password,
                  password_confirmation: "",
              }
            : {
                  name: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
              }
    );

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if (user) {
            put(`/users/update/${user.id}`);
            return;
        }
        post(route("users.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {user ? (
                <>
                    <Head title="Modifica Utente | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Stai modificando l'utente: {user.name}
                    </h1>
                </>
            ) : (
                <>
                    <Head title="Crea Utente | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Nuovo Utente
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
                            errors.name ? "text-red-500" : ""
                        }`}
                        htmlFor="name"
                        value="Nome Utente"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={`mt-1 block w-full ${
                            errors.name ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="username"
                        onChange={(event) =>
                            setData("name", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.name}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.email ? "text-red-500" : ""
                        }`}
                        htmlFor="email"
                        value="Indirizzo Email"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full ${
                            errors.email ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="email"
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.email}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.password ? "text-red-500" : ""
                        }`}
                        htmlFor="password"
                        value="Password"
                    />

                    <PasswordInput
                        handleChange={(event) => {
                            setData("password", event.target.value);
                        }}
                        autoComplete="new-password"
                        placeholder=""
                        className={`${
                            errors.password ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.password}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.password_confirmation ? "text-red-500" : ""
                        }`}
                        htmlFor="password_confirmation"
                        value="Conferma Password"
                    />

                    <PasswordInput
                        handleChange={(event) => {
                            setData(
                                "password_confirmation",
                                event.target.value
                            );
                        }}
                        autoComplete="new-password"
                        placeholder=""
                        className={`${
                            errors.password_confirmation ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.password_confirmation}
                    />
                </div>

                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 text-[20px] px-6 py-3 bg-sky-400 hover:bg-sky-500"
                        disabled={processing}
                    >
                        {user ? "Modifica Utente" : "Crea Utente"}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
