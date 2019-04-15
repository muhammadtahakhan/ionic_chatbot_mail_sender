<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Project extends Model
{
    use SoftDeletes;

    protected $table = 'project';
    protected $primaryKey = 'project_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['project_name', 'project_city', 
                           'project_type', 'project_description', 'project_address', 'project_long', 
                           'project_lat', 'builder_name', 'builder_contact', 'builder_description'];
    protected $hidden = ['created_at', 'updated_at'];

}
