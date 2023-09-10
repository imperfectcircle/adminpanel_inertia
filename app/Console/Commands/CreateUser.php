<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea un nuovo utente';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->ask('Inserisci il Nome Utente');
        $email = $this->ask('Inserisci l\'email dell\' utente');
        $password = $this->ask('Inserisci la Password dell\'utente');

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);

        $this->info('Utente creato con successo!');
    }
}
