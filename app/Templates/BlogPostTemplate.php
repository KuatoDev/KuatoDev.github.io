<?php

namespace App\Templates;

use Carbon\Carbon;
use App\Post;
use Illuminate\View\View;

/**
* 
*/
class BlogPostTemplate extends AbstractTemplate
{
	protected $view = 'blog.post';

	protected $posts;

	public function __construct(Post $posts)
	{
		$this->posts = $posts;
	}

	public function prepare(view $view, array $parameters)
	{
		$posts = $this->posts->where('id', $parameters['id'])->where('slug', $parameters['slug'])->first();
		$view->with('posts', $posts);
	}
}