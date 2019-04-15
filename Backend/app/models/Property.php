<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use SoftDeletes;

    protected $table = 'property';
    protected $primaryKey = 'property_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['user_id', 'assign_to_user_id', 'lead_by_user_id',
                           'property_purpose_id', 'category_header_id', 'category_line_id',
                           'case_code', 'property_demand', 'final_demand', 'city', 'address',
                           'property_desc', 'video_link', 'lng', 'lat', 'status', 'area', 'block', 'unit',
                           'sub_block', 'covered_area', 'file_status', 'project', 'views'
    ];
    protected $hidden = ['updated_at'];

//    -------------------------------One to One relations start

    public function property_purpose()
    {
        return $this->hasOne('App\models\PropertyPurpose', 'property_purpose_id', 'property_purpose_id');
    }

    public function category_header()
    {
        return $this->hasOne('App\models\CategoryHeader', 'category_header_id', 'category_header_id');
    }

    public function category_line()
    {
        return $this->hasOne('App\models\CategoryLine', 'category_line_id', 'category_line_id');
    }

    public function user()
    {
        return $this->hasOne('App\User', 'user_id', 'user_id');
    }

    public function assign_to_user()
    {
        return $this->belongsTo('App\User',  'assign_to_user_id', 'user_id' );
    }

    public function lead_by_user()
    {
        return $this->hasOne('App\User', 'lead_by_user_id', 'user_id' );
    }
//    -------------------------------One to One relations end

    public function property_category_detail()
    {
        return $this->hasMany('App\models\PropertyCategoryDetail', 'property_id', 'property_id');
    }

    public function subscribed_service()
    {
        return $this->hasMany('App\models\SubscribedService', 'property_id', 'property_id');
    }

    public function property_file()
    {
        return $this->hasMany('App\models\PropertyFile', 'property_id', 'property_id');
    }

    public function property_photo()
    {
        return $this->hasMany('App\models\PropertyPhoto', 'property_id', 'property_id');
    }

    public function agent_activity()
    {
        return $this->hasMany('App\models\AgentActivity', 'property_id', 'property_id');
    }


}
