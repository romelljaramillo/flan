<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Filesystem\Filesystem;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function splitCamelCase($input)
    {
        $regex = '/(?<!\b)(?=[A-Z])/'; // Expresión regular para encontrar las mayúsculas
        $words = preg_split($regex, $input);
        return implode(' ', $words);
    }
}
