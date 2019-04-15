<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgenciesLogo extends Model
{
    use SoftDeletes;

    protected $table = 'agencies_logo';
    protected $primaryKey = 'agencies_logo_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_name', 'agency_owner_name', 'phone_1', 'phone_2', 'logo_url', 'expires_at'];
    protected $hidden = ['created_at', 'updated_at'];
}
