<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use App\Models\Comment;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        // $comments = Comment::paginate($request->input('per_page'))->withQueryString();
        $comments = Comment::select('*')->with(['user', 'post'])->paginate($request->input('per_page'))->withQueryString();
        return response($comments);
    }

    public function list(Request $request)
    {
        $comments = Comment::all();
        return response($comments);
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
        //
        $validator = Validator::make($request->all(), [
            'commentbody' => 'required',
            'post_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }


        $comment = Comment::create([
            'commentbody' => $request->commentbody,
            'post_id' => $request->post_id,
            'user_id' => $request->user_id,
            'status' => $request->status,
        ]);

        $this->data['comment'] = $comment;
        return $this->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        //
        // print_r($request->user()->id); die;

        $comment = Comment::find($id);
        $this->data['comment'] = $comment;
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

    public function commentupdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'commentbody' => 'required',
            'post_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $comment = Comment::find($request->id);
        $comment->commentbody = $request->commentbody;
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id;
        $comment->parent = $request->parent;


        $comment->save();
        $this->data['comment'] = $comment;
        return $this->response();
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

        $validator = Validator::make($request->all(), [
            'commentbody' => 'required',
            'post_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $comment = Comment::find($id);
        $comment->name = $request->name;
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id;
        $comment->parent = $request->parent;
        $comment->status = $request->status;
        $comment->save();
        $this->data['comment'] = $comment;
        return $this->response();
    }
}