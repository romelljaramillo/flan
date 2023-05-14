<?php
namespace App\Traits;

use App\Http\Controllers\Api\SearchController;

trait FilterAdvanceTrait
{

    public function scopeFilter($query, string $filter)
    {
        $query->when($filter ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                foreach ($this->fillable as $campo) {
                    $query->orWhere($campo, 'like', '%' . $search . '%');
                }
            });
        });
    }

    public function scopeFilterAdvance($query, array $filters)
    {
        $query->when($filters ?? null, function ($query, $search) {
            $optionsSearch = SearchController::getOptions();
            foreach ($search as $value) {
                $foundKey = array_search($value[1], array_column($optionsSearch, 'option'));
                $operator = $optionsSearch[$foundKey]['operator'];

                switch (strtoupper($operator)) {
                    case 'LIKE':
                        $query->where($value[0], $operator, '%' . $value[2] . '%');
                        break;
                    case 'BETWEEN':
                        $items = explode(',', $value[2]);
                        $query->whereBetween($value[0], $items);
                        break;
                    case 'NOTBETWEEN':
                        $items = explode(',', $value[2]);
                        $query->whereNotBetween($value[0], $items);
                        break;
                    case 'IN':
                        $items = explode(',', $value[2]);
                        $query->whereIn($value[0], $items);
                        break;
                    case 'NOTIN':
                        $items = explode(',', $value[2]);
                        $query->whereNotIn($value[0], $items);
                        break;
                    default:
                        $query->where($value[0], $operator, $value[2]);
                        break;
                }
            }
        });
    }

}
