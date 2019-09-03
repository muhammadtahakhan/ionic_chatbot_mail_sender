<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommissionLine extends Model
{
    use SoftDeletes;

    protected $table = 'commission_line';
    protected $primaryKey = 'commission_line_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['commission_header_id'];
    protected $hidden = ['created_at', 'updated_at'];

}
