<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Helpers\List\ColumnManager;

class ListServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(ColumnManager::class, function ($app) {
            return new ColumnManager();
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
