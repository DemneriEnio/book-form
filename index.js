var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = new express();

var msg;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://enio:book@ds153637.mlab.com:53637/bookform', function(err){
	if(err) console.log('Unable to connect to db server.', err);
	else console.log('Db server connected');
});

mongoose.connection.once('open', function(err){
	if(err) console.log(err);
	else {
		var bookSchema = mongoose.Schema({
			title: String,
			author: String
		});
		
		var Book = mongoose.model('Book', bookSchema);
	}
	
	app.post('/submit', function(req, res){
		
		var title = req.body.title, author = req.body.author;
		console.log(title);
		console.log(author);
		
		Book.create({title: title, author: author}, function(err, form){
			if(err) msg = 'Book not submitted';
			else msg = 'Book successfully submitted';

			res.json({message: msg});	
		});
	});
	
	app.post('/book', function(req, res){
		
		var titleSearch = req.body.title;
		console.log(titleSearch);
		
		Book.findOne({title: titleSearch}, function(err, result){
			if(err) res.json({title: '', author: ''});
			else res.json(result);
		});
	});
	
	app.post('/author', function(req, res){
		
		var authorSearch = req.body.author;
		console.log(authorSearch);
		
		Book.findOne({author: authorSearch}, function(err, result){
			if(err) res.json({title: '', author: ''});
			else {
				console.log(result);
				res.json(result);
			}
		});
	});
});

app.listen(process.env.PORT || 7000);
