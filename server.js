const express = require("express");
const app = express();

//settings
app.set('port', process.env.port || 3000);

//Midlewares
app.use(express.json());
//Routes
app.use(require('./app/components/employees'));
app.listen(app.get('port'), () =>{
    console.log("Server on port ", app.get('port'))
});