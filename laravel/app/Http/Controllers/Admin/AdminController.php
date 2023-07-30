<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use Illuminate\Support\Facades\App;

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

    protected $model;

    public function __construct()
    {
        // if($this->model = $this->getModel()) {
        //     $this->authorizeResource($this->model::class);
        // }

        // $this->middleware('check-permissions:administracion');
        $this->middleware('check-permissions');
    }

    protected function getModel()
    {
        // Obtiene el nombre de la clase del controlador y reemplaza 'Controller' por 'Model'
        $controllerName = class_basename(get_class($this));
        $modelName = str_replace('Controller', '', $controllerName);
        
        if($modelName != 'Auth') {
            $namespace = 'App\Models\\'.$modelName;
            
            // Verifica si la clase del modelo existe
            if (!class_exists($namespace)) {
                // ojo solucionar esto
                return null;
                throw new \Exception("El modelo asociado a este controlador no se encuentra.");
            }
            return new $namespace;
        }

        return false;
    }

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
