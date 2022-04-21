<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    //

    public function register(Request $request)
    {
        // print_r($request->all);
        // return $this->response();


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);


        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        Auth::login($user);
        $token = $user->createToken(microtime())->accessToken;
        $this->data['token'] = $token;
        $this->data['user'] = new UserResource($user);
        return $this->response();
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $credentials = $request->only('email', 'password');
        $auth = Auth::attempt($credentials);

        if (!$auth) {
            $this->message = 'Invalid Login';
            return $this->response(false);
        }

        $user = Auth::user();
        $token = $user->createToken(microtime())->accessToken;
        $this->data['user'] = new UserResource($user);
        $this->data['token'] = $token;
        return $this->response();
    }
}
