import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Accedi" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nome Utente"
                        className={`text-xl ${
                            errors.name ? "text-red-500" : ""
                        }`}
                    />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className={`mt-1 block w-full ${
                            errors.name ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="username"
                        isFocused={true}
                        placeholder="Nome Utente"
                        onChange={(e) => setData("name", e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className={`text-xl ${
                            errors.name ? "text-red-500" : ""
                        }`}
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full ${
                            errors.name ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-gray-600">Ricordami</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton
                        className="ml-4 bg-sky-400 hover:bg-sky-500"
                        disabled={processing}
                    >
                        Accedi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
