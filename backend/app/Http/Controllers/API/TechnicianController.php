<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use App\Http\Resources\TechnicianResource;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $technicians = Technician::all();


        foreach ($technicians as $tc)
        {
            $tc->category;
            $tc->city;

        }
        unset($tc);

        return response (['technicians' => TechnicianResource::collection($technicians), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Technician  $technician
     * @return \Illuminate\Http\Response
     */
    public function show(Technician $technician)
    {
        return response(['technician' => new TechnicianResource($technician), 'message' => 'Retrieved Successfully'], 200);
    }

    public function search(Request $request)
    {


        $names = explode(" ", $request->name);

    // Search each Name Field for any specified Name
    $technicians = Technician::where(function($query) use ($names) {
        $query->whereIn('first_name', $names);
        $query->orWhere(function($query) use ($names) {
            $query->whereIn('last_name', $names);
        });
    })->get();

        return response (['technicians' => TechnicianResource::collection($technicians), 'message' => 'Retrieved successfully'], 200);
    }
}
