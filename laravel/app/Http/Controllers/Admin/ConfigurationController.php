<?php

namespace App\Http\Controllers\Admin;

use App\Models\Configuration;
use Illuminate\Http\Request;

class ConfigurationController extends AdminController
{
    public function index(Request $request)
    {
        
        $configurations = Configuration::with('langs')->get();
        return response()->json($configurations);
    }

    public function store(Request $request)
    {
        $configuration = Configuration::create($request->all());
        return response()->json($configuration, 201);
    }

    public function show($id)
    {
        $configuration = Configuration::with('langs')->find($id);
        return response()->json($configuration);
    }

    public function update(Request $request, $id)
    {
        $configuration = Configuration::find($id);
        $configuration->update($request->all());
        return response()->json($configuration);
    }

    public function destroy($id)
    {
        $configuration = Configuration::find($id);
        $configuration->delete();
        return response()->json(null, 204);
    }
}
