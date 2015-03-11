var express = require('express'),
    http = require('http'),
    path = require('path'),
    main = require('./main'),
	bodyParser = require('body-parser'),
	multer = require('multer') , 
	cookieParser = require('cookie-parser') , 
	errorHandler = require('errorhandler'), 
	//logger = require('morgan') , 
    app = express();

var router = express.Router() ; 
	
//app.use(logger("dev"));

app.use(cookieParser()) ;
app.use(errorHandler());
app.use(express.static(path.join(__dirname, './uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ dest:  __dirname + '/uploads'}));

//app.use(express.methodOverride());
//app.use(app.router);

app.set('uploadDir',  __dirname + '/uploads');
app.set('keepExtensions',  true);


app.route('/images').post(function(req, res, next) {
	console.log('%s %s %s', req.method, req.url, req.path);
	
	main.addImage ; 
	
	console.log('%s', req.files);
	
	next();
})



//app.post('/images', main.addImage); // endpoint to post new images
app.get('/images', main.getImages); // endpoint to get list of images

app.listen(3000, function () {
    console.log('PictureFeed server listening on port 3000');
});
