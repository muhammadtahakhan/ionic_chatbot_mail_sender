<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyPhoto extends Model
{
    use SoftDeletes;

    protected $table = 'property_photo';
    protected $primaryKey = 'property_photo_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['property_id', 'photo_url'];
    protected $hidden = ['created_at', 'updated_at'];

}
