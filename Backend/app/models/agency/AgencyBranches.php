<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgencyBranches extends Model
{
    use SoftDeletes;

    protected $table = 'agency_branches';
    protected $primaryKey = 'agency_branches_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_id', 'agency_city', 'agency_branches_phone', 'agency_branches_address'];
    protected $hidden = ['created_at', 'updated_at'];

    public function agency()
    {
    	return $this->belongsTo('App\model\agency\Agency', 'agency_id');
    }
}
