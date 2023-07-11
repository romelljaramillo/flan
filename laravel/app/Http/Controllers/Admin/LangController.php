<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lang;
use Illuminate\Http\Request;
use App\Http\Resources\Lang\LangResource;
use App\Http\Resources\Lang\LangCollection;
use App\Http\Requests\Lang\LangStoreRequest;
use App\Http\Requests\Lang\LangUpdateRequest;

class LangController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $langs = ($this->filterFields) ?  
            Lang::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
            Lang::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return LangCollection::make($langs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\LangStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LangStoreRequest $request)
    {
        if ($request->validated()) {
            $lang = Lang::create([
                'name' => $request->name,
                'active' => $request->active,
                'iso_code' => $request->iso_code,
                'language_code' => $request->language_code,
                'locale' => $request->locale,
                'date_format_lite' => $request->date_format_lite,
                'date_format_full' => $request->date_format_full,
                'is_rtl' => $request->is_rtl,
            ]);

            // Asociar el idioma con las tiendas
            $lang->sites()->attach($request->sites);
        }

        return LangResource::make($lang);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function show(Lang $lang)
    {
        return LangResource::make($lang);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\LangUpdateRequest  $request
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function update(LangUpdateRequest $request, Lang $lang)
    {
        $lang->update($request->validated());
        return LangResource::make($lang);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lang $lang)
    {
        $data = $lang;
        
        if ($lang->sites()->exists()) {
            $lang->sites()->detach();
            $lang->delete();
        } else {
            $lang->forceDelete();
        }   

        return $this->sendResponse($data, 'Eliminado');
    }
}
