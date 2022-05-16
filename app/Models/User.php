<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Storage;
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $default_image='user/default.png';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['avatarurl','avatarhtml'];

    public function getAvatarurlAttribute(){
        return Storage::url($this->avatar);
    }
    public function getAvatarhtmlAttribute(){
        if($this->avatar){

            return '<img src="'.Storage::url($this->avatar).'" width="50"  height="50">';
        } else {
            return '<img src="'.Storage::url($this->default_image).'" width="50"  height="50">';
        }
    }
}
