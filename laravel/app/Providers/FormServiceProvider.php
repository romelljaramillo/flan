<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Helpers\Form\FieldManager;

class FormServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(FieldManager::class, function ($app) {
            return new FieldManager();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
