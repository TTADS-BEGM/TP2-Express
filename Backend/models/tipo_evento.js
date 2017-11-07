var mongoose =require('mongoose');

var tipoEventoSchema= new mongoose.Schema({
  id_tipo_evento: {type: String, required: true},
  nombre: {type: String, unique: true, required: true}
},{timestamps:true});

mongoose.model('tipo_evento', tipoEventoSchema);
