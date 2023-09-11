<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::query()
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Orders', compact($orders));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Orders');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        Order::create($data);

        return to_route('orders.index')->with('message', 'Ordine creato con successo.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('OrderDetails', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('OrderForm', compact('order'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $data = $request->validated();
        $order->update($data);
        $orderNumber = $order->id;

        return to_route('orders.index')->with('message', 'L\'Ordine numero ' .$orderNumber. ' è stato aggiornato con successo');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $orderNumber = $order->id;
        $order->delete();

        return redirect(route('orders.index'), 303)->with('message', 'L\'Ordine numero ' .$orderNumber. ' è stato rimosso con successo.');
    }
}
