<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'commentbody', 'post_id','user_id', 'parent','status'
    ];

    
}
