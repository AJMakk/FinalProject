<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'startDate','endDate','location','user_id','technician_id'
    ];

    protected $hidden = ['timestamp'];

    public function technician()
    {
        return $this->belongsTo(Technician::class, 'technician_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
