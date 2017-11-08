var mongoose =require('mongoose');

var equipoSchema= new mongoose.Schema({
  id_equipo: {type: String, unique: true, required: true},
  nombre: {type: String, unique: true, required: true},
},);

mongoose.model('equipo', equipoSchema);