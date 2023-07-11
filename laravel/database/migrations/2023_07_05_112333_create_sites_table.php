<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->integer('site_group_id');
            $table->string('name', 64);
            $table->string('color', 50);
            $table->integer('category_id');
            $table->string('theme_name', 255);
            $table->tinyInteger('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index('site_group_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sites');
    }
};
