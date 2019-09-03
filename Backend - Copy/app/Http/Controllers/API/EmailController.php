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
            $this->validate($request, ['privilege_id' => 'exists:privilege,privilege_id']);
            $coupon = Privilege::findOrFail($request['privilege_id']);
            $coupon->update($request->all());
            if($coupon) {
                return $this->sendResponse($coupon, 'Privilege Updated Successfully');
            }
            else {
                return $this->sendError($coupon, 'Privilege can not updat Successfully');
            }
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }

    public function send_email(Request $request){
        try {
         
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }


}
