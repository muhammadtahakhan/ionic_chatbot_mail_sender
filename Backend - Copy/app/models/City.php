<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use SoftDeletes;

    protected $table = 'city';
    protected $primaryKey = 'city_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['city_name', 'city_code'];
    protected $hidden = ['created_at', 'updated_at'];

}
