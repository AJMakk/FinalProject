<?php

namespace App\Http\Controllers;

use App\Events\AppointmentApproved;
use App\Events\AppointmentRequested;
use Illuminate\Http\Request;
use App\Events\AppointmentWasCancelled;
use App\Models\Appointment;
use App\Http\Resources\AppointmentResource;
use Carbon\Carbon;




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
            foreach ($appointments as $ap)
            {
                $ap->user;

            }
            unset($ap);

        }else
        {
            $appointments = Appointment::where('user_id',$request->user_id)->get();
        }

        return response (['appointments' => AppointmentResource::collection($appointments), 'message' => 'Retrieved successfully'], 200);
    }

    public function previousAppointments(Request $request)
    {
        $todayDate = Carbon::today();


        $appointments = Appointment::orderBy('endDate', 'desc')
        ->where('user_id',$request->user_id)
        ->where('rated',false)
        ->latest()
        ->whereDate('endDate', '<', $todayDate)
        ->get();
        foreach ($appointments as $ap)
        {
            $ap->technician;

        }
        unset($ap);


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
            'title'=>'required|max:100',
            'startDate' => 'required',
            'endDate' => 'required',
            'location'=> 'required',
            'user_id'=>'required|max:100',
            'technician_id'=>'required|max:100',
            'approved'=>'required|boolean'
        ]);

        $appointment = Appointment::create($validatedData);
        AppointmentRequested::dispatch($appointment);

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
        $appointment = Appointment::find($request->id);
        $appointment->title = $request->title;
        $appointment->startDate = $request->startDate;
        $appointment->endDate = $request->endDate;
        $appointment->location = $request->location;
        $appointment->update(); // $note->update();

        return response([ 'appointment' => new AppointmentResource($appointment), 'message' => 'Retrieved Successfuly'],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function approve(Request $request)
    {

        $appointment = Appointment::find($request->id);
        $appointment->approved = 1;
        $appointment->save();
        AppointmentApproved::dispatch($appointment);
        /* event(new AppointmentApproved($appointment)); */

        return response([ 'appointment' => new AppointmentResource($appointment), 'message' => 'Retrieved Successfuly'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $appointment = Appointment::find($request->id);
        AppointmentWasCancelled::dispatch($appointment);
        $appointment->delete();


        return  response(['message' => 'Deleted']);
    }
}


