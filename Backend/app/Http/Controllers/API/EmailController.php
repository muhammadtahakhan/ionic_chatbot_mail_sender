<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\models\Privilege;
use Illuminate\Support\Facades\Auth;
use App\User;

class EmailController extends BaseController
{
    public function get_email(Request $request) {
        try {
            
            $endpoint = "http://127.0.0.1:5000/fetch_mail";
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $endpoint, ['query' => [
                'email' => Auth::user()['email'], 
                'password' => Auth::user()['app_password']
            ]]);
            
            $statusCode = $response->getStatusCode();
            $content = $response->getBody();
            // print_r(json_decode($content)); die();
           
            return response()->json(['success' => true, 'data' => json_decode($content)], $this->successStatus);
           
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }

    public function outbox(Request $request) {
        try {
            
            $endpoint = "http://127.0.0.1:5000/outbox";
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $endpoint, ['query' => [
                'email' => Auth::user()['email'], 
                'password' => Auth::user()['app_password']
            ]]);
            
            $statusCode = $response->getStatusCode();
            $content = $response->getBody();
            // print_r(json_decode($content)); die();
           
            return response()->json(['success' => true, 'data' => json_decode($content)], $this->successStatus);
           
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }

    public function trash(Request $request) {
        try {
            
            $endpoint = "http://127.0.0.1:5000/trash";
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $endpoint, ['query' => [
                'email' => Auth::user()['email'], 
                'password' => Auth::user()['app_password']
            ]]);
            
            $statusCode = $response->getStatusCode();
            $content = $response->getBody();
            // print_r(json_decode($content)); die();
           
            return response()->json(['success' => true, 'data' => json_decode($content)], $this->successStatus);
           
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }


    public function setting(Request $request) {
        try {
            
            // $user = new User([
            //     'name' => $request->name,
            //     'email' => $request->email,
            //     'app_password' => $request->app_password,
            // ]);
            $user = User::find(Auth::id());
            if($request->name) $user->name = $request->name;
            if($request->email) $user->email = $request->email;
            if($request->email) $user->password = bcrypt($request->password);
            if($request->app_password) $user->app_password = $request->app_password;
            $user = $user->save();

            return response()->json(['success' => true, 'data' => $user], $this->successStatus);
           
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }

    public function get_setting(){

        try {
           
            $user = User::find(Auth::id());
           
            return response()->json(['success' => true, 'data' => $user], $this->successStatus);
           
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }

    }

    public function send_email(Request $request) {
        try {

            // print_r([$request->input('message'), $request->input('to')]); die();
            $endpoint = "http://127.0.0.1:5000/delete";
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $endpoint, ['query' => [
                'email' => Auth::user()['email'], 
                'password' => Auth::user()['app_password'],
                'mail_id' => $request->input('mail_id'),
                
            ]]);
            
            $statusCode = $response->getStatusCode();
            $content = $response->getBody();
            // print_r(json_decode($content)); die();
           
            return response()->json(['success' => true, 'data' => json_decode($content)], $this->successStatus);
           
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }

}
