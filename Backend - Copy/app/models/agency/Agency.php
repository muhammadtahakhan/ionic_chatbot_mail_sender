<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agency extends Model
{
    use SoftDeletes;

    protected $table = 'agency';
    protected $primaryKey = 'agency_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['user_id', 'agency_slug', 'show_on_home', 'agency_name', 'agency_description', 'agency_about', 'agency_phone', 'agency_email', 'agency_city', 'avatar', 'agency_fb', 'agency_google', 'agency_address'];
    protected $hidden = ['created_at', 'updated_at'];

    public function user(){
        return $this->belongsTo('App\User',  'user_id', 'user_id' );
    }

    public function agency_branches()
    {
        return $this->hasMany('App\models\agency\AgencyBranches', 'agency_id', 'agency_id');
    }
    public function agency_gallery()
    {
        return $this->hasMany('App\models\agency\AgencyGallery', 'agency_id', 'agency_id');
    }
    public function agency_interview()
    {
        return $this->hasMany('App\models\agency\AgencyInterview', 'agency_id', 'agency_id');
    }
    public function agency_member()
    {
        return $this->hasMany('App\models\agency\AgencyMember', 'agency_id', 'agency_id');
    }
    public function agency_project()
    {
        return $this->hasMany('App\models\agency\AgencyProject', 'agency_id', 'agency_id');
    }
    public function agency_videos()
    {
        return $this->hasMany('App\models\agency\AgencyVideos', 'agency_id', 'agency_id');
    }
}
