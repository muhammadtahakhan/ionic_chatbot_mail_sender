<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Privilege extends Model
{
       use SoftDeletes;

       protected $table = 'privileges';
       protected $primaryKey = 'privilege_id';
       protected $dateFormat = 'U';
       public $timestamps = true;
       protected $fillable = [ 'user_id',
                               'module_name',
                               'module_component',
                               'icon',
                               'class',
                               'other_privileges'
                              ];
    protected $hidden = ['created_at', 'updated_at'];

    public function role()
    {
        return $this->belongsToMany('App\models\Role', 'role_has_privileges', 'role_id',
            'privilege_id' );
    }

}
