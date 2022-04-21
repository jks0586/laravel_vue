<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->enum('status', ['0', '1']);
            $table->integer('parent')->nullable();
            $table->enum('top',['0','1']);
            $table->string('image');
            $table->text('description');
            $table->string('meta_title',255);
            $table->string('meta_description',255);
            $table->string('meta_keywords',255);
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
        Schema::dropIfExists('category');
    }
}
