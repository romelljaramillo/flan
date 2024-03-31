<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('currency_lang', function (Blueprint $table) {
            $table->unsignedBigInteger('currency_id');
            $table->unsignedBigInteger('lang_id');
            $table->string('name', 255);
            $table->string('symbol', 255);
            $table->string('pattern', 255)->nullable();
            
            // Foreign keys
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->foreign('lang_id')->references('id')->on('langs');
            // Primary key
            $table->primary(['currency_id', 'lang_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currency_lang');
    }
};
