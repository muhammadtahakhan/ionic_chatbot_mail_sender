<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgencyGallery extends Model
{
    use SoftDeletes;

    protected $table = 'agency_gallery';
    protected $primaryKey = 'agency_gallery_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_id', 'agency_gallery_url'];
    protected $hidden = ['created_at', 'updated_at'];
    
    public function agency()
    {
    	return $this->belongsTo('App\model\agency\Agency', 'agency_id');
    }
}
