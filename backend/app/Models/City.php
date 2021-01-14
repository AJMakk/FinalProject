<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = [
        'city','country'
    ];

    protected $hidden = ['timestamp'];

    public function technicians()
    {
        return $this->hasMany(Technician::class, 'city_id');
    }

    public function users()
    {
    	return $this->hasMany(User::class, 'user_id');
    }
}
