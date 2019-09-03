<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Notifications\SignupActivate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Validator;
use DB;


class AuthController extends BaseController
{


    public function list(Request $request) {
        $user = User::with('role')->get();
        if($user) {
            return response()->json(['success' => true, 'data' => $user], $this->successStatus);
        }
    }

    public function get_user($user_id) {
       
        $user = User::where('user_id', $user_id)->first();
       
        if (!$user) {
            return response()->json([
                'success' => true,
                'message' => 'This user is invalid.'
            ], 404);
        }

       
        if($user) {
            return response()->json(['success' => true, 'data' => $user], $this->successStatus);
        }
    }

    public function create_user(Request $request){
        try {
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password'
            
           ];
           $customMessages = ['required' => 'The :attribute field can not be blank.', 
           'email.unique' => 'The :attribute already been taken.',
           'c_password.same'=> 'password does not match'
        ];
           $validator = Validator::make($request->all(), $rules, $customMessages);
           if ($validator->fails()) {
            return $this->sendError([], $validator->errors()->first(), '', 400);
        }

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'activation_token' => '',
            'active'=>'1',
            'role_id' =>  $request->role_id,
            'phone' =>  $request->phone,
            'phone1' =>  $request->phone1,
            'company_phone' =>  $request->company_phone,
            'company_name'=> $request->company_name,
            'user_type' => $request->user_type
        ]);

       $data = $user->save();

        if($data){
            return $this->sendResponse($data, 'User created successully');
           }else{
            return $this->sendError([], 'some thing went worng', '', 400);
           }
    



    } catch(\Exception $e) {
        return $this->sendError([], $e->getMessage());
    }


    }


    public function register(Request $request){
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        try {

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'activation_token' => str_random(60),
            'role_id' =>  $request->role_id
        ]);

        $user->save();
      

    } catch(\Exception $e) {
        return $this->sendError([], $e->getMessage());
    }
    }
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|string|email|unique:users',
        //     'password' => 'required|string|confirmed'
        // ]);

        $rules = [
            'name' => 'required',
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password'
            
           ];
           $customMessages = ['required' => 'The :attribute field can not be blank.', 
           'email.unique' => 'The :attribute already been taken.',
           'c_password.same'=> 'password does not match'
        ];
           $validator = Validator::make($request->all(), $rules, $customMessages);
           //    print_r($validator->errors()->first()); die();    
           if ($validator->fails()) {
            return $this->sendError([], $validator->errors()->first(), '', 400);
        }



        try {

        $user = new User([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'activation_token' => '',
            'active' => true,
            // 'activation_token' => str_random(60),
            // 'active' => false,
            'role_id' => 1// @$request->role_id
        ]);
            DB::transaction(function() use ($user)
            {
                $user->save();

                // $user->notify(new SignupActivate($user));

            });
            
        return response()->json([
            'success'=> true,
            'message' => 'Your Sign up has been successful, Thank you!'
        ], 201);

        } catch(\Exception $e) {
            return $this->sendError([], $e->getMessage());
        }
    }

    public function agentOne(Request $request) {
        $user = User::where('user_id', Auth::id())->first();
        if($user) {
            return response()->json(['success' => true, 'data' => $user], $this->successStatus);
        }
    }

    public function updateAgent(Request $request) {
        try {
            $this->validate($request, ['user_id' => 'exists:users,user_id']);
            $avatar          = $request->get('avatar_upload');
            $input           = $request->all();
            if($avatar){
//                ------------------------------
            //get the base-64 from data
            $base64_str = substr($avatar, strpos($avatar, ",")+1);
            $img = explode(',', $avatar);
            $ini =substr($img[0], 11);
            $type = explode(';', $ini);
            $file_ext = $type[0];
            // $file_ext = explode(".",$avatar['filename']);
            // $file_ext =  $file_ext[sizeof($file_ext) - 1];
            $file_name = '/app/public/avatars/'.$request['user_id'].'.'.$file_ext;

            // storing image in storage/app/public Folder
            $img =  \File::put( storage_path().$file_name, base64_decode($base64_str));

//                ------------------------------

            // $input['avatar'] = asset('storage/avatars/'.$request['user_id'].'.'.$file_ext);
            $input['avatar'] = '/api_server/storage/app/public/avatars/'.$request['user_id'].'.'.$file_ext;

            }
           
            $data            = User::findOrFail($request['user_id']);
            if($input['password'] && $input['password'] == $input['c_password']) {
                $input['password'] = bcrypt($input['password']);
            }
            else {
                $input['password'] = $data['password'];
            }
            if($avatar) {
                // $input['avatar'] = asset('storage/avatars/'.$request['user_id'].'.'.$file_ext);
                // $input['avatar'] = '/api_server/storage/app/public/avatars/'.$request['user_id'].'.'.$file_ext;
                $input['avatar'] = asset('storage/avatars/'.$request['user_id'].'.'.$file_ext);
            }
            else {
                $input['avatar'] = $data['avatar'];
            }

            $data->update($input);
            if($data) {
                return $this->sendResponse($data, 'Profile updated Successfully');
            }
            else {
                return $this->sendError($data, 'Profile can not update Successfully');
            }
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }


    public function updateMyProfile(Request $request) {
        try {
            $this->validate($request, ['user_id' => 'exists:users,user_id']);
            $avatar          = $request->get('avatar_upload');
            $input           = $request->all();
            
            // to make sure id and email of token
            $input['user_id'] = Auth::id();
            $input['email'] = Auth::user()->email;

            if($avatar){
//                ------------------------------
            //get the base-64 from data
            $base64_str = substr($avatar, strpos($avatar, ",")+1);
            $img = explode(',', $avatar);
            $ini = substr($img[0], 11);
            $type = explode(';', $ini);
            $file_ext = $type[0];
          
            // $file_ext = explode(".",$avatar['filename']);
            // $file_ext =  $file_ext[sizeof($file_ext) - 1];
            $file_name = '/app/public/avatars/'.$request['user_id'].'.'.$file_ext;

            // storing image in storage/app/public Folder
            $img =  \File::put( storage_path().$file_name, base64_decode($base64_str));

//                ------------------------------

            // $input['avatar'] = asset('storage/avatars/'.$request['user_id'].'.'.$file_ext);
            $input['avatar'] = '/api_server/storage/app/public/avatars/'.$request['user_id'].'.'.$file_ext;

            }
           
            $data            = User::findOrFail($request['user_id']);
            if($input['password'] && $input['password'] == $input['c_password']) {
                $input['password'] = bcrypt($input['password']);
            }
            else {
                $input['password'] = $data['password'];
            }
            if($avatar) {
                // $input['avatar'] = asset('storage/avatars/'.$request['user_id'].'.'.$file_ext);
                // $input['avatar'] = '/api_server/storage/app/public/avatars/'.$request['user_id'].'.'.$file_ext;
                $input['avatar'] = asset('storage/avatars/'.$request['user_id'].'.'.$file_ext);
            }
            else {
                $input['avatar'] = $data['avatar'];
            }

            $data->update($input);
            if($data) {
                return $this->sendResponse($data, 'Profile updated Successfully');
            }
            else {
                return $this->sendError($data, 'Profile can not update Successfully');
            }
        } catch(\Exception $e) {
            return $this->sendError($e->getMessage(), []);
        }
    }



    public function signupActivate($token)
    {
        $user = User::where('activation_token', $token)->first();

        if (!$user) {
            return response()->json([
                'success' => true,
                'message' => 'This activation token is invalid.'
            ], 404);
        }

        $user->active = true;
        $user->activation_token = '';
        $user->save();

        return $user;
    }

    public function adminActivateUser($user_id)
    {
        $user = User::where(['user_id'=> $user_id])->first();
       
        if (!$user) {
            return response()->json([
                'success' => true,
                'message' => 'This user is invalid.'
            ], 404);
        }

        $user->active =  !$user->active;
        $user->activation_token = '';
        $user->save();

        // return $user;
        return $this->sendResponse(['user' => $user], 'User Activate changed');

    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            // 'email' => 'required|string|email',
            'username' => 'required|string',
            'password' => 'required|string',
            // 'remember_me' => 'boolean'
        ]);
        $credentials = request(['username', 'password']);
        $credentials['active'] = 1;
        $credentials['deleted_at'] = null;
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 400);
        $user = $request->user();
        $userData  = User::where('user_id', Auth::id())->first();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return $this->sendResponse(['user' => $userData, 'token' => $tokenResult->accessToken], 'login successfully');


    }

    public function Agencylogin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        $credentials['active'] = 1;
        $credentials['deleted_at'] = null;
        $credentials['role_id'] = 6;

        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 400);

        $user = $request->user();
        $userData  = User::where('user_id', Auth::id())->first();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return $this->sendResponse(['user' => $userData, 'token' => $tokenResult->accessToken], 'login successfully');


    }

    public function loginSocial(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'remember_me' => 'boolean'
        ]);

        $user = User::where('email', $request['email'])->first();
       if($user){
           $tokenResult = $user->createToken('Personal Access Token');
           $token = $tokenResult->token;
           if ($request->remember_me)
               $token->expires_at = Carbon::now()->addWeeks(1);
           $token->save();
       }else{
           $requestData = $request->all();
           $requestData['role_id'] = 1;
           $user =  User::create($requestData);
           $tokenResult = $user->createToken('Personal Access Token');
           $token = $tokenResult->token;
           if ($request->remember_me)
               $token->expires_at = Carbon::now()->addWeeks(1);
           $user->active = true;
           $user->activation_token = '';
           $user->save();
           $token->save();
       }


        return $this->sendResponse(['user' => $user,'token' => $tokenResult->accessToken], 'login successfully');


    }


    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */


    public function logout(Request $request) {
        if(Auth::check()) {
            $request->user()->token()->revoke();
        }

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function delete_user(Request $request) {
        $rules = [
            'user_id' => 'required'
        ];
      
        $customMessages = ['required' => 'The :attribute field can not be blank.', 'email.unique' => 'The :attribute already been taken.', 'coupon_code.exists' => 'Invalid :attribute.',];
        $validator = Validator::make($request->all(), $rules, $customMessages);


        if ($validator->fails()) {
            //
            return $this->sendError([], $validator->errors()->first(), '', 400);
        }
           
            User::find($request['user_id'])->delete($request);
        return response()->json(['message' => 'Successfully deleted user']);
    }
}
