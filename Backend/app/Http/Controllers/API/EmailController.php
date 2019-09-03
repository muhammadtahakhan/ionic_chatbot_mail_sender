<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\models\Privilege;
use Illuminate\Support\Facades\Auth;

class EmailController extends BaseController
{
    public function get_email(Request $request) {
        try {
            dd(Auth::id());
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }

    public function send_email(Request $request){
        try {
            dd(Auth::id());
         
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }


}
