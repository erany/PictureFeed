var express = require('express'),
    http = require('http'),
    path = require('path'),
    main = require('./main'),
	bodyParser = require('body-parser'),
	//logger = require('morgan') , 
    app = express();

//app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('uploadDir',  __dirname + '/uploads');
app.set('keepExtensions',  true);

//app.use(express.methodOverride());
//app.use(app.router);

app.use(express.static(path.join(__dirname, './uploads')));

app.post('/images', main.addImage); // endpoint to post new images
app.get('/images', main.getImages); // endpoint to get list of images

app.listen(3000, function () {
    console.log('PictureFeed server listening on port 3000');
});
