<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\Request;
use League\Glide\Responses\LaravelResponseFactory;
use League\Glide\ServerFactory;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImagesController extends AdminController
{
    public function show(Filesystem $filesystem, Request $request, $path)
    {
        $server = ServerFactory::create([
            'response' => new LaravelResponseFactory(app('request')),
            'source' => $filesystem->getDriver(),
            'cache' => $filesystem->getDriver(),
            'cache_path_prefix' => '.cache',
        ]);

        return $server->getImageResponse($path, $request->all());
    }

        /**
     * Guarda la imagen del image
     *
     * @param string $image
     * @return string $path
     */
    static function save($image, $width = 400, $height = 400, $disk = 'images')
    {
        $extension = $image->extension();

        if (!$image || $extension === null) {
            return false;
        }

        $image = Image::make($image);

        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });

        $resizedContent = $image->stream()->detach();

        $filename = time() . '.' . $extension;

        Storage::disk($disk)->put($filename, $resizedContent);

        return $filename;

    }

    /**
     * Devuelve la url de imagen del image
     *
     * @param string $filename
     * @return string $path
     */
    static function get(string $filename, $disk = 'images'): string
    {
        if (!Storage::disk($disk)->exists($filename)) {
            return Storage::disk('images')->url('image.png');
        }

        return Storage::disk($disk)->url($filename);
    }

    /**
     * Elimina la imagen del image
     *
     * @param string $filename
     * @return bool
     */
    static function delete($filename, $disk = 'images'): bool
    {
        return Storage::disk($disk)->delete($filename);
    }
}
