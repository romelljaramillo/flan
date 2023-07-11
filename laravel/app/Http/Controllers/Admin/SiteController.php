<?php

namespace App\Http\Controllers\Admin;

use App\Models\Site;
use Illuminate\Http\Request;
use App\Http\Resources\Site\SiteResource;
use App\Http\Resources\Site\SiteCollection;
use App\Http\Requests\Site\SiteStoreRequest;
use App\Http\Requests\Site\SiteUpdateRequest;


class SiteController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $sites = ($this->filterFields) ?  
            Site::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
            Site::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return SiteCollection::make($sites);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SiteStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SiteStoreRequest $request)
    {
        if ($request->validated()) {
            $site = Site::create([
                'site_group_id' => $request->site_group_id,
                'name' => $request->name,
                'color' => $request->color,
                'category_id' => $request->category_id,
                'theme_name' => $request->theme_name,
                'active' => $request->active,
            ]);
        }

        return SiteResource::make($site);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function show(Site $site)
    {
        return SiteResource::make($site);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\SiteUpdateRequest  $request
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function update(SiteUpdateRequest $request, Site $site)
    {
        $site->update($request->validated());
        return SiteResource::make($site);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function destroy(Site $site)
    {
        $data = $site;
        $site->delete();
        return $this->sendResponse($data, 'Eliminado');
    }
}
