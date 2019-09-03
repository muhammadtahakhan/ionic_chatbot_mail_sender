<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgencyVideos extends Model
{
    
    protected $table = 'agency_video';
    protected $primaryKey = 'agency_video_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_id', 'video_link', 'description'];
    protected $hidden = ['created_at', 'updated_at'];

    public function agency()
    {
    	return $this->belongsTo('App\model\agency\Agency', 'agency_id');
    }
}
