<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryHeader extends Model
{
    use SoftDeletes;

    protected $table = 'category_header';
    protected $primaryKey = 'category_header_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['category_name', 'category_desc'];
    protected $hidden = ['created_at', 'updated_at'];

    public function category_line()
    {
        return $this->hasMany('App\models\CategoryLine', 'category_header_id', 'category_header_id');
    }
}
