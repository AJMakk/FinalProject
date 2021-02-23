<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','startDate','endDate','location','user_id','technician_id','approved','rated'
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
