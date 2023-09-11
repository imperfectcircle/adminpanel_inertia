<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::query()
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($user) {
            $user->formatted_created_at = $user->created_at->format('Y-m-d H:i:s');
            return $user;
        });
            

        return Inertia::render('Users', compact('users'));
    }

    public function create() {
        return Inertia::render('UserForm');
    }

    public function store(StoreUserRequest $request) {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        User::create($data);
        
        return to_route('users.index')->with('message', 'Utente creato con successo.');
    }

    public function edit(User $user) {
        return Inertia::render('UserForm', compact('user'));
    }

    public function update(UpdateUserRequest $request, User $user) {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        
        $user->update($data);
        $userName = $user->name;

        return to_route('users.index')->with('message', 'L\'Utente ' .$userName. ' è stato aggiornato con successo.');
    }

    public function destroy(User $user) {
        $userName = $user->name;
        $user->delete();

        return redirect(route('users.index'), 303)->with('message', 'L\'Utente ' .$userName. ' è stato rimosso con successo.');
    }
}
