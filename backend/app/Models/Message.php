<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id', 'technician_id', 'sent_by_user'];

public function user() {
    return $this->belongsTo(User::class, 'user_id');
}

public function technician() {
    return $this->belongsTo(Technician::class, 'technician_id');
}

}
