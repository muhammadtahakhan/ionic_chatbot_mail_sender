<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Filetype extends Model
{
    use SoftDeletes;

    protected $table = 'file_type_lov';
    protected $primaryKey = 'file_type_lov_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['file_type'];
    protected $hidden = ['created_at', 'updated_at'];
}
