import { useState } from "react";
import { useMenuVisibility } from "@/Hooks/useMenuVisibility";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ComicForm({ auth, comic, authors, selectedAuthor }) {
    const [clickedAuthor, setClickedAuthor] = useState(null);
    const [menuIsVisible, toggleMenuVisibility] = useMenuVisibility();
    const { data, setData, post, put, processing, errors } = useForm(
        comic
            ? {
                  id: comic.id,
                  title: comic.title,
                  description: comic.description,
                  year: comic.year,
                  price: comic.price,
                  author_id: comic.author_id,
              }
            : {
                  id: "",
                  title: "",
                  description: "",
                  year: "",
                  price: "",
                  author_id: null,
              }
    );

    const submit = (event) => {
        event.preventDefault();
        if (comic) {
            put(route("comics.update", comic));
            return;
        }
        post(route("comics.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {comic ? (
                <>
                    <Head title="Modifica Manga | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Stai modificando il manga {comic.title}
                    </h1>
                </>
            ) : (
                <>
                    <Head title="Crea Manga | Pannello di Gestione" />
                    <h1 className="text-center mt-5 pb-5 text-4xl font-bold">
                        Nuovo Manga
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
                            errors.title ? "text-red-500" : ""
                        }`}
                        htmlFor="title"
                        value="Titolo"
                    />

                    <TextInput
                        id="title"
                        name="title"
                        value={data.title}
                        className={`mt-1 block w-full ${
                            errors.title ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData("title", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.title}
                    />
                </div>

                {/* Dropdown scelta autore */}
                <div className="flex items-center gap-5 mt-5">
                    <div onClick={toggleMenuVisibility}>
                        <div className="relative flex items-center space-x-3">
                            <span className="cursor-pointer rounded-lg bg-sky-400 px-5 py-2">
                                <p className="flex items-center text-white">
                                    Autore
                                    {menuIsVisible && (
                                        <RiArrowUpSLine className="ml-3" />
                                    )}
                                    {!menuIsVisible && (
                                        <RiArrowDownSLine className="ml-3" />
                                    )}
                                </p>
                            </span>
                        </div>
                        <AnimatePresence>
                            {menuIsVisible && (
                                <motion.div
                                    className="dropdown-container absolute z-10 mt-1 flex w-fit flex-col items-center justify-center rounded-lg bg-slate-300 shadow-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {authors.map((author) => (
                                        <div
                                            key={author.id}
                                            className="w-full hover:bg-slate-400"
                                        >
                                            <p
                                                className="cursor-pointer p-2 "
                                                onClick={() => {
                                                    setData(
                                                        "author_id",
                                                        author.id
                                                    );
                                                    setClickedAuthor(author);
                                                }}
                                            >
                                                {`${author.first_name} ${author.last_name}`}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <InputError
                            className="text-xl mt-2"
                            message={errors.author_id}
                        />
                    </div>
                    <p>
                        {clickedAuthor
                            ? `${clickedAuthor.first_name} ${clickedAuthor.last_name}`
                            : selectedAuthor
                            ? `${selectedAuthor.first_name} ${selectedAuthor.last_name}`
                            : ""}
                    </p>
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.description ? "text-red-500" : ""
                        }`}
                        htmlFor="description"
                        value="Sinossi"
                    />

                    <textarea
                        rows="10"
                        className={`w-full text-xl mt-1 block resize-none rounded-md shadow-lg ${
                            errors.description ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={(ev) =>
                            setData("description", ev.target.value)
                        }
                    >
                        {data.description}
                    </textarea>

                    <InputError
                        className="text-xl mt-2"
                        message={errors.description}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.year ? "text-red-500" : ""
                        }`}
                        htmlFor="year"
                        value="Anno di pubblicazione"
                    />

                    <TextInput
                        id="year"
                        name="year"
                        value={data.year}
                        className={`mt-1 block w-full ${
                            errors.year ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData("year", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.year}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        className={`text-xl ${
                            errors.price ? "text-red-500" : ""
                        }`}
                        htmlFor="price"
                        value="Prezzo al Volume"
                    />

                    <TextInput
                        id="price"
                        name="price"
                        value={data.price}
                        className={`mt-1 block w-full ${
                            errors.price ? "border-red-500" : ""
                        } focus:bg-emerald-200`}
                        autoComplete="off"
                        onChange={(event) =>
                            setData("price", event.target.value)
                        }
                        required
                    />

                    <InputError
                        className="text-xl mt-2"
                        message={errors.price}
                    />
                </div>

                <div className="mt-4 text-center">
                    <PrimaryButton
                        className="ml-4 mt-5 text-[20px] px-6 py-3 bg-sky-400 hover:bg-sky-500"
                        disabled={processing}
                    >
                        {comic ? "Modifica Manga" : "Crea Manga"}
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
