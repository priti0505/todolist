
<!DOCTYPE html>
<html>
	<head>
		<title>Todo List</title>
		<meta name="description" content="Todo list using HTML5 local storage api, jquery and css">
        <meta name="author" content="Priti Rai">
		<link rel="stylesheet" type="text/css" href="css/style.css"/>
		<link rel="stylesheet" type="text/css" href="css/custom-theme/jquery-ui-1.10.0.custom.css">
		<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="js/modernizer.js"></script>

		<link rel="shortcut icon" href="image/favicon.png"> 
		
	</head>
	<body>

		<header>
			To do list
		</header>

		<div class="container">
			<div class="leftside">
				<p id="message"/>
				<div id="category">
					<input type="text" id="cat" name="cat" placeholder="Enter Category"/>
				</div>
				
				<ul id="catlist" class="catlist">
					
				</ul>
			</div>
			
			<div class="rightside">
				<div id="list">
					
				</div>
			</div>
		</div>
		
		<footer></footer>
		<script type="text/javascript" src="js/docs.js"></script>
	</body>
</html>