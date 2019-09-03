<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyPurpose extends Model
{
    use SoftDeletes;

    protected $table = 'property_purpose';
    protected $primaryKey = 'property_purpose_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['purpose_name', 'purpose_desc', 'purpose_icon'];
    protected $hidden = ['created_at', 'updated_at'];

}
