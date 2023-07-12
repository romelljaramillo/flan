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
}