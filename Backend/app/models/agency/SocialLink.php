<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocialLink extends Model
{
    use SoftDeletes;

    protected $table = 'social_link';
    protected $primaryKey = 'social_link_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_member_id', 'icon', 'link'];
    protected $hidden = ['created_at', 'updated_at'];

    public function agency_member()
    {
    	return $this->belongsTo('App\model\agency\AgencyMember', 'agency_member_id');
    }
}
