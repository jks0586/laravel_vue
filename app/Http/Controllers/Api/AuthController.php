<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    //

    public function list(Request $request)
    {
        $users = User::paginate($request->input('per_page'))->withQueryString();
        return response($users);
        // $this->data['categories'] = $categories;
        // return $this->response();
    }

    public function get($id){
        $user=User::find($id);
        $this->data['user'] = $user;
        return $this->response();
    }

    public function destroy($id)
    {
        //
        $user = User::find($id);
        $user->delete();
        $this->data['user'] = $user;
        $this->message = 'User has been deleted successfully';
        return $this->response();
    }

    public function post(Request $request){
        if(!empty($request->id)){
            $user=User::find($request->id);
        } else {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:8',
            ]);

            if ($validator->fails()) {
                $this->errors = $validator->errors();
                return $this->response();
            }

            $user=new User();
            $user->password = bcrypt($request->password);
        }

        $user->name=$request->name;
        $user->email=$request->email;
        $user->is_admin=$request->is_admin;
        if($request->file('avatar')){
            $file = $request->file('avatar');
            $org_file_name = $file->getClientOriginalName();
            $file_base_name = basename($file->getClientOriginalName(), '.' . $file->getClientOriginalExtension());
            $file_extension = $file->getClientOriginalExtension();
            $file_name = Str::slug($file_base_name) . '.' . $file_extension;
            $image = $file->storeAs(
                'user',
                $file_name,
                'public'
            );
            $user->avatar=$image;
        }
        $user->save();
        $this->data['user'] = $user;
        return $this->response();
    }

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
