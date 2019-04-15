<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyCategoryDetail extends Model
{
    use SoftDeletes;

    protected $table = 'property_category_detail';
    protected $primaryKey = 'property_category_detail_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['property_id', 'name', 'desc', 'type', 'value', 'selected'];
    protected $hidden = ['created_at', 'updated_at'];

}
