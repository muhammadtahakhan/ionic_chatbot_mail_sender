<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitsLov extends Model
{
    use SoftDeletes;

    protected $table = 'units_lov';
    protected $primaryKey = 'units_lov_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['unit'];
    protected $hidden = ['created_at', 'updated_at'];
}
