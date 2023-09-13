<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use Inertia\Inertia;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = Author::with('comics')
            ->orderBy('id', 'desc')
            ->get();

            return Inertia::render('Authors', compact('authors'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AuthorForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request)
    {
        $data = $request->validated();
        Author::create($data);

        return to_route('authors.index')->with('message', 'Autore creato con successo');
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        $comics = $author->comics;
        return Inertia::render('AuthorDetails', compact('author', 'comics'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Author $author)
    {
        return Inertia::render('AuthorForm', compact('author'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        $data = $request->validated();
        $author->update($data);
        $authorName = $author->first_name;
        $authorLastName = $author->last_name;

        return to_route('authors.index')->with('message', 'L\'autore ' .$authorName. ' ' .$authorLastName. ' è stato aggiornato con successo.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        $authorName = $author->first_name;
        $authorLastName = $author->last_name;
        $author->comics()->delete();
        $author->delete();

        return redirect(route('authors.index'), 303)->with('message', 'L\'autore ' .$authorName. ' ' .$authorLastName. ' è stato rimosso con successo.');
    }
}
