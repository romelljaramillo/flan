<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class AdminController extends Controller
{
    public $fields;

    /**
     * Carntidad registros por pagina
     */
    public $perPage = 10;

    /**
     * Ordenamiento
     */
    public $orderBy = 'DESC';

    /**
     * Columna de ordenamiento
     */
    public $column  = 'id';

    /**
     * Filtros de busqueda
     */
    public $filterFields  = '';

    /**
     * Filtros de busqueda
     */
    public $filter  = '';


     /**
      * Setea los filtros de busqueda y ordenamiento
      *
      * @param Request $request
      * @return void
      */
    public function setFilter(Request $request): void
    {
        if(isset($request->filters)) {
            $filters = explode("|", $request->filters);

            foreach ($filters as $values) {
                $fields[] = explode(";", $values);
            }

            $this->filterFields = $fields;
        }

        if(isset($request->perPage)){
            $this->perPage = (int) $request->perPage;
        }   

        if(isset($request->orderBy)){
            $this->orderBy = $request->orderBy;
        }  

        if(isset($request->column)){
            $this->column = $request->column;
        }   

        if(isset($request->filter)){
            $this->filter = $request->filter;
        }
    }

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
