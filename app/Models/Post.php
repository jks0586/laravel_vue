<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description','short_description', 'image','meta_title','meta_keywords','meta_description','order','status'
    ];

    protected $appends = ['action','imageurl','imagehtml'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function getImageurlAttribute(){
        return Storage::url($this->image);
    }
    public function getImagehtmlAttribute(){
        return '<img src="'.Storage::url($this->image).'" width="50"  height="50">';
    }
    public function getActionAttribute(){
        return "<a href='/admin/category/edit/{$this->id}'><i class='fa fa-pencil-alt'></i></a> | <a href='/admin/category/view/{$this->id}'><i class='fa fa-eye'></i></a>";
    }
}
