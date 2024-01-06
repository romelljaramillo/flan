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

    public function scopeUpdateValue($query, string $name, $value, $html = false, $siteGroupId = null, $siteId = null)
    {
        // Configuration::updateValue($key, $values, $html, $idShopGroup, $idShop);

        $query->where('name', $name);

        if ($siteGroupId !== null) {
            $query->where('site_group_id', $siteGroupId);
        }

        if ($siteId !== null) {
            $query->where('site_id', $siteId);
        }

        $configuration = $query->first();

        if ($configuration) {
            $configuration->value = $value;
            $configuration->save();
        } else {
            $configuration = new Configuration();
            $configuration->name = $name;
            $configuration->value = $value;
            $configuration->site_group_id = $siteGroupId;
            $configuration->site_id = $siteId;
            $configuration->save();
        }

        return $configuration;
    }

}