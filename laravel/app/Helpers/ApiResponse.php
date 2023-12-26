<?php

namespace App\Helpers;

class ApiResponse
{
    /**
     * Return a success response.
     *
     * @param  string|array  $data
     * @param  string|array|null  $message
     * @param  int  $status
     * @return \Illuminate\Http\JsonResponse
     */
    public static function success($data, $message = null, $status = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Return an error response.
     *
     * @param  string|array  $message
     * @param  string|array|null  $data
     * @param  int  $status
     * @return \Illuminate\Http\JsonResponse
     */
    public static function error($message, $data = null, $status = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $data
        ], $status);
    }
}