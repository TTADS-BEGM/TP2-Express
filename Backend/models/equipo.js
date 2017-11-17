var mongoose =require('mongoose');

var equipoSchema= new mongoose.Schema({
  nombre: {type: String, required: true, unique: true},
  url: {type: String, required: true}
},);

mongoose.model('equipo', equipoSchema);