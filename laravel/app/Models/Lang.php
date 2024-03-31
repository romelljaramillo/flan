<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lang extends Model
{
    use HasFactory, FilterAdvanceTrait;
    
    protected $disk = 'lang';

    protected $fillable = [
        'name',
        'image',
        'active',
        'iso_code',
        'language_code',
        'locale',
        'date_format_lite',
        'date_format_full',
        'is_rtl',
    ];

    /**
     * Obtiene la url del imagen del lang
     *
     * @return string
     */
    public function getImageAttribute($image): string
    {
        if (!$image || !Storage::disk($this->disk)->exists($image)) {
            return '';
        } 

        return Storage::disk($this->disk)->url($image);
    }

    
    public function sites()
    {
        return $this->belongsToMany(Site::class);
    }

    public function Currencies()
    {
        return $this->belongsToMany(Currency::class);
    }

    public function configurations()
    {
        return $this->belongsToMany(Configuration::class)
        ->withPivot('value')
        ->withTimestamps();
    }


}
