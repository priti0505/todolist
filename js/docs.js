var dbCategory = {};
var dbList = {};
if ('category' in localStorage)
	dbCategory = JSON.parse( localStorage['category'] );

if ('todolist' in localStorage) {
	dbList = JSON.parse( localStorage['todolist'] );
};

function addCategory(e){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		if($("#cat").val()===""){
			return false;
		}else{
		if (Modernizr.localstorage) {
		            console.log("yes");
		        }
		else {
		    $('#message').text("Your browser doesn't support local storage.");
		    
		    $('#message').show();
		}
		if (typeof(Storage)!=="undefined") {
			var d = new Date();
			var guid = [d.getFullYear(), d.getDate(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];
			dbCategory[guid.join('')] = $('#cat').val();

			var category = JSON.stringify(dbCategory);
			localStorage.setItem("category", category);

		    showCategoryValue();
		    e.stopPropagation();
		    $("#cat").val("");
		}
		
		}
	}

}

function addTodoList(e){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		if($("#enterlist").val()===""){
			return false;
		}else{

			if (Modernizr.localstorage) {
	            console.log("yes");
	        }
			else {
			    $('#message').text("Your browser doesn't support local storage.");
			    $('#message').show();
			}

			if (typeof(Storage)!=="undefined") {
				var d = new Date();
				var guid = [d.getFullYear(), d.getDate(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];
				
				var data = {"id": guid.join(''), "value": $('#enterlist').val() };

				var categoryId = $('#categoryId').val();
				
				if (categoryId in dbList === false) {
					dbList[categoryId] = [];	
				}

				dbList[categoryId].push(data);

				setDbList(dbList);

			    showdotolistValue(categoryId);

			    e.preventDefault();

			    $("#enterlist").val("");
			}
		}
	}
}


function showCategoryValue() {
	if (localStorage.length === 0) return;
	
	var category = dbCategory;

	$("#catlist").html('');
	for (var key in category){
	   var item = category[key];
	   $("#catlist").append("<li id='catid' name='catid' data-id='" + key + "'> <input type='submit' value='X'class='delCategory'>" + item + "</li>");
	}

}

function showdotolistValue(categoryId){
	if (localStorage.length === 0) return;
	if (categoryId in dbList === false) return;

	$("#todolist>li:not(:first-child)").remove();
	dbList[categoryId].forEach(function(n){
		var key = n.id;
		var item = n.value;

		$("#todolist").append("<li name='li' id='li' data-id='" + key + "'><div><div class='done'><input type='checkbox' id='checkbox' name='checkbox' style='float:left;'/></div>"+ item + "<button id='del' name='del' class='delTodolist' style='float:right;'>X</button></div></li>");
	});
}

function showListForm(e){
	var category = e.target;
	var categoryId = category.getAttribute('data-id');

	$('#list').html('');
	
	$('#list').append("<table><tr><td><input type='hidden' value='" + categoryId + "' id='categoryId'/><input type='text' id='enterlist' name='enterlist' placeholder='Enter your list'/><td></tr></table><ul id='todolist' class='list'><li class='listheader'>todolist --> " + category.innerText + "</li></ul>");
	console.log(e.target);
	showdotolistValue(categoryId);

}
 
 function deleteCategory(){
 	var categoryId = $(this.parentNode).attr('data-id');
 	delete dbCategory[categoryId];
 	setDbCatagory(dbCategory);
 	delete dbList[categoryId];
 	setDbList(dbList);
	
 }

function deleteTodoList(){

	var categoryId = $('#categoryId').val();
	var listId = $(this.parentNode.parentNode).attr('data-id');

	var list = dbList[categoryId];

	if (list && list.length > 0) {
		for (var i = 0; list.length; i++) {
			var data = list[i];

			if (data.id == listId) {
				console.log(data);
				dbList[categoryId].splice(i, 1);

				setDbList(dbList);

				showdotolistValue(categoryId);
				break;
			}
		}	
	}
}


function setDbList(data) {
	var dataStr = JSON.stringify(data);
	localStorage.setItem("todolist", dataStr);
}

function setDbCatagory(data) {
	var dataStr = JSON.stringify(data);
	localStorage.setItem("category", dataStr);
}

$(function(){
	$('#cat').on('keypress', addCategory);
	$('#catlist').on('click', showListForm);
	$(document).on('keypress', addTodoList);
	$(document).on('click', '.delCategory', deleteCategory);
	$(document).on('click', '.delTodolist', deleteTodoList);
});

showCategoryValue();


