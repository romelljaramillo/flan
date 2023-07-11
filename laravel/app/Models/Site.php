<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Site extends Model
{
    use HasFactory, 
        FilterAdvanceTrait,
        SoftDeletes;

    protected $fillable = [
        'site_group_id',
        'name',
        'color',
        'category_id',
        'theme_name',
        'active',
    ];

    public function langs()
    {
        return $this->belongsToMany(Lang::class);
    }

    public function siteGroup()
    {
        return $this->belongsTo(SiteGroup::class);
    }

    public function siteUrl()
    {
        return $this->hasOne(SiteUrl::class);
    }
}
