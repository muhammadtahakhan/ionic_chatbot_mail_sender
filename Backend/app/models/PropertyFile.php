<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyFile extends Model
{
    use SoftDeletes;

    protected $table = 'property_file';
    protected $primaryKey = 'property_file_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['property_id', 'file_name', 'file_url'];
    protected $hidden = ['created_at', 'updated_at'];

}
