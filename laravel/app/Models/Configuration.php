<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Configuration extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_group_id',
        'site_id',
        'name',
        'value',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function siteGroup()
    {
        return $this->belongsTo(SiteGroup::class);
    }

    public function langs()
    {
        return $this->belongsToMany(Lang::class)
        ->withPivot('value')
        ->withTimestamps();
    }

    public function scopeGetByParams($query, string $name, $langId = null, $siteGroupId = null, $siteId = null, $default = false)
    {
        $query->where('name', $name);

        if ($langId !== null) {
            $query->where('id_lang', $langId);
        }

        if ($siteGroupId !== null) {
            $query->where('site_group_id', $siteGroupId);
        }

        if ($siteId !== null) {
            $query->where('site_id', $siteId);
        }

        $configuration = $query->first();

        if ($configuration) {
            return $configuration->value;
        }

        return $default;
    }
}