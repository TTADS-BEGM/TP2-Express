var mongoose =require('mongoose');

var partidoSchema= new mongoose.Schema({
  fecha_hora: {type: Date, required: true},
  equipo_local: {type: mongoose.Schema.Types.ObjectId, ref: 'equipo'},
  equipo_visitante: {type: mongoose.Schema.Types.ObjectId, ref: 'equipo'},
  eventos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'evento' }]
},);

mongoose.model('partido', partidoSchema);