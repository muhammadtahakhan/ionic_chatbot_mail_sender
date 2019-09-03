<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgencyInterview extends Model
{
    use SoftDeletes;

    protected $table = 'agency_interview';
    protected $primaryKey = 'agency_interview_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_id', 'agency_interview_code', 'name', 'description'];
    protected $hidden = ['created_at', 'updated_at'];

    public function agency()
    {
    	return $this->belongsTo('App\model\agency\Agency', 'agency_id');
    }
}
