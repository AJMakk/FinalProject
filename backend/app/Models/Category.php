<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'technician_categories';

    protected $fillable = [
        'name'
    ];

    protected $hidden = ['timestamp'];

    public function technicians()
    {
    	return $this->hasMany(Technician::class, 'category_id');
    }

}
