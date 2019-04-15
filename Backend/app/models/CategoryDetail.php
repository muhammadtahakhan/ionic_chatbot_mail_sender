<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryDetail extends Model
{
    use SoftDeletes;

    protected $table = 'category_detail';
    protected $primaryKey = 'category_detail_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['name', 'desc', 'type', 'value_is'];
    protected $hidden = ['created_at', 'updated_at'];

}
