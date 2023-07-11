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
        Schema::create('langs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 32);
            $table->tinyInteger('active');
            $table->string('iso_code', 2);
            $table->string('language_code', 5);
            $table->string('locale', 5);
            $table->string('date_format_lite', 32);
            $table->string('date_format_full', 32);
            $table->tinyInteger('is_rtl');
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
        Schema::dropIfExists('langs');
    }
};
