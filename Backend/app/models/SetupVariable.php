<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SetupVariable extends Model
{
    use SoftDeletes;

    protected $table = 'setup_variable';
    protected $primaryKey = 'setup_variable_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['property_exp_days'];
    protected $hidden = ['created_at', 'updated_at'];

}
