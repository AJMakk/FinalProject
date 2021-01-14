<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\AppointmentWasCancelled;
use App\Models\Appointment;
use App\Http\Resources\AppointmentResource;



class AppointmentsController extends Controller
{
     /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('technician_id'))
        {
            $appointments = Appointment::where('technician_id',$request->technician_id)->get();

        }else
        {
            $appointments = Appointment::where('user_id',$request->user_id)->get();
        }

        return response (['appointments' => AppointmentResource::collection($appointments), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'startDate' => 'required',
            'endDate' => 'required',
            'location'=> 'required',
            'user_id'=>'required|max:100',
            'technician_id'=>'required|max:100'
        ]);

        $appointment = Appointment::create($validatedData);

        return response(['appointment' => new AppointmentResource($appointment), 'message' => 'Created successfully'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
        return response(['appointment' => new AppointmentResource($appointment), 'message' => 'Retrieved Successfully'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        $appointment->update($request->all());

        return response([ 'appointment' => new AppointmentResource($appointment), 'message' => 'Retrieved Successfuly'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        event(new AppointmentWasCancelled($appointment));

        $appointment->delete();

        return  response(['message' => 'Deleted']);
    }
}


