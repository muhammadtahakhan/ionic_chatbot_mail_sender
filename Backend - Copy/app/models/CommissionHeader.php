<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommissionHeader extends Model
{
    use SoftDeletes;

    protected $table = 'commission_header';
    protected $primaryKey = 'commission_header_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['commission_code', 'commission_desc'];
    protected $hidden = ['created_at', 'updated_at'];

}
