var mongoose =require('mongoose');

var eventoSchema= new mongoose.Schema({
  fecha_hora: {type: Date, required: true},
  tipo_evento: {type: mongoose.Schema.Types.ObjectId, ref: 'tipo_evento'},
  partido: {type: mongoose.Schema.Types.ObjectId, ref: 'partido'},
},);

mongoose.model('evento', eventoSchema);