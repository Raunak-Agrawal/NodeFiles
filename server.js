const express = require ('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log +'\n',(err) =>{
		if(err){
			console.log('cant do it');
		}
		
	});
	next();
});
	


// app.use((req,res,next) => {
// 	res.render('maintainence');


// });

hbs.registerHelper('currentYear',() => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
	return text.toUpperCase();

});

app.get('/',(req,res) => {

	res.render('home',{
		pagetitle : 'About page',
		welcome : 'Welcome here',
	});

});
app.get('/about',(req,res) => {
	res.render('about',{
		pagetitle : 'About page',	
	});
});
app.listen(port , () => {
	console.log(`server up on port ${port}`); 
});