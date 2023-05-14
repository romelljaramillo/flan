<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $imagesDir = '/';

    public function saveImage($image, $width = 200, $height = 200)
    {

        $filename = $image->hashName();
        $path = Storage::disk('images')->put($this->imagesDir . '/origin', $image);
        $this->resizeImage($path, $width, $height, 'images');

        return $filename;
    }

    public function resizeImage($path, $width = null, $height = null, $disk = 'public')
    {
        $content = Storage::disk($disk)->get($path);
        $image = Image::make($content);
        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });

        $resizedContent = $image->stream()->detach();
        $resizedPath = $this->imagesDir . '/' . basename($path);
        Storage::disk($disk)->put($resizedPath, $resizedContent);
        return $resizedPath;
    }
}
