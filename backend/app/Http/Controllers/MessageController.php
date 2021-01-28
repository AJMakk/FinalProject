<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSentToUser;
use App\Events\MessageSentToTechnician;
use App\Http\Resources\MessageResource;


class MessageController extends Controller
{

    public function getOneToOneMessages(Request $request)
    {

        $messages = Message::latest()
        ->where('user_id',$request->user_id)
        ->where('technician_id',$request->technician_id)
        ->get();

        /* foreach ($messages as $mg)
        {
            $mg->user;
            $mg->technician;

        }
        unset($mg); */

        return response([ 'messages' => MessageResource::collection($messages), 'info' => 'Retrieved Successfuly'],200);
    }

     public function getUsers(Request $request)
    {

        $messages = Message::latest()
        ->where('technician_id',$request->technician_id)
        ->get();
        $users = [];
        foreach ($messages as $mg)
        {
            array_push($users, $mg->user);

        }
        unset($mg);

        $uniqueUsers = array_unique($users, SORT_REGULAR);

        /* foreach($uniqueUsers as $usr)
        {
            $usr = User::find($usr->id);
        }
        unset($usr);

        foreach($uniqueUsers as $usr)
        {
            $usr->messages;
        }
 */
        return response([ 'users' => MessageResource::collection($uniqueUsers), 'info' => 'Retrieved Successfuly'],200);
    }


    public function userStore(Request $request)
    {

        $validatedData = $request->validate([
            'content'=>'required|max:1000',
            'user_id' => 'required|max:100',
            'technician_id'=>'required|max:100',
            'sent_by_user'=>'required|boolean'
        ]);

        $message = Message::create($validatedData);

        $message->user;
        $message->technician;

        /* MessageSentToTechnician::dispatch($message); */

        broadcast(new MessageSentToTechnician($message))->toOthers();

        return response(['message' => new MessageResource($message), 'info' => 'Created successfully'], 200);
    }

    public function technicianStore(Request $request)
    {

        $validatedData = $request->validate([
            'content'=>'required|max:1000',
            'user_id' => 'required|max:100',
            'technician_id'=>'required|max:100',
            'sent_by_user'=>'required|boolean'
        ]);

        $message = Message::create($validatedData);

        $message->user;
        $message->technician;

        broadcast(new MessageSentToUser($message))->toOthers();


        return response(['message' => new MessageResource($message), 'info' => 'Created successfully'], 200);
    }




}
