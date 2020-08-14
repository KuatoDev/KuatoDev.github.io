@extends('layouts.backend')

@section('title', $post->exists ? 'Editing '.$post->title : 'Create New Blog Post')

@section('content')
	{!! Form::model($post, [
		'method' => $post->exists ? 'put' : 'post',
		'route' => $post->exists ? ['backend.blog.update', $post->id] : ['backend.blog.store']
	]) !!}

	<div class="form-group">
		{!! Form::label('title') !!}
		{!! Form::text('title', null, ['class' => 'form-control']) !!}
	</div>
	<div class="form-group">
		{!! Form::label('slug') !!}
		{!! Form::text('slug', null, ['class' => 'form-control']) !!}
	</div>
	<div class="form-group">
		{!! Form::label('published_at') !!}
		{!! Form::text('published_at', null, ['class' => 'form-control']) !!}
	</div>
	<div class="form-group excerpt">
		{!! Form::label('excerpt') !!}
		{!! Form::textarea('excerpt', null, ['class' => 'form-control']) !!}
	</div>
	<div class="form-group">
		{!! Form::label('body') !!}
		{!! Form::textarea('body', null, ['class' => 'form-control']) !!}
	</div>

	{!! Form::submit($post->exists ? 'Save Post' : 'Create New Blog Post', ['class' => 'btn btn-primary']) !!}

	{!! Form::close() !!}

	<script>
		new SimpleMDE({
			element: document.getElementsByName('body')[0]
		}).render();
		new SimpleMDE({
			element: document.getElementsByName('excerpt')[0]
		}).render();

		
	</script>

@endsection