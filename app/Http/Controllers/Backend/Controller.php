<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
	public function __contruct()
	{
		$this->middleware('auth');
	}
}
