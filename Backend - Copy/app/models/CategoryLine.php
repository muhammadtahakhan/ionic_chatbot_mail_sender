<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryLine extends Model
{
    use SoftDeletes;

    protected $table = 'category_line';
    protected $primaryKey = 'category_line_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['category_header_id', 'name', 'desc'];
    protected $hidden = ['created_at', 'updated_at'];

    public function category_header()
    {
        return $this->belongsTo('App\models\CategoryHeader', 'category_header_id');
    }

    public function category_detail()
    {
        return $this->belongsToMany('App\models\CategoryDetail', 'category_line_has_category_detail', 'category_line_id','category_detail_id' );
    }

}
