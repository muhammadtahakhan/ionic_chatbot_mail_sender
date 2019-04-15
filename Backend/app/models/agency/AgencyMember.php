<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgencyMember extends Model
{
    use SoftDeletes;

    protected $table = 'agency_member';
    protected $primaryKey = 'agency_member_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_id', 'agency_member_img_url', 'agency_member_name', 'agency_member_title', 'agency_member_phone', 'agency_member_email', 'member_type'];
    protected $hidden = ['created_at', 'updated_at'];

    public function agency()
    {
    	return $this->belongsTo('App\model\agency\Agency', 'agency_id');
    }

    public function social_link()
    {
        return $this->hasMany('App\models\agency\SocialLink', 'agency_member_id', 'agency_member_id');
    }
}
