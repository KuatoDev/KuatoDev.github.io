<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['author_id', 'title', 'slug', 'body', 'excerpt', 'published_at'];
    protected $dates = ['published_at'];
    public function setPublishedAttribute($value)
    {
    	$this->attributes['published_at'] = $value ?: null;
    }

    public function author()
    {
    	return $this->belongsTo(User::class);
    }
}
