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
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('iso_code', 3)->default('0');
            $table->string('numeric_iso_code', 3)->nullable();
            $table->unsignedTinyInteger('precision')->default(6);
            $table->decimal('conversion_rate', 13, 6);
            $table->unsignedTinyInteger('deleted')->default(0);
            $table->unsignedTinyInteger('active')->default(1);
            $table->unsignedTinyInteger('unofficial')->default(0);
            $table->unsignedTinyInteger('modified')->default(0);
            $table->timestamps();
            
            // Indexes
            $table->index('iso_code', 'currency_iso_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};
