<?php

namespace App\Http\Controllers\Admin;

use App\Models\SiteGroup;
use Illuminate\Http\Request;
use App\Http\Resources\SiteGroup\SiteGroupResource;
use App\Http\Resources\SiteGroup\SiteGroupCollection;
use App\Http\Requests\SiteGroup\SiteGroupStoreRequest;
use App\Http\Requests\SiteGroup\SiteGroupUpdateRequest;

class SiteGroupController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $sitegroup = ($this->filterFields) ?  
            SiteGroup::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
            SiteGroup::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return SiteGroupCollection::make($sitegroup);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SiteGroupStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SiteGroupStoreRequest $request)
    {
        if ($request->validated()) {
            $sitegroup = SiteGroup::create([
                'name' => $request->name,
                'color' => $request->color,
                'share_customer' => $request->share_customer,
                'share_order' => $request->share_order,
                'share_stock' => $request->share_stock,
                'active' => $request->active,
            ]);
        }

        return SiteGroupResource::make($sitegroup);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SiteGroup  $siteGroup
     * @return \Illuminate\Http\Response
     */
    public function show(SiteGroup $sitegroup)
    {
        return SiteGroupResource::make($sitegroup);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\SiteGroupUpdateRequest  $request
     * @param  \App\Models\SiteGroup  $siteGroup
     * @return \Illuminate\Http\Response
     */
    public function update(SiteGroupUpdateRequest $request, SiteGroup $sitegroup)
    {
        $sitegroup->update($request->validated());
        return SiteGroupResource::make($sitegroup);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SiteGroup  $SiteGroup
     * @return \Illuminate\Http\Response
     */
    public function destroy(SiteGroup $sitegroup)
    {
        $data = $sitegroup;

        if ($sitegroup->sites()->exists()) {
            return $this->sendError('Unauthorised.', ['error' => 'No se puede eliminar el grupo de tiendas, tiene tiendas relacionadas.'], 403);
        }
        
        $sitegroup->delete();

        return $this->sendResponse($data, 'Eliminado');
    }
}
