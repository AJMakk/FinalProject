<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Technician;
use Laravel\Passport\Passport;


class RegisterController extends Controller
{
    public function technicianApply(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|max:30',
            'last_name' => 'required|max:30',
            'city_id' => 'required|integer',
            'category_id' => 'required|integer',
            'email' => 'email|required',
            'password' => 'required|confirmed',
            'ratings' => 'required',
        ]);

        $validatedData['password'] = bcrypt($request->password);


        $technician = Technician::create($validatedData);

        /* $user->attachRole($customer); */

        $accessToken = $technician->createToken('authToken', ['technician'])->accessToken;

        return response([ 'technician' => $technician, 'access_token' => $accessToken]);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid Credentials']);
        }

        $accessToken = auth()->user()->createToken('authToken', ['technician'])->accessToken;

        return response(['technician' => auth()->user(), 'access_token' => $accessToken]);

    }

    public function logout()
    {
        $technician = auth()->user();

        if ($technician instanceof Technician) {
            $technician->token('authToken')->revoke();
        }


        return response(['message' => 'You have successfully logged out !']);



    }
}
