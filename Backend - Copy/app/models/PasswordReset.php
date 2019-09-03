<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PasswordReset extends Model
{
    use SoftDeletes;

    protected $table = 'password_resets';
    protected $primaryKey = 'password_resets_id';
    protected $dateFormat = 'U';
    public $timestamps = true;

    protected $fillable = [
        'email', 'token'
    ];
}
