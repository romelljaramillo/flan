<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lang extends Model
{
    use HasFactory, FilterAdvanceTrait;

    protected $fillable = [
        'name',
        'active',
        'iso_code',
        'language_code',
        'locale',
        'date_format_lite',
        'date_format_full',
        'is_rtl',
    ];

    public function sites()
    {
        return $this->belongsToMany(Site::class);
    }

    public function configurations()
    {
        return $this->belongsToMany(Configuration::class)
        ->withPivot('value')
        ->withTimestamps();
    }
}
