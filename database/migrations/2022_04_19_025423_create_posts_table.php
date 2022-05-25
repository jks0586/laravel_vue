<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->string('image');
            $table->text('description');
            $table->text('short_description');
            $table->integer('user_id')->default(0);
            $table->text('category_id')->nullable();
            $table->string('meta_title',255);
            $table->string('meta_description',255);
            $table->string('meta_keywords',255);
            $table->enum('status', ['0', '1']);
            $table->integer('order')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
