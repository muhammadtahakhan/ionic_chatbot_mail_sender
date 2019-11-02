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

    public function send_email(Request $request) {
        try {

            // print_r([$request->input('message'), $request->input('to')]); die();
            $endpoint = "http://127.0.0.1:5000/send";
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $endpoint, ['query' => [
                'email' => Auth::user()['email'], 
                'password' => Auth::user()['app_password'],
                'message' => $request->input('message'),
                'to' => $request->input('to')
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
