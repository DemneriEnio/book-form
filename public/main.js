$(document).ready(function(){
	
	$('#submit').on('click', function(){
	
		var title = $('#title').val();
		var author = $('#author').val();
		
		if(title.trim() === '' || author.trim() === ''){
			$('#space').html('No book submitted');
		}else{
			$.ajax({
				url: '/submit',
				type: 'POST',
				dataType: 'json',
				data: {
					title: title,
					author: author
				},
				success: function(json){
					$('#space').html('Book submitted');
				}
			});
		}
	
	});
	
	$('#search_book').on('click', function(){
		$.ajax({
			url: '/book',
			type: 'POST',
			datType: 'json',
			data: {
				title: $('#book_title').val()
			},
			success: function(json){
			if(json.title.trim() === ''){
				$('#result').html('No book found');
			}else{
				$('#result').html("<strong>Book title: </strong>" + json.title + "<br><strong>Author: </strong>" + json.author);
			}
			}
		});
	});
	
	$('#search_author').on('click', function(){
		$.ajax({
			url: '/author',
			type: 'POST',
			dataType: 'json',
			data: {
				author: $('#author_name').val()
			},
			success: function(json){
			if(json.title.trim() === ''){
				$('#result').html('No book found');
			}else{
				$('#result').html("<strong>Book title: </strong>" + json.title + "<br><strong>Author: </strong>" + json.author);
			}
		}
	});
	
	});


});