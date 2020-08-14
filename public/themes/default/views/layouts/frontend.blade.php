<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale1">
	<title>@yield('title')</title>
	<link rel="stylesheet" href="{{ theme('css/backend.css') }}">
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container">
			<div class="navbar-header">
				<a href="/" class="navbar-brand">
					<img src="{{ theme('images/logo.png') }}" alt="RAI CMS">
				</a>
			</div>
			<ul class="nav navbar-nav">
			@include('partials.navigation')
			</ul>
		</div>
	</nav>
	<div class="container">
		<div class="row">
			<div class="col-md-12">@yield('content')</div>
		</div>
	</div>
</body>
</html>