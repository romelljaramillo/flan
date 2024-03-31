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
        Schema::create('currency_site', function (Blueprint $table) {
            $table->unsignedBigInteger('currency_id');
            $table->unsignedBigInteger('site_id');
            
            // Foreign keys
            $table->foreign('currency_id')->references('id')->on('currencies');
            $table->foreign('site_id')->references('id')->on('sites');
            
            // Primary key
            $table->primary(['currency_id', 'site_id']);
            // Indexes
            $table->index('site_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currency_site');
    }
};
