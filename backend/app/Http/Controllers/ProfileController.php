<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Technician;
use App\Models\City;

use App\Http\Resources\UserResource;
use App\Http\Resources\TechnicianResource;
use App\Models\Category;

class ProfileController extends Controller
{
    public function userProfile(Request $request)
    {
        $user = User::find($request->id);

        $city = City::find($user -> city_id) ;

        $cityName = $city->city;
        $user->city_id = $cityName;

        return response (['userInfo' => UserResource::make($user), 'message' => 'Retrieved successfully'], 200);
    }


    public function technicianProfile(Request $request)
    {
        $technician = Technician::find($request->id);

        $city = City::find($technician -> city_id);
        $category = Category::find($technician -> category_id);

        $cityName = $city->city;
        $categoryName = $category->name;

        $technician->city_id = $cityName;
        $technician->category_id = $categoryName;

        return response (['technicianInfo' => TechnicianResource::make($technician), 'message' => 'Retrieved successfully'], 200);
    }
}
