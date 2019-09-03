<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Notification;
use App\User;
use App\Notifications\Enquire;
use App\Notifications\Thanks;
use Validator;

class NotificationsController extends BaseController
{

  public function enquire(Request $request){
    $rules = [
        'name' => 'required',
        'email' => 'required|email',
        'phone' => 'required',
        'message' => 'required'

    ];
    $customMessages = ['required' => 'The :attribute field can not be blank.', 'email.unique' => 'The :attribute already been taken.', 'coupon_code.exists' => 'Invalid :attribute.',];
    $validator = Validator::make($request->all(), $rules, $customMessages);
    if ($validator->fails())  return $this->sendError([], $validator->errors()->first(), '', 400);
    

    $data = $request->all();
    
    // $users = User::with('role');
    // $users = $users->whereHas('role', function($query){
    //     $query->where('role_type', 'admin');
    // })->get();
    // foreach ($users as $contact) {
    //     $contact->notify(new Enquire($data));
    // }





    // to submit enquire to adminn
    Notification::route('mail', 'info@apneezameen.com')->notify(new Enquire($data));

    // to send tanks email
    Notification::route('mail', $data['email'])->notify(new Thanks());

    return response()->json(['success' => true, 'data' => ''], $this->successStatus);
  }

}
