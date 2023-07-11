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
        Schema::create('site_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name', 64);
            $table->string('color', 50);
            $table->tinyInteger('share_customer');
            $table->tinyInteger('share_order');
            $table->tinyInteger('share_stock');
            $table->tinyInteger('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_groups');
    }
};
