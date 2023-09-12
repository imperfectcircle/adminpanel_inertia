<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use App\Http\Requests\StoreComicRequest;
use App\Http\Requests\UpdateComicRequest;
use App\Models\Author;
use Inertia\Inertia;

class ComicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comics = Comic::with('author')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Comics', compact('comics'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $authors = Author::query()
            ->orderBy('id', 'desc')
            ->get();
        return Inertia::render('ComicForm', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComicRequest $request)
    {
        $data = $request->validated();
        Comic::create($data);

        return to_route('comics.index')->with('message', 'Manga creato con successo.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comic $comic)
    {
        $author = $comic->author;
        return Inertia::render('ComicDetails', compact('comic', 'author'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comic $comic)
    {
        $authors = Author::query()
            ->orderBy('id', 'desc')
            ->get();
        $selectedAuthor = $comic->author;        
        return Inertia::render('ComicForm', compact('comic', 'authors', 'selectedAuthor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComicRequest $request, Comic $comic)
    {
        $data = $request->validated();
        $comic->update($data);
        $comicTitle = $comic->title;

        return to_route('comics.index')->with('message', 'Il manga ' .$comicTitle. ' è stato aggiornato con successo.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comic $comic)
    {
        $comicTitle = $comic->title;
        $comic->delete();

        return redirect(route('comics.index'), 303)->with('message', 'Il manga ' .$comicTitle. ' è stato rimosso con successo.');
    }
}
