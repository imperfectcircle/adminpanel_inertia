import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function OrderForm({ auth, order }) {
    const { data, setData, post, put, processing, errors } = useForm(
        order
            ? {
                  id: order.id,
                  first_name: order.first_name,
                  last_name: order.last_name,
                  order_items: order.order_items,
                  email: order.email,
                  amount: order.amount,
                  state: order.state,
              }
            : {
                  id: null,
                  first_name: "",
                  last_name: "",
                  order_items: "",
                  email: "",
                  amount: "",
                  state: "",
              }
    );

    const submit = (event) => {
        event.preventDefault();
        if (order) {
            put(route("orders.update", order));
            return;
        }
        post(route("orders.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {order ? (
                <>
                    <Head title="Modifica Ordine | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Stai modificando l'ordine #{order.id}
                    </h1>
                </>
            ) : (
                <>
                    <Head title="Crea ordine | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Nuovo Ordine
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
                        value="Nome Cliente"
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
                        value="Cognome Cliente"
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

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.order_items ? "text-red-500" : ""
                        }`}
                        htmlFor="order_items"
                        value="Ordine (Separa gli elementi con il ; )"
                    />

                    <textarea
                        rows="10"
                        className={`w-full text-xl mt-1 block resize-none rounded-md shadow-lg ${
                            errors.order_items ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        name="order_items"
                        id="order_items"
                        value={data.order_items}
                        onChange={(ev) =>
                            setData("order_items", ev.target.value)
                        }
                    >
                        {data.order_items}
                    </textarea>

                    <InputError
                        className="text-xl mt-2"
                        message={errors.order_items}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.email ? "text-red-500" : ""
                        }`}
                        htmlFor="email"
                        value="Email di Contatto"
                    />

                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        className={`mt-1 block w-full focus:bg-emerald-200 ${
                            errors.email ? "border-red-500" : ""
                        }`}
                        autoComplete="off"
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
                            errors.amount ? "text-red-500" : ""
                        }`}
                        htmlFor="amount"
                        value="Totale (es. 10,50)"
                    />

                    <TextInput
                        id="amount"
                        name="amount"
                        value={data.amount}
                        className={`mt-1 block w-full ${
                            errors.amount ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData("amount", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.amount}
                    />
                </div>

                <div className="mt-4 space-x-2">
                    <div className="flex space-x-5">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="state"
                                id="pagato"
                                value="pagato"
                                className={`${
                                    errors.state ? "border-red-500" : ""
                                }`}
                                checked={
                                    data.state === "pagato" ? "checked" : null
                                }
                                onChange={(ev) =>
                                    setData("state", ev.target.value)
                                }
                            />
                            <label
                                className={`text-xl ${
                                    errors.state ? "text-red-500" : ""
                                }`}
                                htmlFor="pagato"
                            >
                                Pagato
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="state"
                                id="non pagato"
                                value="non pagato"
                                className={`${
                                    errors.state ? "border-red-500" : ""
                                }`}
                                checked={
                                    data.state === "non pagato"
                                        ? "checked"
                                        : null
                                }
                                onChange={(ev) =>
                                    setData("state", ev.target.value)
                                }
                            />
                            <label
                                className={`text-xl ${
                                    errors.state ? "text-red-500" : ""
                                }`}
                                htmlFor="non pagato"
                            >
                                Non Pagato
                            </label>
                        </div>
                    </div>

                    <InputError
                        className="text-xl mt-2"
                        message={errors.state}
                    />
                </div>

                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 text-[20px] px-6 py-3 bg-sky-400 hover:bg-sky-500"
                        disabled={processing}
                    >
                        {order ? "Modifica Ordine" : "Crea Ordine"}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
