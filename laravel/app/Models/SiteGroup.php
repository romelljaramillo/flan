<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SiteGroup extends Model
{
    use HasFactory,
        FilterAdvanceTrait,
        SoftDeletes;

    protected $fillable = [
        'name',
        'color',
        'share_customer',
        'share_order',
        'share_stock',
        'active',
    ];

    public function sites()
    {
        return $this->hasMany(Site::class);
    }
}
