import express,{Application} from 'express';
const path = require('path');
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app: Application = express()
const port: number = (process.env.PORT!==undefined? +process.env.PORT : 3000) || 3000;

app.use(express.static('build'))

app.listen(port, ():void => {
    console.log('Webapp started on port '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

app.get('*' , (req, res) => {
	res.sendFile(path.join(__dirname,'build','index.html'));
	});