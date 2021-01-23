<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user-api');
    }

    public function index()
    {
        return Message::with('user')->get();
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        broadcast(new MessageSent($message, $user))->toOthers();

        return [
            'message' => $message,
            'user' => $user,
        ];
    }
}
