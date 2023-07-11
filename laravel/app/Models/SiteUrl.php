<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SiteUrl extends Model
{
    use HasFactory, 
        FilterAdvanceTrait,
        SoftDeletes;

    protected $fillable = [
        'site_id',
        'domain',
        'domain_ssl',
        'physical_uri',
        'virtual_uri',
        'main',
        'active',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
