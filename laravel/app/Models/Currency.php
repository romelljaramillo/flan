<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Currency extends Model
{
    use HasFactory, FilterAdvanceTrait;

    protected $fillable = [
        'name',
        'iso_code',
        'numeric_iso_code',
        'precision',
        'conversion_rate',
        'active',
        'unofficial',
        'modified'
    ];

    public function langs()
    {
        return $this->belongsToMany(Lang::class);
    }

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
