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
        Schema::create('site_urls', function (Blueprint $table) {
            $table->id();
            $table->integer('site_id');
            $table->string('domain', 150);
            $table->string('domain_ssl', 150);
            $table->string('physical_uri', 64);
            $table->string('virtual_uri', 64);
            $table->tinyInteger('main');
            $table->tinyInteger('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index('site_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_urls');
    }
};
