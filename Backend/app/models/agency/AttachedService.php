<?php

namespace App\models\agency;

use Illuminate\Database\Eloquent\Model;

class AttachedService extends Model
{
    use SoftDeletes;

    protected $table = 'attached_service';
    protected $primaryKey = 'attached_service_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['agency_id','serive_name', 'service_charges', 'duration_in_days', 'description', 'is_public', 'url_path', 'start_at', 'end_at'];
    protected $hidden = ['created_at', 'updated_at'];
}
