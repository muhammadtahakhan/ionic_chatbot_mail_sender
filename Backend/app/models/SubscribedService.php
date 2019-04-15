<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscribedService extends Model
{
    use SoftDeletes;

    protected $table = 'subscribed_service';
    protected $primaryKey = 'subscribed_service_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['property_id', 'name', 'desc', 'charges', 'paid_status'];
    protected $hidden = ['created_at', 'updated_at'];

}
