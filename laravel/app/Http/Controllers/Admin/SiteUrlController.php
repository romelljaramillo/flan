<?php

namespace App\Http\Controllers\Admin;

use App\Models\Site;
use App\Models\SiteUrl;
use Illuminate\Http\Request;
use App\Http\Resources\SiteUrl\SiteUrlResource;
use App\Http\Resources\SiteUrl\SiteUrlCollection;
use App\Http\Requests\SiteUrl\SiteUrlStoreRequest;
use App\Http\Requests\SiteUrl\SiteUrlUpdateRequest;
use App\Helpers\ApiResponse;

class SiteUrlController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $siteurls = ($this->filterFields) ?  
            SiteUrl::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
            SiteUrl::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return SiteUrlCollection::make($siteurls);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SiteUrlStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SiteUrlStoreRequest $request)
    {
        $validatedData = $request->validated();

        $site = Site::findOrFail($validatedData['site_id']);

        $siteurl = new SiteUrl();

        $siteurl->fill($validatedData);

        $site->siteUrl()->save($siteurl);

        return SiteUrlResource::make($siteurl);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SiteUrl  $siteUrl
     * @return \Illuminate\Http\Response
     */
    public function show(SiteUrl $siteurl)
    {
        return SiteUrlResource::make($siteurl);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\SiteUrlUpdateRequest  $request
     * @param  \App\Models\SiteUrl  $siteUrl
     * @return \Illuminate\Http\Response
     */
    public function update(SiteUrlUpdateRequest $request, SiteUrl $siteurl)
    {
        $validatedData = $request->validated();

        $site = Site::findOrFail($validatedData['site_id']);

        $siteurl->update($validatedData);

        return SiteUrlResource::make($siteurl);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SiteUrl  $siteUrl
     * @return \Illuminate\Http\Response
     */
    public function destroy(SiteUrl $siteurl)
    {
        $data = $siteurl;
        $siteurl->delete();
        return ApiResponse::success($data, 'Eliminado');
    }
}
