<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        

        $posts = Post::with('user')->paginate($request->input('per_page'))->withQueryString();
        return response($posts);

    }

    public function posts(Request $request){
        
        $posts = Post::with('user')->where('category_id',$request->cat_id)->paginate($request->input('per_page'))->withQueryString();
        // print_r($posts);
        // die;
        return response($posts);
    }

    public function postdetail($id){

        $post = Post::with('user')->find($id);
        $this->data['post'] = $post;
        return $this->response();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // echo '<pre>';print_r($request->all());echo '</pre>'; die;
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'short_description' => 'required',
            'meta_title' => 'required',
            'meta_keywords' => 'required',
            'meta_description' => 'required',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }


        if($request->file('image')){
            $file = $request->file('image');
            $org_file_name = $file->getClientOriginalName();
            $file_base_name = basename($file->getClientOriginalName(), '.' . $file->getClientOriginalExtension());
            $file_extension = $file->getClientOriginalExtension();
            $file_name = Str::slug($file_base_name) . '.' . $file_extension;
            $image = $file->storeAs(
                'post',
                $file_name,
                'public'
            );
        } else {
            $image='';
        }
        // echo $request->category_id; die;
        // print_r($request->all()); die;
        $post = Post::create([
            'name' => $request->name,
            'image' => $image,
            'description' => $request->description,
            'short_description' => $request->short_description,
            'meta_title' => $request->meta_title,
            'meta_keywords' => $request->meta_keywords,
            'meta_description' => $request->meta_description,
            'status' => $request->status,
            'order' => $request->order,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
        ]);

        $this->data['post'] = $post;
        return $this->response();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $post = Post::find($id);
        $this->data['post'] = $post;
        return $this->response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }
    public function postupdate(Request $request)
    {
        //

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'short_description' => 'required',
            'meta_title' => 'required',
            'meta_keywords' => 'required',
            'meta_description' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $post = Post::find($request->id);
        $post->name=$request->name;
        $post->description=$request->description;
        $post->short_description=$request->short_description;
        $post->meta_title=$request->meta_title;
        $post->meta_keywords=$request->meta_keywords;
        $post->meta_description=$request->meta_description;
        $post->status=$request->status;
        $post->order=$request->order;
        $post->category_id=$request->category_id;
        $post->user_id = $request->user()->id;

        if($request->file('image')){
            $file = $request->file('image');
            $org_file_name = $file->getClientOriginalName();
            $file_base_name = basename($file->getClientOriginalName(), '.' . $file->getClientOriginalExtension());
            $file_extension = $file->getClientOriginalExtension();
            $file_name = Str::slug($file_base_name) . '.' . $file_extension;
            $image = $file->storeAs(
                'post',
                $file_name,
                'public'
            );
            $post->image=$image;
        }

        $post->save();
        $this->data['post'] = $post;
        return $this->response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //

        $post =Post::find($id);
        $post->delete();
        $this->data['post'] = $post;
        $this->message = 'Post has been deleted successfully';
        return $this->response();
    }
}
