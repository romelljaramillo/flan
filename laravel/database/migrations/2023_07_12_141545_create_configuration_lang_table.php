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
        Schema::create('configuration_lang', function (Blueprint $table) {
            $table->unsignedBigInteger('configuration_id');
            $table->unsignedBigInteger('lang_id');
            $table->text('value')->nullable();
            $table->timestamps();

            $table->foreign('configuration_id')->references('id')->on('configurations')->onDelete('cascade');
            
            $table->primary(['configuration_id', 'lang_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('configuration_lang');
    }
};
