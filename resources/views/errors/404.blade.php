<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404 - Pagina non trovata</title>
    @vite(['resources/css/app.css'])
</head>
<body>
    <div class="font-montserrat h-screen bg-[#3498DB] p-10 text-white">
        <h1 class="mb-5 text-[30vh]">:(</h1>
        <h2 class="mb-10 text-2xl">
            Si è verificato un errore <span class="text-8xl">404</span>,
            Pagina non trovata, controlla l&apos;indirizzo e prova di nuovo.
        </h2>

        <a
            class="px-5 py-2 text-xl transition-all duration-200 hover:rounded-md hover:bg-white hover:text-[#3498DB]"
            href="/dashboard"
        >
            Torna indietro
        </a>
    </div>
</body>
</html>