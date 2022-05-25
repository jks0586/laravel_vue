<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Support\Str;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $categories = Category::paginate($request->input('per_page'))->withQueryString();
        return response($categories);
        // $this->data['categories'] = $categories;
        // return $this->response();
    }

    public function list(Request $request)
    {

        $categories = Category::all();
        return response($categories);

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
            'name' => 'required',
            'description' => 'required',
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
                'category',
                $file_name,
                'public'
            );
        } else {
            $image='';
        }

        $category = Category::create([
            'name' => $request->name,
            'image' => $image,
            'description' => $request->description,
            'meta_title' => $request->meta_title,
            'meta_keywords' => $request->meta_keywords,
            'meta_description' => $request->meta_description,
            'status' => $request->status,
            'top' => $request->top,
        ]);

        $this->data['category'] = $category;
        return $this->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id,Request $request)
    {
        //
        // print_r($request->user()->id); die;

        $category = Category::find($id);
        $this->data['category'] = $category;
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

    public function categoryupdate(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'meta_title' => 'required',
            'meta_keywords' => 'required',
            'meta_description' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $category = Category::find($request->id);
        $category->name=$request->name;
        $category->description=$request->description;
        $category->meta_title=$request->meta_title;
        $category->meta_keywords=$request->meta_keywords;
        $category->meta_description=$request->meta_description;
        $category->status=$request->status;
        $category->top=$request->top;

        if($request->file('image')){
            $file = $request->file('image');
            $org_file_name = $file->getClientOriginalName();
            $file_base_name = basename($file->getClientOriginalName(), '.' . $file->getClientOriginalExtension());
            $file_extension = $file->getClientOriginalExtension();
            $file_name = Str::slug($file_base_name) . '.' . $file_extension;
            $image = $file->storeAs(
                'category',
                $file_name,
                'public'
            );
            $category->image=$image;
        }

        $category->save();
        $this->data['category'] = $category;
        return $this->response();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'meta_title' => 'required',
            'meta_keywords' => 'required',
            'meta_description' => 'required',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $category = Category::find($id);
        $category->name=$request->name;
        $category->description=$request->description;
        $category->meta_title=$request->meta_title;
        $category->meta_keywords=$request->meta_keywords;
        $category->meta_description=$request->meta_description;
        $category->status=$request->status;
        $category->top=$request->top;

        if($request->file('image')){
            $file = $request->file('image');
            $org_file_name = $file->getClientOriginalName();
            $file_base_name = basename($file->getClientOriginalName(), '.' . $file->getClientOriginalExtension());
            $file_extension = $file->getClientOriginalExtension();
            $file_name = Str::slug($file_base_name) . '.' . $file_extension;
            $image = $file->storeAs(
                'category',
                $file_name,
                'public'
            );
            $category->image=$image;
        }

        $category->save();
        $this->data['category'] = $category;
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
        $category = Category::find($id);
        $category->delete();
        $this->data['category'] = $category;
        $this->message = 'Category has been deleted successfully';
        return $this->response();
    }
}
