<?php

namespace App;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    use SoftDeletes;
//    const DELETED_AT = 'status';
    protected $dates = ['deleted_at'];
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $dateFormat = 'U';
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'username', 'address', 'phone', 'phone2',
        'avatar','description',
        'email', 'password', 'active', 'app_password',
        'activation_token', 'role_id',
        'company_name', 'company_phone', 'user_type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function role() {
        return $this->hasOne('App\models\Role',  'role_id', 'role_id');
    }

}
