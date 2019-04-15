<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgentActivity extends Model
{
    use SoftDeletes;

    protected $table = 'agent_activity';
    protected $primaryKey = 'agent_activity_id';
    protected $dateFormat = 'U';
    public $timestamps = true;
    protected $fillable = ['property_id', 'user_id', 'activity_name', 'activity_description', 'remarks'];
    protected $hidden = ['created_at', 'updated_at'];

}
