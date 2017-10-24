var express        = require('express');
var MongoClient    = require('mongodb').MongoClient;
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');

var app            = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(require('./app/routes'));

var router=express.Router();


app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
