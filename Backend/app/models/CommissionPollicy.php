<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommissionPollicy extends Model
{
    use SoftDeletes;

    protected $table = 'commission_pollicy';
    protected $primaryKey = 'commission_pollicy_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['commission_percent', 'commission_name'];
    protected $hidden = ['created_at', 'updated_at'];

}
