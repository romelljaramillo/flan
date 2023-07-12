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
        Schema::create('configurations', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('site_group_id')->nullable();
            $table->unsignedInteger('site_id')->nullable();
            $table->string('name', 254);
            $table->text('value')->nullable();
            $table->timestamps();

            $table->index('name');
            $table->index('site_id');
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
        Schema::dropIfExists('configurations');
    }
};
