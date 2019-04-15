<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Serivce extends Model
{
    use SoftDeletes;

    protected $table = 'service';
    protected $primaryKey = 'service_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['service_name', 'service_charges', 'duration_in_days', 'description', 'is_public', 'url_path'];
    protected $hidden = ['created_at', 'updated_at'];

}
