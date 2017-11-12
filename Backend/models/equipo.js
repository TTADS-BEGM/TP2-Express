var mongoose =require('mongoose');

var equipoSchema= new mongoose.Schema({
  id_equipo: {type: Number, required: true, unique: true},
  nombre: {type: String, required: true},
  partidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'partido' }]
},);

mongoose.model('equipo', equipoSchema);