<?php
    namespace App\models;


    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\SoftDeletes;

    class Role extends Model
    {
        use SoftDeletes;

        protected $table = 'role';
        protected $primaryKey = 'role_id';
        protected $dateFormat = 'U';
        public $timestamps = true;
        protected $fillable = ['role_type', 'role_name'];
        protected $hidden = ['created_at', 'updated_at'];


        public function privleges()
        {
            return $this->belongsToMany('App\models\Privilege', 'role_has_privileges',
                'role_id', 'privilege_id' );
        }

    }
