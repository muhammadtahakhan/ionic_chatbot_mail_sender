<?php

use Illuminate\Http\Request;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*To Create contorller in ---->   php artisan make:controller API/TemplateEventController*/
/*To Create model in ---->   php artisan make:model models/TemplateEvent*/

Route::get('test', function() { return "ok"; });




Route::group([
  
        'prefix' => 'notifications'
    ], function () {
        Route::post('enquire', 'API\NotificationsController@enquire');

    });
    

Route::get('property_new_featured', 'API\PropertyController@listNewFeatured');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'API\AuthController@login');
    Route::post('agency_login', 'API\AuthController@Agencylogin');
    Route::post('login_social', 'API\AuthController@loginSocial');
    Route::post('signup', 'API\AuthController@signup');
    Route::post('reset_password', 'API\AuthController@reset_password');
    Route::post('create_user', 'API\AuthController@create_user');
    Route::get('signup/activate/{token}', 'API\AuthController@signupActivate');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'API\AuthController@logout');
        Route::get('user', 'API\AuthController@user');
    });
});


Route::group([
//    'namespace' => 'Auth',
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'API\PasswordResetController@create');
    Route::get('find/{token}', 'API\PasswordResetController@find');
    Route::post('reset', 'API\PasswordResetController@reset');
});




Route::group(['middleware' => ['auth:api']], function($router) {


    Route::get('get_users', 'API\AuthController@list');
    Route::get('get_user/{user_id}', 'API\AuthController@get_user');
    Route::delete('user', 'API\AuthController@delete_user');
    Route::post('register', 'API\AuthController@register');

    Route::get('signup/activate_user/{user_id}', 'API\AuthController@adminActivateUser');
  

    Route::get('get_profile', 'API\AuthController@agentOne');
    Route::put('update_profile', 'API\AuthController@updateAgent');
    Route::put('update_my_profile', 'API\AuthController@updateMyProfile');

    

    Route::get('my_emials', 'API\EmailController@get_email');
    Route::get('inbox', 'API\EmailController@get_email');
    Route::get('outbox', 'API\EmailController@outbox');
    Route::get('trash', 'API\EmailController@trash');
    Route::get('send_email', 'API\EmailController@send_email');
    Route::get('trash_email', 'API\EmailController@trash_email');

    Route::post('setting', 'API\EmailController@setting');
    Route::get('setting', 'API\EmailController@get_setting');


   
});


// DB_CONNECTION=mysql
// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_DATABASE=apneezam_staging
// DB_USERNAME=apneezam_user
// DB_PASSWORD=123456789

