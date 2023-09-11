<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Comic;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $statistics = [
            'countUsers' => User::count(),
            'countOrders' => Order::count(),
            'countComics' => Comic::count(),
            'countAuthors' => Author::count(),
        ];

        $lastOrders = Order::latest()->take(5)->get()->map(function ($order) {
                $order->formatted_created_at = $order->created_at->format('Y-m-d H:i:s');
                return $order;
            });;

        return Inertia::render('Dashboard', compact('statistics', 'lastOrders'));
    }
}
